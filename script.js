document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide scroll to top button
    function toggleScrollToTopButton() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleScrollToTopButton);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation for external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });
    
    // Simple animation on scroll for skill categories
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe skill categories, post cards, and experience items
    document.querySelectorAll('.skills-content p, .experience-item, .blog-post').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(el);
    });
    
    // Profile picture fade in/out on scroll
    const profilePic = document.querySelector('.profile-pic');
    const fadeStart = 0; // Scroll position to start fading out
    const fadeEnd = 300; // Scroll position where profile pic is fully faded out

    function handleProfilePicScroll() {
        const scrollY = window.pageYOffset;

        if (scrollY <= fadeStart) {
            // Fully visible at or before fadeStart
            profilePic.style.opacity = '1';
        } else if (scrollY >= fadeEnd) {
            // Fully faded out at or after fadeEnd
            profilePic.style.opacity = '0';
        } else {
            // Fade gradually between fadeStart and fadeEnd
            const opacity = 1 - ((scrollY - fadeStart) / (fadeEnd - fadeStart));
            profilePic.style.opacity = opacity.toString();
        }
    }

    window.addEventListener('scroll', handleProfilePicScroll);
    // Call once on load to set initial state
    handleProfilePicScroll();
    
    // Hero background image overlay fade on scroll
    const heroSection = document.querySelector('.hero');
    const overlayFadeStart = 0; // Scroll position to start darkening
    const overlayFadeEnd = 600; // Scroll position where overlay is fully dark
    const maxOverlayOpacity = 0.9; // Maximum opacity for the dark overlay

    function handleHeroOverlayScroll() {
        const scrollY = window.pageYOffset;

        if (scrollY <= overlayFadeStart) {
            // Overlay is fully transparent at or before overlayFadeStart
            heroSection.style.setProperty('--hero-overlay-opacity', '0');
        } else if (scrollY >= overlayFadeEnd) {
            // Overlay is fully dark at or after overlayFadeEnd
            heroSection.style.setProperty('--hero-overlay-opacity', maxOverlayOpacity.toString());
        } else {
            // Fade gradually between overlayFadeStart and overlayFadeEnd
            const opacity = (scrollY - overlayFadeStart) / (overlayFadeEnd - overlayFadeStart) * maxOverlayOpacity;
            heroSection.style.setProperty('--hero-overlay-opacity', opacity.toString());
        }
    }

    window.addEventListener('scroll', handleHeroOverlayScroll);
    // Call once on load to set initial state
    handleHeroOverlayScroll();
    
    // Mobile menu toggle (if needed in the future)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-menu-open');
        });
    }
    
    // Add active class to current page navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Simple form validation (for future contact forms)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Lazy loading for images (if added in the future)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});