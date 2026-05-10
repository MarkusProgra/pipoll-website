// ========================================
// Pipoll Website - Interactive JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link (but not dropdown triggers)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Mobile Dropdown Toggle
    const mobileDropdownTrigger = document.querySelector('.mobile-dropdown-trigger');
    const mobileDropdown = document.querySelector('.mobile-dropdown');

    if (mobileDropdownTrigger && mobileDropdown) {
        mobileDropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking a link inside
        mobileDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileDropdown.classList.remove('active');
            });
        });
    }

    // Navbar hide/show on scroll with bounce
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Scroll down - hide navbar
                    navbar.classList.add('hidden');
                    navbar.classList.remove('scrolled');
                } else if (currentScroll < lastScroll) {
                    // Scroll up - show navbar
                    navbar.classList.remove('hidden');
                    if (currentScroll > 50) {
                        navbar.classList.add('scrolled');
                    }
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .step, .hero-content, .hero-visual, .section-header, .cta-content, .manifesto-content, .value-card, .contact-card-large, .faq-item'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });

    // Add animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        .feature-card:nth-child(5) { transition-delay: 0.5s; }
        .feature-card:nth-child(6) { transition-delay: 0.6s; }

        .step:nth-child(1) { transition-delay: 0.1s; }
        .step:nth-child(2) { transition-delay: 0.2s; }
        .step:nth-child(3) { transition-delay: 0.3s; }
        .step:nth-child(4) { transition-delay: 0.4s; }

        .contact-card-large:nth-child(1) { transition-delay: 0.1s; }
        .contact-card-large:nth-child(2) { transition-delay: 0.2s; }
        .contact-card-large:nth-child(3) { transition-delay: 0.3s; }

        .faq-item:nth-child(1) { transition-delay: 0.1s; }
        .faq-item:nth-child(2) { transition-delay: 0.15s; }
        .faq-item:nth-child(3) { transition-delay: 0.2s; }
        .faq-item:nth-child(4) { transition-delay: 0.25s; }
        .faq-item:nth-child(5) { transition-delay: 0.3s; }
        .faq-item:nth-child(6) { transition-delay: 0.35s; }
    `;
    document.head.appendChild(style);

    // Parallax effect for background orbs
    const orbs = document.querySelectorAll('.bg-orb');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Avatar stack hover effect
    const avatarStack = document.querySelector('.avatar-stack');
    if (avatarStack) {
        const avatars = avatarStack.querySelectorAll('.avatar');

        avatars.forEach((avatar, index) => {
            avatar.addEventListener('mouseenter', () => {
                avatars.forEach((a, i) => {
                    if (i !== index) {
                        a.style.opacity = '0.5';
                    }
                });
            });

            avatar.addEventListener('mouseleave', () => {
                avatars.forEach(a => {
                    a.style.opacity = '1';
                });
            });
        });
    }

    // Button ripple effect
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Number counting animation for stats
    const animateCounters = () => {
        const statValues = document.querySelectorAll('.stat-value[data-count]');

        statValues.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;

            if (isInView && !el.classList.contains('counted')) {
                el.classList.add('counted');

                const target = parseInt(el.getAttribute('data-count'));
                const duration = 2000;
                const start = performance.now();

                const formatNumber = (num) => {
                    if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M+';
                    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
                    return num.toString();
                };

                const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

                const animate = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutQuart(progress);
                    const current = Math.floor(target * easedProgress);

                    el.textContent = formatNumber(current);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.textContent = formatNumber(target);
                    }
                };

                requestAnimationFrame(animate);
            }
        });
    };

    // Trigger counter animation on scroll
    let countersInitialized = false;
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersInitialized) {
                countersInitialized = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const statsElement = document.querySelector('.hero-stats');
    if (statsElement) {
        counterObserver.observe(statsElement);
    }

    // Console message for developers
    console.log('%c🚀 Pipoll', 'font-size: 24px; font-weight: bold; color: #9D69CE;');
    console.log('%cInvest on humans.', 'font-size: 14px; color: #FFA2F0;');
    console.log('%cBuilt with ❤️ by Markus & Oliver', 'font-size: 12px; color: #737373;');
});
