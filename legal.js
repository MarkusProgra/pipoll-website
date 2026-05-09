// ========================================
// Pipoll Legal Pages - Interactive Effects
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Reading Progress Bar
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
        document.body.appendChild(progressBar);
        return progressBar.querySelector('.reading-progress-bar');
    };

    const progressBar = createProgressBar();

    const updateProgressBar = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    };

    window.addEventListener('scroll', updateProgressBar);

    // Back to Top Button
    const createBackToTop = () => {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
        `;
        document.body.appendChild(btn);
        return btn;
    };

    const backToTopBtn = createBackToTop();

    const handleBackToTop = () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', handleBackToTop);

    // Mobile Dropdown Toggle
    const mobileDropdownTrigger = document.querySelector('.mobile-dropdown-trigger');
    const mobileDropdown = document.querySelector('.mobile-dropdown');

    if (mobileDropdownTrigger && mobileDropdown) {
        mobileDropdownTrigger.addEventListener('click', () => {
            mobileDropdown.classList.toggle('active');
        });
    }

    // Smooth scroll for TOC links with offset
    document.querySelectorAll('.toc-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 120;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Update TOC active state
                document.querySelectorAll('.toc-item').forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + entry.target.id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Add animation styles and observe sections
    const style = document.createElement('style');
    style.textContent = `
        .legal-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .legal-section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .toc-item.active {
            background: rgba(157, 105, 206, 0.15);
            border-color: rgba(157, 105, 206, 0.5);
            color: var(--light);
        }

        .toc-item.active .toc-number {
            background: var(--gradient-main);
            color: var(--dark);
        }
    `;
    document.head.appendChild(style);

    // Observe all legal sections
    document.querySelectorAll('.legal-section').forEach(section => {
        observer.observe(section);
    });

    // Highlight current section in TOC on scroll
    const tocItems = document.querySelectorAll('.toc-item');
    const sectionPositions = [];

    tocItems.forEach(item => {
        const href = item.getAttribute('href');
        const section = document.querySelector(href);
        if (section) {
            sectionPositions.push({
                id: href,
                top: section.offsetTop - 150
            });
        }
    });

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Find current section
        let currentSection = null;
        for (let i = sectionPositions.length - 1; i >= 0; i--) {
            if (scrollPos >= sectionPositions[i].top) {
                currentSection = sectionPositions[i].id;
                break;
            }
        }

        // Update active TOC item
        tocItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === currentSection) {
                item.classList.add('active');
            }
        });
    });

    // Add hover effects to legal warning/info boxes
    document.querySelectorAll('.legal-warning, .legal-info').forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add copy-to-clipboard functionality for email addresses
    document.querySelectorAll('.contact-card-info a[href^="mailto:"]').forEach(email => {
        email.addEventListener('click', function(e) {
            // Show a subtle flash effect
            this.style.transition = 'opacity 0.2s ease';
            this.style.opacity = '0.5';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });

    // Add subtle parallax to document card
    const documentCard = document.querySelector('.document-card');
    if (documentCard) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const progress = scrolled / maxScroll;
            documentCard.style.transform = `translateY(${progress * 30}px) rotateY(${Math.sin(progress * Math.PI) * 10}deg)`;
        });
    }

    // Console message
    console.log('%c📜 Pipoll Legal Documents', 'font-size: 24px; font-weight: bold; color: #9D69CE;');
    console.log('%cYour privacy and legal rights matter.', 'font-size: 14px; color: #FFA2F0;');
});
