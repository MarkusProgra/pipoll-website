#!/usr/bin/env python3
import http.server
import socketserver
import json
import os
import email
from io import BytesIO

# Try to import pandas and openpyxl for Excel parsing
try:
        import pandas as pd
        PANDAS_AVAILABLE = True
except ImportError:
        PANDAS_AVAILABLE = False

PORT = 1111
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

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

    def send_json(self, status, data):
                body = json.dumps(data).encode()
                self.send_response(status)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)

    def handle_parse_excel(self):
                if not PANDAS_AVAILABLE:
                                self.send_json(500, {'error': 'pandas and openpyxl not installed. Run: pip3 install pandas openpyxl'})
                                return

                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)

        # Parse multipart form data using the email library for correctness
                content_type = self.headers.get('Content-Type', '')
                # Build a minimal email message so we can use its multipart parser
                msg_bytes = b'Content-Type: ' + content_type.encode() + b'\r\n\r\n' + post_data
                msg = email.message_from_bytes(msg_bytes)

        file_data = None
        for part in msg.walk():
                        cd = part.get('Content-Disposition', '')
                        if 'filename=' in cd:
                                            file_data = part.get_payload(decode=True)
                                            break

                    if not file_data:
                                    self.send_json(400, {'error': 'No file uploaded'})
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
                                                self.send_json(400, {'error': 'Excel must contain rows labeled "x" and "y" as the first cell in each row'})
                                                return

            if len(x_row) != len(y_row):
                                self.send_json(400, {'error': 'X and Y rows must have the same number of values'})
                                return

            # Convert to numeric
            x_data = [float(v) for v in x_row]
            y_data = [float(v) for v in y_row]

            self.send_json(200, {'x': x_data, 'y': y_data})

except Exception as e:
            print(f'Error parsing Excel: {e}')
            self.send_json(500, {'error': f'Failed to parse Excel file: {str(e)}'})

    def log_message(self, format, *args):
                print(f"[{self.log_date_time_string()}] {args[0]}")

if __name__ == '__main__':
        with socketserver.TCPServer(("", PORT), ChartHandler) as httpd:
                    print(f"Chart viewer running at http://localhost:{PORT}")
                    print(f"Upload Excel files with 'x' and 'y' rows")
                    print(f"Customize color and export as PNG")
                    try:
                                    httpd.serve_forever()
except KeyboardInterrupt:
            print("\nServer stopped.")
