// =================
// Global Variables & Configuration
// =================
let currentTestimonial = 0;
let isAnimating = false;

// EmailJS Configuration
emailjs.init("ETSRT4w6OkBkKGBF4");

// Project Data for Modal
const projectData = {
    attendify: {
        title: "Attendify - Smart Attendance System",
        description: "A comprehensive attendance tracking system designed for educational institutions. Features real-time monitoring, automated notifications, and detailed analytics dashboard. The system uses QR code scanning and geolocation for accurate attendance recording.",
        features: [
            "Real-time attendance tracking",
            "QR code integration for quick check-ins",
            "Geofencing for location-based attendance",
            "Automated notifications to parents/guardians",
            "Comprehensive reporting and analytics",
            "Multi-user roles (Students, Teachers, Admins)"
        ],
        techStack: ["Ionic Framework", "Firebase", "TypeScript", "Angular", "Capacitor"],
        videoSrc: "videos/attendify-demo.mp4", // You would replace with actual video
        liveDemo: "#",
        sourceCode: "#"
    },
    easyticketpay: {
        title: "EasyTicketPay - Smart Payment Solution",
        description: "Revolutionary payment system for public transportation. Allows commuters to purchase, manage, and reload tickets seamlessly through their mobile devices. Integrates with multiple payment gateways and supports offline transactions.",
        features: [
            "Multiple payment gateway integration",
            "Offline transaction support",
            "Real-time balance tracking",
            "Trip history and receipts",
            "Multi-modal transport support",
            "QR code ticket validation"
        ],
        techStack: ["Ionic Framework", "Firebase", "Node.js", "Payment APIs", "PWA"],
        videoSrc: "videos/easyticketpay-demo.mp4",
        liveDemo: "#",
        sourceCode: "#"
    },
    bestbrightness: {
        title: "BestBrightness - E-commerce Platform",
        description: "Full-featured e-commerce website for cleaning products with comprehensive inventory management, secure payment processing, and customer relationship management. Built with Java and modern web technologies.",
        features: [
            "Product catalog with search and filters",
            "Shopping cart and checkout system",
            "Inventory management dashboard",
            "Order tracking and notifications",
            "Customer reviews and ratings",
            "Admin panel for content management"
        ],
        techStack: ["Java", "Spring Boot", "MySQL", "Bootstrap", "JavaScript"],
        videoSrc: "videos/bestbrightness-demo.mp4",
        liveDemo: "#",
        sourceCode: "#"
    },
    "snake-ladder": {
        title: "Snake & Ladder - Classic Board Game",
        description: "Modern implementation of the classic Snake and Ladder board game with enhanced graphics, sound effects, and AI opponents. Features multiple difficulty levels and multiplayer support for up to 4 players.",
        features: [
            "Single and multiplayer modes",
            "AI opponents with different difficulty levels",
            "Animated game pieces and board",
            "Sound effects and background music",
            "Game statistics and leaderboards",
            "Customizable board themes"
        ],
        techStack: ["Python", "Pygame", "AI Algorithms", "SQLite"],
        videoSrc: "videos/snake-ladder-demo.mp4",
        liveDemo: "#",
        sourceCode: "#"
    },
    "rock-paper-scissors": {
        title: "Rock Paper Scissors - AI Game",
        description: "Interactive Rock Paper Scissors game with intelligent AI that learns from player patterns. Features different AI difficulty levels, statistics tracking, and a sleek user interface with animations.",
        features: [
            "AI opponent with learning capabilities",
            "Pattern recognition and adaptation",
            "Multiple difficulty levels",
            "Game statistics and win/loss tracking",
            "Smooth animations and effects",
            "Sound effects and visual feedback"
        ],
        techStack: ["Python", "Tkinter", "Machine Learning", "Pattern Recognition"],
        videoSrc: "videos/rock-paper-scissors-demo.mp4",
        liveDemo: "#",
        sourceCode: "#"
    },
    "water-sort": {
        title: "Color Water Sort - Puzzle Game",
        description: "Addictive puzzle game where players sort colored water in tubes. Features progressive difficulty levels, hint system, and undo functionality. Built with Python and Pygame with smooth animations.",
        features: [
            "200+ challenging levels",
            "Progressive difficulty system",
            "Hint system and undo functionality",
            "Smooth liquid animations",
            "Achievement system",
            "Level editor for custom puzzles"
        ],
        techStack: ["Python", "Pygame", "Algorithm Design", "Physics Simulation"],
        videoSrc: "videos/water-sort-demo.mp4",
        liveDemo: "#",
        sourceCode: "#"
    }
};

// =================
// Utility Functions
// =================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// =================
// Navigation & Scroll Handling
// =================
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.backToTop = document.getElementById('backToTop');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navItems = document.querySelectorAll('.nav-links a');
        
        this.init();
    }
    
    init() {
        // Scroll event listener with throttling
        window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 16));
        
        // Mobile menu toggle
        this.menuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        
        // Close mobile menu when clicking on links
        this.navItems.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
                this.updateActiveLink(link.getAttribute('href'));
            });
        });
        
        // Back to top button
        this.backToTop.addEventListener('click', this.scrollToTop.bind(this));
        
        // Set initial active link
        this.updateActiveSection();
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Update navbar appearance
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
            this.backToTop.classList.add('visible');
        } else {
            this.navbar.classList.remove('scrolled');
            this.backToTop.classList.remove('visible');
        }
        
        // Update active section
        this.updateActiveSection();
    }
    
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        this.updateActiveLink(`#${currentSection}`);
    }
    
    updateActiveLink(href) {
        this.navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    }
    
    toggleMobileMenu() {
        this.menuToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    closeMobileMenu() {
        this.menuToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// =================
// Animation Observer
// =================
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);
            this.observeElements();
        }
    }
    
    observeElements() {
        const elements = document.querySelectorAll(
            '.skill-item, .service-card, .project-card, .blog-card, .testimonial-card, .highlight-item'
        );
        
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill progress circles
                if (entry.target.classList.contains('skill-item')) {
                    this.animateSkillProgress(entry.target);
                }
                
                // Stop observing once animated
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateSkillProgress(skillItem) {
        const skillValue = skillItem.getAttribute('data-skill');
        const progressCircle = skillItem.querySelector('.progress-ring-circle');
        
        if (progressCircle && skillValue) {
            const circumference = 2 * Math.PI * 50; // r = 50
            const offset = circumference - (skillValue / 100) * circumference;
            
            setTimeout(() => {
                progressCircle.style.strokeDashoffset = offset;
                progressCircle.style.stroke = 'var(--primary)';
            }, 200);
        }
    }
}

// =================
// Project Filter & Modal
// =================
class ProjectManager {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.modal = document.getElementById('projectModal');
        this.modalClose = this.modal.querySelector('.modal-close');
        this.projectButtons = document.querySelectorAll('.btn-view-project');
        
        this.init();
    }
    
    init() {
        // Filter functionality
        this.filterButtons.forEach(button => {
            button.addEventListener('click', this.handleFilter.bind(this));
        });
        
        // Project modal functionality
        this.projectButtons.forEach(button => {
            button.addEventListener('click', this.openProjectModal.bind(this));
        });
        
        this.modalClose.addEventListener('click', this.closeModal.bind(this));
        this.modal.addEventListener('click', this.handleModalOverlayClick.bind(this));
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }
    
    handleFilter(e) {
        const filterValue = e.target.getAttribute('data-filter');
        
        // Update active filter button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter projects with animation
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.classList.add('hidden');
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
            }
        });
    }
    
    openProjectModal(e) {
        e.preventDefault();
        const projectCard = e.target.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (!project) return;
        
        // Populate modal content
        this.populateModal(project);
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        this.modalClose.focus();
    }
    
    populateModal(project) {
        // Update title
        this.modal.querySelector('#modalTitle').textContent = project.title;
        
        // Update video
        const video = this.modal.querySelector('#projectVideo');
        video.src = project.videoSrc;
        video.poster = project.videoSrc.replace('.mp4', '-poster.jpg');
        
        // Update description
        this.modal.querySelector('#modalDescription').textContent = project.description;
        
        // Update features
        const featuresList = this.modal.querySelector('#modalFeatures');
        featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
        
        // Update tech stack
        const techStack = this.modal.querySelector('#modalTechStack');
        techStack.innerHTML = project.techStack.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        // Update links
        this.modal.querySelector('#liveDemo').href = project.liveDemo;
        this.modal.querySelector('#sourceCode').href = project.sourceCode;
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Pause video
        const video = this.modal.querySelector('#projectVideo');
        video.pause();
        video.currentTime = 0;
    }
    
    handleModalOverlayClick(e) {
        if (e.target === this.modal) {
            this.closeModal();
        }
    }
    
    handleKeydown(e) {
        if (e.key === 'Escape' && this.modal.classList.contains('active')) {
            this.closeModal();
        }
    }
}

// =================
// Testimonials Carousel
// =================
class TestimonialsCarousel {
    constructor() {
        this.track = document.querySelector('.testimonial-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.querySelector('.carousel-btn.prev-btn');
        this.nextBtn = document.querySelector('.carousel-btn.next-btn');
        this.indicators = document.querySelectorAll('.indicator');
        
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        if (!this.track || this.totalCards === 0) return;
        
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Auto-play
        this.startAutoPlay();
        
        // Pause auto-play on hover
        this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Initial state
        this.updateCarousel();
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
    }
    
    previousSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.isAnimating = true;
        
        // Update transform
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Reset animation flag
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    addTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoPlay();
        }, { passive: true });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            
            isDragging = false;
            this.startAutoPlay();
        }, { passive: true });
    }
    
    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// =================
// Contact Form
// =================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.statusDiv = document.getElementById('form-status');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
            input.addEventListener('input', debounce(this.validateField.bind(this), 300));
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) return;
        
        const submitButton = this.form.querySelector('.btn-submit');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(this.form);
            const templateParams = {
                from_name: formData.get('name'),
                reply_to: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            const response = await emailjs.send(
                'service_to028jf',
                'template_k9970or',
                templateParams
            );
            
            this.showStatus('Thank you! Your message has been sent successfully.', 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('Email send error:', error);
            this.showStatus('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField({ target: input })) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        // Show error if validation failed
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = 'var(--danger)';
            errorDiv.style.fontSize = '0.75rem';
            errorDiv.style.marginTop = '0.25rem';
            field.parentNode.appendChild(errorDiv);
        }
        
        return isValid;
    }
    
    showStatus(message, type) {
        this.statusDiv.textContent = message;
        this.statusDiv.className = `form-status ${type}`;
        this.statusDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.statusDiv.style.display = 'none';
        }, 5000);
    }
}

// =================
// Smooth Scrolling
// =================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleClick.bind(this));
        });
    }
    
    handleClick(e) {
        e.preventDefault();
        
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// =================
// Performance Optimizations
// =================
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadResources();
        
        // Optimize animations
        this.optimizeAnimations();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    preloadResources() {
        // Preload fonts
        const fontUrls = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap'
        ];
        
        fontUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }
    
    optimizeAnimations() {
        // Reduce animations for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition', 'none');
            document.documentElement.style.setProperty('--transition-slow', 'none');
        }
    }
}

// =================
// Initialize Everything
// =================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const navigationManager = new NavigationManager();
    const animationObserver = new AnimationObserver();
    const projectManager = new ProjectManager();
    const testimonialsCarousel = new TestimonialsCarousel();
    const contactForm = new ContactForm();
    const smoothScroll = new SmoothScroll();
    const performanceOptimizer = new PerformanceOptimizer();
    
    // Additional enhancements
    initializeParallaxEffects();
    initializeTypingAnimation();
    initializeCursorEffects();
});

// =================
// Additional Effects
// =================
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.01}deg)`;
        });
    }, 16));
}

function initializeTypingAnimation() {
    const typewriterElement = document.querySelector('.title-main');
    if (!typewriterElement) return;
    
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

function initializeCursorEffects() {
    // Custom cursor for interactive elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}