document.addEventListener('DOMContentLoaded', () => {
    // --- Progress Bar ---
    const progressBarr = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBarr.style.width = scrolled + "%";
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Back to Top Button ---
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // --- Smooth Scroll for Nav Links ---
    const navLinks = document.querySelectorAll('.nav-links a, .footer-nav a, .hero-btns a, .learn-more');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Accounting for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Active Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const scrollHandler = () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', scrollHandler);

    // --- Scroll Reveal Animations ---
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: false // Keep animations once they appear
        });

        sr.reveal('.reveal-text', { origin: 'left', delay: 100 });
        sr.reveal('.badge', { delay: 50 });
        sr.reveal('.typing-text', { delay: 300 });
        sr.reveal('.hero p', { delay: 400 });
        sr.reveal('.hero-btns', { delay: 500 });
        sr.reveal('.social-links', { delay: 600 });
        sr.reveal('.reveal-up', { interval: 100 });
        sr.reveal('.reveal-left', { origin: 'left' });
        sr.reveal('.reveal-right', { origin: 'right' });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksUl = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // This is a simple implementation, you can make a more complex overlay if needed
            navLinksUl.classList.toggle('active');
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (navLinksUl.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
                // Basic mobile nav styling via JS if not in CSS
                navLinksUl.style.display = 'flex';
                navLinksUl.style.flexDirection = 'column';
                navLinksUl.style.position = 'fixed';
                navLinksUl.style.top = '80px';
                navLinksUl.style.left = '0';
                navLinksUl.style.width = '100%';
                navLinksUl.style.background = 'var(--dark-bg)';
                navLinksUl.style.padding = '2rem';
                navLinksUl.style.borderBottom = '1px solid var(--glass-border)';
                navLinksUl.style.zIndex = '998';
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
                navLinksUl.style.display = '';
            }
        });
    }

    // --- Theme Toggle ---
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;
    const themeIcon = themeBtn.querySelector('i');

    // Check for saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        
        if (isLight) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simple visual feedback
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message, ' + data.name + '! I will get back to you soon.');
                submitBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
