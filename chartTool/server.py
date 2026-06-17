#!/usr/bin/env python3
import http.server
import socketserver
import json
import os
from urllib.parse import parse_qs
from io import BytesIO

# Try to import pandas and openpyxl for Excel parsing
try:
    import pandas as pd
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False

PORT = 1111
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')

class ChartHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        elif self.path == '/api/parse-excel':
            self.send_error(405, 'Use POST for /api/parse-excel')
            return
        return super().do_GET()

    def do_POST(self):
        if self.path == '/api/parse-excel':
            self.handle_parse_excel()
        else:
            self.send_error(404, 'Not found')

    def handle_parse_excel(self):
        if not PANDAS_AVAILABLE:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'error': 'pandas and openpyxl not installed. Run: pip3 install pandas openpyxl'}
            self.wfile.write(json.dumps(response).encode())
            return

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        # Parse multipart form data
        boundary = self.headers.get('Content-Type', '').split('boundary=')[1].encode()
        parts = post_data.split(b'--' + boundary)

        file_data = None
        for part in parts:
            if b'filename="' in part:
                # Extract file data after the headers
                header_end = part.find(b'\r\n\r\n')
                if header_end != -1:
                    file_data = part[header_end + 4:]
                    # Remove trailing boundary markers
                    file_data = file_data.rstrip(b'\r\n-' + boundary)
                    file_data = file_data.rstrip(b'\r\n')
                    break

        if not file_data:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'error': 'No file uploaded'}
            self.wfile.write(json.dumps(response).encode())
            return

        try:
            # Read Excel file
            excel_file = pd.ExcelFile(BytesIO(file_data))
            df = excel_file.parse(excel_file.sheet_names[0], header=None)

            # Find x and y rows
            x_row = None
            y_row = None

            for i, row in df.iterrows():
                if len(row) > 0:
                    first_cell = str(row.iloc[0]).lower().strip()
                    if first_cell in ['x', 'x values', 'x-axis']:
                        x_row = row.iloc[1:].dropna().tolist()
                    elif first_cell in ['y', 'y values', 'y-axis']:
                        y_row = row.iloc[1:].dropna().tolist()

            if not x_row or not y_row:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {'error': 'Excel must contain rows labeled "x" and "y" as the first cell in each row'}
                self.wfile.write(json.dumps(response).encode())
                return

            if len(x_row) != len(y_row):
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {'error': 'X and Y rows must have the same number of values'}
                self.wfile.write(json.dumps(response).encode())
                return

            # Convert to numeric
            x_data = [float(v) for v in x_row]
            y_data = [float(v) for v in y_row]

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'x': x_data, 'y': y_data}
            self.wfile.write(json.dumps(response).encode())

        except Exception as e:
            print(f'Error parsing Excel: {e}')
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'error': 'Failed to parse Excel file'}
            self.wfile.write(json.dumps(response).encode())

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {args[0]}")

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), ChartHandler) as httpd:
        print(f"📊 Chart viewer running at http://localhost:{PORT}")
        print(f"📁 Upload Excel files with 'x' and 'y' rows")
        print(f"🎨 Customize color and export as PNG")
        print(f"\nPress Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Shutting down...")
