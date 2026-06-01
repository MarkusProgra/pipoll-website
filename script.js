// Pipoll Website - Interactive JavaScript

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

    // Navbar hide/show on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;

    if (navbar) {
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
        }, { passive: true });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    if ('IntersectionObserver' in window) {
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
    } else {
        // Fallback: show all elements immediately for older browsers
        document.querySelectorAll('.feature-card, .step, .hero-content, .hero-visual, .section-header, .cta-content, .manifesto-content, .value-card, .contact-card-large, .faq-item').forEach(el => {
            el.style.opacity = '1';
        });
    }

    // Parallax effect - desktop only
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
        const orbs = document.querySelectorAll('.bg-orb');
        if (orbs.length > 0) {
            let parallaxTicking = false;
            window.addEventListener('scroll', () => {
                if (!parallaxTicking) {
                    window.requestAnimationFrame(() => {
                        const scrolled = window.pageYOffset;
                        orbs.forEach((orb, index) => {
                            const speed = 0.1 + (index * 0.05);
                            orb.style.transform = `translateY(${scrolled * speed}px)`;
                        });
                        parallaxTicking = false;
                    });
                    parallaxTicking = true;
                }
            }, { passive: true });
        }
    }

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

    // Button ripple effect - desktop only
    if (!isMobile) {
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

        document.querySelectorAll('.btn-primary:not(.btn-disabled)').forEach(button => {
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

                setTimeout(() => {
                    if (ripple.parentNode) ripple.remove();
                }, 600);
            });
        });
    }

    // Number counting animation for stats
    const formatNumber = (num) => {
        if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
        return num.toString();
    };

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

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
    const animateCountersOnScroll = () => {
        if (countersInitialized) return;

        const statsElement = document.querySelector('.hero-stats') || document.querySelector('.hero-stats-compact');
        if (!statsElement) return;

        const rect = statsElement.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;

        if (isInView) {
            countersInitialized = true;
            animateCounters();
        }
    };

    // Check on load and scroll
    window.addEventListener('scroll', animateCountersOnScroll, { passive: true });
    setTimeout(animateCountersOnScroll, 100);

    // Countdown Timer to June 12, 2026
    const LAUNCH_DATE = new Date('2026-06-12T00:00:00');

    const pad = (n) => String(n).padStart(2, '0');

    const updateCountdown = () => {
        const now = new Date();
        const diff = LAUNCH_DATE - now;

        if (diff <= 0) {
            // Launch date reached
            ['hero-days','hero-hours','hero-mins','hero-secs',
             'cta-days','cta-hours','cta-mins','cta-secs'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = '00';
            });
            return;
        }

        const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Hero countdown
        const hDays  = document.getElementById('hero-days');
        const hHours = document.getElementById('hero-hours');
        const hMins  = document.getElementById('hero-mins');
        const hSecs  = document.getElementById('hero-secs');

        if (hDays)  hDays.textContent  = pad(days);
        if (hHours) hHours.textContent = pad(hours);
        if (hMins)  hMins.textContent  = pad(minutes);
        if (hSecs)  hSecs.textContent  = pad(seconds);

        // CTA countdown
        const cDays  = document.getElementById('cta-days');
        const cHours = document.getElementById('cta-hours');
        const cMins  = document.getElementById('cta-mins');
        const cSecs  = document.getElementById('cta-secs');

        if (cDays)  cDays.textContent  = pad(days);
        if (cHours) cHours.textContent = pad(hours);
        if (cMins)  cMins.textContent  = pad(minutes);
        if (cSecs)  cSecs.textContent  = pad(seconds);
    };

    // Initialize and update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Console message
    console.log('%c🚀 Pipoll', 'font-size: 24px; font-weight: bold; color: #9D69CE;');
    console.log('%cInvest on humans.', 'font-size: 14px; color: #FFA2F0;');

    // Mobile Card Swiper
    function initCardSwiper() {
        const cardStack = document.getElementById('cardStack');
        if (!cardStack) return;

        const dots = document.querySelectorAll('#cardDots .card-dot');
        let cards = Array.from(cardStack.querySelectorAll('.swipe-card'));
        let currentIndex = 0;
        let totalCards = cards.length;
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        let isAnimating = false;

        // Get the top card (with top-card class)
        function getTopCard() {
            return cardStack.querySelector('.swipe-card.top-card');
        }

        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function reindexCards() {
            const remainingCards = Array.from(cardStack.querySelectorAll('.swipe-card:not(.fly-out-left):not(.fly-out-right)'));
            remainingCards.forEach((card, i) => {
                card.setAttribute('data-card-index', i);
                card.style.zIndex = remainingCards.length - i;

                // Toggle top-card class
                if (i === 0) {
                    card.classList.add('top-card');
                } else {
                    card.classList.remove('top-card');
                }

                // Stacking effect for cards behind
                if (i > 0) {
                    const scale = 1 - (i * 0.05);
                    const translateY = i * 4;
                    card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
                } else {
                    card.style.transform = '';
                }
            });
        }

        function handleSwipe(direction) {
            if (isAnimating) return;
            isAnimating = true;

            const topCard = getTopCard();
            if (!topCard) return;

            // Remove hint class and is-swiping
            topCard.classList.remove('peek-hint', 'is-swiping');

            // Add fly away animation class based on direction
            topCard.classList.add(direction === 'left' ? 'fly-left' : 'fly-right');

            // Wait for fly away animation to complete, then reset card
            setTimeout(() => {
                // Move to back of stack
                cardStack.appendChild(topCard);

                // Clean up classes and styles
                topCard.classList.remove('fly-left', 'fly-right');
                topCard.style.opacity = '';
                topCard.style.transform = '';

                // Reindex all cards
                reindexCards();

                // Update dot indicator
                currentIndex = (currentIndex + 1) % totalCards;
                updateDots();

                isAnimating = false;
            }, 500);
        }

        function snapBack(card) {
            card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.transform = '';
            setTimeout(() => {
                card.style.transition = '';
            }, 300);
        }

        // Touch events
        function onTouchStart(e) {
            if (isAnimating) return;
            const topCard = getTopCard();
            if (!topCard) return;

            const touch = e.touches[0];
            startX = touch.clientX;
            currentX = 0;
            isDragging = true;
            topCard.classList.add('is-swiping');
            topCard.classList.remove('peek-hint');
        }

        function onTouchMove(e) {
            if (!isDragging || isAnimating) return;
            const topCard = getTopCard();
            if (!topCard) return;

            const touch = e.touches[0];
            currentX = touch.clientX - startX;

            // Apply transform directly for instant response
            const rotation = currentX * 0.1;
            topCard.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
        }

        function onTouchEnd(e) {
            if (!isDragging) return;
            isDragging = false;

            const topCard = getTopCard();
            if (!topCard) return;
            topCard.classList.remove('is-swiping');

            // Lower threshold for easier swiping (was 80px)
            const threshold = 50;

            if (currentX < -threshold) {
                handleSwipe('left');
            } else if (currentX > threshold) {
                handleSwipe('right');
            } else {
                snapBack(topCard);
            }
        }

        // Mouse events for desktop testing
        let mouseDown = false;

        function onMouseDown(e) {
            if (isAnimating) return;
            const topCard = getTopCard();
            if (!topCard) return;

            startX = e.clientX;
            currentX = 0;
            mouseDown = true;
            isDragging = true;
            topCard.classList.add('is-swiping');
            topCard.classList.remove('peek-hint');
        }

        function onMouseMove(e) {
            if (!mouseDown || !isDragging || isAnimating) return;
            const topCard = getTopCard();
            if (!topCard) return;

            currentX = e.clientX - startX;
            const rotation = currentX * 0.1;
            topCard.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
        }

        function onMouseUp(e) {
            if (!mouseDown) return;
            mouseDown = false;
            isDragging = false;

            const topCard = getTopCard();
            if (!topCard) return;
            topCard.classList.remove('is-swiping');

            // Lower threshold for easier swiping (was 80px)
            const threshold = 50;

            if (currentX < -threshold) {
                handleSwipe('left');
            } else if (currentX > threshold) {
                handleSwipe('right');
            } else {
                snapBack(topCard);
            }
        }

        // Attach events to card stack
        cardStack.addEventListener('touchstart', onTouchStart, { passive: true });
        cardStack.addEventListener('touchmove', onTouchMove, { passive: true });
        cardStack.addEventListener('touchend', onTouchEnd);
        cardStack.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        // Initial peek animation on first top card
        const firstTopCard = getTopCard();
        if (firstTopCard) {
            setTimeout(() => {
                firstTopCard.classList.add('peek-hint');
            }, 500);
        }

        updateDots();
    }

    // Initialize card swiper
    initCardSwiper();

});
