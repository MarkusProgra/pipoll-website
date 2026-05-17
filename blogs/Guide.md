# How to Create a New Blog Post

## Quick Steps

1. **Copy the template** below and save it as `your-post-title.html` in the `blog-posts/` folder
2. **Update the metadata** (title, description, date, author, read time)
3. **Add your featured image** (place in main folder, reference with `../filename.png`)
4. **Write your content** using the HTML structure provided
5. **Add the post to blog.html** - copy a `.blog-card` block and update details

---

## File Naming Convention

- Use lowercase with hyphens: `my-awesome-post.html`
- Keep it under 5 words if possible
- Match the title slug to the URL

---

## HTML Template for New Posts

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Your post description here">
    <meta name="theme-color" content="#9D69CE">
    <title>Your Post Title - Pipoll Blog</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="../blog-styles.css">
    <link rel="icon" type="image/png" href="../favicon.png">
</head>
<body>
    <!-- Animated Background -->
    <div class="bg-gradient">
        <div class="bg-grid"></div>
        <div class="bg-orb bg-orb-1"></div>
        <div class="bg-orb bg-orb-2"></div>
        <div class="bg-orb bg-orb-3"></div>
    </div>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">
                <img src="../logo.png" alt="Pipoll" class="logo-img">
            </a>
            <div class="nav-links">
                <a href="../index.html#manifesto">Manifesto</a>
                <a href="../index.html#how-it-works">How it works</a>
                <a href="../index.html#features">Features</a>
                <a href="../contact.html">Contact</a>
                <div class="nav-dropdown">
                    <span class="dropdown-trigger">Legal ▾</span>
                    <div class="dropdown-menu">
                        <a href="../terms.html">Terms & Conditions</a>
                        <a href="../privacy.html">Privacy Policy</a>
                    </div>
                </div>
            </div>
            <a href="../index.html#download" class="nav-cta">Start Investing</a>
            <button class="nav-toggle" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu">
        <a href="../index.html#manifesto">Manifesto</a>
        <a href="../index.html#how-it-works">How it works</a>
        <a href="../index.html#features">Features</a>
        <a href="../contact.html">Contact</a>
        <div class="mobile-dropdown">
            <span class="mobile-dropdown-trigger">Legal ▾</span>
            <div class="mobile-dropdown-menu">
                <a href="../terms.html">Terms & Conditions</a>
                <a href="../privacy.html">Privacy Policy</a>
            </div>
        </div>
        <a href="../index.html#download" class="mobile-cta">Start Investing</a>
    </div>

    <!-- Blog Post Container -->
    <article class="blog-post-container">
        <!-- Back to Blog -->
        <a href="../blog.html" class="back-to-blog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Blog
        </a>

        <!-- Blog Post Header -->
        <header class="blog-post-header">
            <div class="blog-post-categories">
                <span class="post-category">Your Category</span>
            </div>
            <h1 class="blog-post-title">Your Post Title Here</h1>
            <div class="blog-post-meta">
                <span>By Markus & Oliver</span>
                <span>May XX, 2026</span>
                <span>X min read</span>
            </div>
        </header>

        <!-- Featured Image -->
        <div class="blog-post-featured-image">
            <img src="../your-image.png" alt="Description">
        </div>

        <!-- Blog Content -->
        <div class="blog-post-content">
            <p class="lead">
                Your opening paragraph here. Use <span class="gradient-text">gradient text</span> for emphasis.
            </p>

            <h2>Section Heading</h2>
            <p>Your content paragraph here.</p>

            <h3>Subsection Heading</h3>
            <p>More content here.</p>

            <ul>
                <li>Bullet point</li>
                <li>Another point</li>
            </ul>

            <p><strong>Bold text</strong> for emphasis.</p>
        </div>
    </article>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-brand">
                <img src="../logo.png" alt="Pipoll" class="footer-logo">
                <p class="footer-tagline">The Human Economy.</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Pipoll. All rights reserved.</p>
        </div>
    </footer>

    <script src="../script.js"></script>
</body>
</html>
```

---

## Adding Your Post to the Blog Homepage

Open `blog.html` and add a new `.blog-card` inside the `.blog-grid`:

```html
<article class="blog-card">
    <a href="blog-posts/your-post-title.html" class="blog-card-link">
        <div class="blog-card-image">
            <img src="your-image.png" alt="Alt text">
            <div class="card-overlay"></div>
        </div>
        <div class="blog-card-content">
            <div class="post-meta">
                <span class="post-category">Category</span>
                <span class="post-date">May XX, 2026</span>
            </div>
            <h3 class="blog-card-title">Your Post Title</h3>
            <p class="blog-card-excerpt">
                One or two sentence teaser about your post. Keep it punchy.
            </p>
            <div class="blog-card-footer">
                <span class="read-time">X min read</span>
                <span class="arrow-icon">→</span>
            </div>
        </div>
    </a>
</article>
```

---

## Available Images

Use these existing screenshots:
- `1.png` - `5.png` (app screens)
- `app-screenshot.png`
- `screenshot-habits.png`
- `screenshot-market.png`
- `screenshot-profile.png`
- `screenshot-streaks.png`
- `screenshot-chart.png`

---

## Content Tips

- **Lead paragraph**: Start with a hook. Use `<p class="lead">` for larger text
- **Headings**: Use `<h2>` for main sections, `<h3>` for subsections
- **Emphasis**: Use `<span class="gradient-text">text</span>` for key phrases
- **Bold**: Use `<strong>text</strong>` for important points
- **Lists**: Use `<ul><li>item</li></ul>` for bullet points
- **CTA Box**: End with a call-to-action linking to the app
