const canvas = document.getElementById('chartCanvas');
const ctx = canvas.getContext('2d');
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const colorPicker = document.getElementById('colorPicker');
const lineWidthInput = document.getElementById('lineWidth');
const exportBtn = document.getElementById('exportBtn');
const errorDiv = document.getElementById('error');

let chartData = null;

// Initialize with empty chart
drawChart([], [], '#ff6b9d', 3);

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  fileName.textContent = file.name;
  hideError();

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/parse-excel', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to parse Excel file');
    }

    chartData = data;
    drawChart(data.x, data.y, colorPicker.value, parseInt(lineWidthInput.value));
    exportBtn.disabled = false;
  } catch (error) {
    showError(error.message);
    chartData = null;
    exportBtn.disabled = true;
  }
});

colorPicker.addEventListener('input', () => {
  if (chartData) {
    drawChart(chartData.x, chartData.y, colorPicker.value, parseInt(lineWidthInput.value));
  }
});

lineWidthInput.addEventListener('input', () => {
  if (chartData) {
    drawChart(chartData.x, chartData.y, colorPicker.value, parseInt(lineWidthInput.value));
  }
});

exportBtn.addEventListener('click', () => {
  if (!chartData) return;

  const link = document.createElement('a');
  link.download = 'chart-export.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

function drawChart(xData, yData, color, lineWidth) {
  // Clear canvas with transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (xData.length === 0 || yData.length === 0) {
    // Draw placeholder text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Upload an Excel file with x and y rows to preview', canvas.width / 2, canvas.height / 2);
    return;
  }

  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;

  // Calculate data ranges
  const xMin = Math.min(...xData);
  const xMax = Math.max(...xData);
  const yMin = Math.min(...yData);
  const yMax = Math.max(...yData);

  // Add some padding to y range
  const yRange = yMax - yMin || 1;
  const yPadding = yRange * 0.1;
  const yDrawMin = yMin - yPadding;
  const yDrawMax = yMax + yPadding;

  // Scale functions
  const scaleX = (x) => padding + ((x - xMin) / (xMax - xMin || 1)) * chartWidth;
  const scaleY = (y) => padding + chartHeight - ((y - yDrawMin) / (yDrawMax - yDrawMin)) * chartHeight;

  // Draw gradient fill
  const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight);
  gradient.addColorStop(0, hexToRgba(color, 0.4));
  gradient.addColorStop(1, hexToRgba(color, 0));

  ctx.beginPath();
  ctx.moveTo(scaleX(xData[0]), canvas.height - padding);
  ctx.lineTo(scaleX(xData[0]), scaleY(yData[0]));

  for (let i = 1; i < xData.length; i++) {
    ctx.lineTo(scaleX(xData[i]), scaleY(yData[i]));
  }

  ctx.lineTo(scaleX(xData[xData.length - 1]), canvas.height - padding);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw line
  ctx.beginPath();
  ctx.moveTo(scaleX(xData[0]), scaleY(yData[0]));

  for (let i = 1; i < xData.length; i++) {
    ctx.lineTo(scaleX(xData[i]), scaleY(yData[i]));
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatValue(value) {
  if (Math.abs(value) >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (Math.abs(value) >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  } else if (Number.isInteger(value)) {
    return value.toString();
  } else {
    return value.toFixed(2);
  }
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

function hideError() {
  errorDiv.style.display = 'none';
}
