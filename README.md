# Pipoll Website

A stunning, minimalistic website for the Pipoll app - "Invest on humans."

---

## 📁 Files You Need to Add

Place the following files in this folder (`/Users/markusmac2/pipoll-website/`):

### Required Images

| Filename | Description | Dimensions | Notes |
|----------|-------------|------------|-------|
| `logo.png` | ✅ **Main logo** - transparent background | 400x100px (or similar ratio) | Already copied from StockVerse |
| `favicon.png` | ✅ **Browser tab icon** | 32x32px or 64x64px | Already copied from StockVerse |
| `app-screenshot.png` | ✅ **Hero main screenshot** | 900x1800px (2x phone screen) | Already copied - shows main stock/portfolio view |

### Additional Screenshots Needed

Create/export these screenshots from your app and add them to the folder:

| Filename | Description | Dimensions | What to show |
|----------|-------------|------------|--------------|
| `screenshot-habits.png` | Habits tracking screen | 900x1800px | The habit list with yes/no toggles |
| `screenshot-market.png` | Social market screen | 900x1800px | User stocks market/investor view |
| `screenshot-profile.png` | Profile/dashboard screen | 900x1800px | User's stock value, stats, profile |
| `screenshot-streaks.png` | Streak tracking screen | 900x1800px | Streak calendar, 100-day milestone |
| `screenshot-chart.png` | Analytics/chart screen | 900x1800px | Growth chart, value over time |

### How to Create Screenshots

1. **Run your app** in simulator or on device
2. **Navigate to each screen** listed above
3. **Take screenshots** (Cmd+S in simulator, or button combo on device)
4. **Export at 2x resolution** (900x1800px for iPhone)
5. **Save as PNG** with exact filenames above

### Quick Setup (Copy from StockVerse)

```bash
cd /Users/markusmac2/pipoll-website

# These are already copied:
# - logo.png (from finalLogofile.png)
# - favicon.png
# - app-screenshot.png (from ff1.png)

# For additional screenshots, export from your app or use existing assets:
# Example if you have similar screens in StockVerse assets:
cp /Users/markusmac2/Downloads/stock_verse/assets/images/ff2.png screenshot-habits.png
cp /Users/markusmac2/Downloads/stock_verse/assets/images/ff3.png screenshot-market.png
cp /Users/markusmac2/Downloads/stock_verse/assets/images/ff4.png screenshot-profile.png
```

---

## 🎨 Website Structure

### Sections

1. **Hero** - Full-screen with animated gradient orbs, tagline, iOS CTA, 3-phone showcase
2. **Showcase** - "Inside the app" gallery with 3 phone screens showing different features
3. **Stats** - User count, habits tracked, streaks, rating
4. **Features** - 6 feature cards (Personal Stock, Habit Tracking, Streak Rewards, etc.)
5. **How It Works** - 4-step process
6. **Testimonials** - User reviews with stars
7. **Contact** - Email cards (hello@, lifeline@, founders)
8. **Download CTA** - Final iOS download button
9. **Footer** - Links and contact info

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Purple | `#9D69CE` | Main brand color, gradients |
| Secondary Pink | `#FFA2F0` | Accents, highlights |
| Success Green | `#7CE16B` | Positive changes, streaks |
| Warning Yellow | `#F9CF58` | Stars, achievements |
| Dark Background | `#0a0a0a` | Main background |
| Light Text | `#FDFCF3` | Primary text |

---

## 📱 Mobile-First Design

The website is fully responsive with:
- Mobile hamburger menu
- 3-phone hero collapses to single phone on mobile
- Stacked layouts on small screens
- Touch-friendly button sizes
- Responsive typography scaling

---

## 🧪 Testing Locally

1. Add the required image files (see above)
2. Open `index.html` in your browser
3. Or use a local server:
   ```bash
   cd /Users/markusmac2/pipoll-website
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel
cd /Users/markusmac2/pipoll-website
vercel
```

### Option 2: Netlify
1. Drag & drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect via GitHub

### Option 3: GitHub Pages
1. Push to a GitHub repository
2. Enable GitHub Pages in repo settings

---

## 📧 Contact Emails on Website

- **General**: hello@pipoll.live
- **Support**: lifeline@pipoll.live
- **Founders**: markus@pipoll.live / oliver@pipoll.live

---

## ⚙️ Customization

### Update iOS Download Link

Edit `index.html` and change these lines (around line 67 and 200):
```html
<a href="https://apps.apple.com/app/pipoll" class="btn-primary">
```
Replace with your actual App Store URL.

### Update Testimonials

Edit the testimonial cards in `index.html` with real user reviews.

### Update Stats Numbers

Edit the stats section with real numbers:
```html
<div class="stat-number gradient-text">10K+</div>
```

---

## 📸 Image Summary

### Already in folder (✅):
- `logo.png`
- `favicon.png`
- `app-screenshot.png`

### Need to add (❌):
- `screenshot-habits.png`
- `screenshot-market.png`
- `screenshot-profile.png`
- `screenshot-streaks.png`
- `screenshot-chart.png`

### Optional:
- `og-image.png` (1200x630px) - Social sharing preview for Twitter/LinkedIn
