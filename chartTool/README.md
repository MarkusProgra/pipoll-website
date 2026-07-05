# Excel Chart Viewer

Browser-based chart generator that creates beautiful gradient charts from Excel files.

## GitHub Pages Setup

1. Create a new GitHub repository
2. Upload all files from this folder directly to the repository root
3. Go to **Settings** → **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/(root)** folder
6. Click **Save**

Your site will be live at: `https://yourusername.github.io/repository-name/`

## Excel Format

Create Excel files with two rows:
- First row: `x` followed by x-values (1, 2, 3, ...)
- Second row: `y` followed by y-values

| x | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| y | 100 | 150 | 200 | 180 | 250 |

## Features

- 🎨 Custom line color
- 📐 Format selector (Landscape, Square, Mobile)
- 💾 Export as PNG
- 📊 Gradient fill (solid to transparent)
- 🌐 Works entirely in browser - no server needed

## Sample Files

- `chart_down_*.xlsx` - Downward trending charts
- `chart_up_1.xlsx` - Upward trending chart
