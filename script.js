// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollEffects();
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initParallaxEffect();
    initButtonAnimations();
});

// Scroll Effects for Navigation
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
            localStorage.setItem('darkMode', 'enabled');
        } else {
            disableDarkMode();
            localStorage.setItem('darkMode', null);
        }
    });
    
    function enableDarkMode() {
        body.classList.add('dark-mode');
        // Add dark mode styles dynamically
        if (!document.getElementById('dark-mode-styles')) {
            const darkStyles = document.createElement('style');
            darkStyles.id = 'dark-mode-styles';
            darkStyles.innerHTML = `
                .dark-mode {
                    background-color: #1a1a1a;
                    color: #ffffff;
                }
                .dark-mode .navbar {
                    background: rgba(26, 26, 26, 0.95);
                }
                .dark-mode .service-times-bar {
                    background: #2d2d2d;
                }
                .dark-mode .hero-section {
                    background-blend-mode: overlay;
                }
            `;
            document.head.appendChild(darkStyles);
        }
    }
    
    function disableDarkMode() {
        body.classList.remove('dark-mode');
    }
}

// Mobile Menu Enhancement
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    hide: true
                });
            }
        });
    });
    
    // Toggle classes for hamburger animation
    navbarToggler.addEventListener('click', function() {
        this.classList.toggle('collapsed');
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Button Animations and Interactions
function initButtonAnimations() {
    // Hero buttons animation
    const heroButtons = document.querySelectorAll('.hero-btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Achievement badge interaction
    const achievementBadge = document.querySelector('.achievement-badge');
    if (achievementBadge) {
        achievementBadge.addEventListener('click', function() {
            // Simulate badge click action
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 2s infinite';
            }, 100);
            
            // You can add actual functionality here
            console.log('Next Steps clicked!');
        });
    }
}

// Ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.hero-content > *');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initParallaxEffects();
    initInteractiveElements();
    initCounterAnimations();
    initSmoothScrolling();
    initImageLazyLoading();
});

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for mission lines
                if (entry.target.classList.contains('mission-line')) {
                    animateMissionLines();
                }
                
                // Special handling for value cards
                if (entry.target.classList.contains('value-card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, Math.random() * 300);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.value-card, .mission-content, .get-involved-inner');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Animate Mission Lines with Typing Effect
function animateMissionLines() {
    const missionLines = document.querySelectorAll('.mission-line');
    
    missionLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            
            // Add typing effect
            const text = line.textContent;
            line.textContent = '';
            let i = 0;
            
            const typeWriter = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeWriter);
                }
            }, 50);
            
        }, index * 200);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.get-involved-image, .mission-image');
    
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const speed = 0.5;
                
                if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                    const yPos = -(scrolled - rect.top) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        }, 10));
    }
}

// Interactive Elements
function initInteractiveElements() {
    // Mission Badge Interaction
    const missionBadge = document.querySelector('.badge-circle-mission');
    if (missionBadge) {
        missionBadge.addEventListener('click', function() {
            // Create ripple effect
            createRippleEffect(this);
            
            // Animate badge
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 2s infinite';
            }, 100);
            
            // Smooth scroll to get involved section
            document.querySelector('.get-involved-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Get Involved Button
    const getInvolvedBtn = document.querySelector('.btn-get-involved');
    if (getInvolvedBtn) {
        getInvolvedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            createRippleEffect(this);
            
            // Show success message
            showNotification('Thank you for your interest! We\'ll be in touch soon.');
        });
    }

    // Value Cards Hover Effects
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Create Ripple Effect
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Counter Animations (for future stats)
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Lazy Loading for Images
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce Function for Performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Ripple Animation Keyframes
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Page Load Animations
window.addEventListener('load', function() {
    // Trigger initial animations
    const missionContent = document.querySelector('.mission-content');
    if (missionContent) {
        setTimeout(() => {
            missionContent.classList.add('animate-in');
        }, 500);
    }
});

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #007bff, #28a745);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', debounce(() => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 10));
}

// Initialize scroll progress on load
initScrollProgress();

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart + 'ms');
        }, 0);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeEventCards();
    initializeScrollAnimations();
    initializeCardAnimations();
    addDynamicKeyframes();
});

// Initialize event card click handlers
function initializeEventCards() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const eventType = this.getAttribute('data-event');
            showEventDetails(eventType);
        });
        
        // Add accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        // Handle keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const eventType = this.getAttribute('data-event');
                showEventDetails(eventType);
            }
        });
    });
}

// Show event details (can be customized for modal or navigation)
function showEventDetails(eventType) {
    console.log('Showing details for:', eventType);
    
    // Format event name for display
    const eventName = eventType
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    // You can replace this with modal popup or navigation
    alert(`More details about ${eventName} coming soon!`);
    
    // Example: You could implement modal here
    // showEventModal(eventType);
    
    // Example: You could navigate to event page
    // window.location.href = `/events/${eventType}`;
}

// Handle "All Events" button click
function showAllEvents() {
    console.log('Navigating to all events page');
    alert('Redirecting to all events page...');
    
    // Example implementation:
    // window.location.href = '/events';
}

// Initialize scroll-based animations
function initializeScrollAnimations() {
    let ticking = false;
    
    function updateCards() {
        const cards = document.querySelectorAll('.event-card');
        const windowHeight = window.innerHeight;
        
        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardTop = cardRect.top;
            const cardBottom = cardRect.bottom;
            
            // Check if card is in viewport
            if (cardTop < windowHeight && cardBottom > 0) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0.8';
                card.style.transform = 'translateY(20px)';
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateCards);
            ticking = true;
        }
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', requestTick);
    
    // Initial call
    updateCards();
}

// Initialize staggered card animations on page load
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.event-card');
    
    cards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        
        // Add hover enhancement
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add CSS animation keyframes dynamically
function addDynamicKeyframes() {
    // Check if keyframes already exist
    if (document.getElementById('dynamic-keyframes')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'dynamic-keyframes';
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Utility function to format event dates
function formatEventDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Function to add new event card dynamically (for future use)
function addEventCard(eventData, container) {
    const eventCard = document.createElement('div');
    eventCard.className = 'col-lg-4 col-md-6 mb-4';
    
    eventCard.innerHTML = `
        <div class="event-card" data-event="${eventData.slug}">
            <div class="event-card-bg ${eventData.backgroundClass}"></div>
            <div class="event-card-overlay">
                <div class="decorative-elements">
                    <i class="${eventData.icon}"></i>
                </div>
                <div class="event-content">
                    <div class="event-date">${eventData.date}</div>
                    <div class="event-title">${eventData.title}</div>
                    <div class="event-location">${eventData.location}</div>
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(eventCard);
    
    // Re-initialize click handlers for new card
    const newCard = eventCard.querySelector('.event-card');
    newCard.addEventListener('click', function() {
        const eventType = this.getAttribute('data-event');
        showEventDetails(eventType);
    });
}

// Function to filter events by date or type
function filterEvents(filterType, filterValue) {
    const cards = document.querySelectorAll('.event-card');
    
    cards.forEach(card => {
        const cardContainer = card.closest('.col-lg-4');
        let shouldShow = false;
        
        switch(filterType) {
            case 'month':
                const eventDate = card.querySelector('.event-date').textContent;
                shouldShow = eventDate.toLowerCase().includes(filterValue.toLowerCase());
                break;
            case 'type':
                const eventType = card.getAttribute('data-event');
                shouldShow = eventType.includes(filterValue);
                break;
            default:
                shouldShow = true;
        }
        
        if (shouldShow) {
            cardContainer.style.display = 'block';
            card.style.animation = 'fadeInUp 0.4s ease-out';
        } else {
            cardContainer.style.display = 'none';
        }
    });
}

// Intersection Observer for better performance (alternative to scroll events)
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = '0.8';
                entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, observerOptions);
    
    // Observe all event cards
    document.querySelectorAll('.event-card').forEach(card => {
        observer.observe(card);
    });
}

// Export functions for potential external use
window.EventsModule = {
    showEventDetails,
    showAllEvents,
    addEventCard,
    filterEvents,
    formatEventDate
};

// Discover motivation
// Discover Motivation Carousel JavaScript

class DiscoverCarousel {
    constructor() {
        this.carousel = document.getElementById('discoverCarousel');
        this.cards = document.querySelectorAll('.discover-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.cardWidth = 430; // 400px width + 30px gap
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateCarousel();
        this.startAutoPlay();
        this.handleResize();
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Dot indicators
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Card click events
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => this.handleCardClick(card, index));
        });
        
        // Touch/swipe support
        this.addSwipeSupport();
        
        // Keyboard navigation
        this.addKeyboardSupport();
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    updateCarousel() {
        // Calculate transform value
        const transformValue = -this.currentIndex * this.cardWidth;
        this.carousel.style.transform = `translateX(${transformValue}px)`;
        
        // Update active states
        this.updateActiveStates();
        
        // Update dots
        this.updateDots();
    }
    
    updateActiveStates() {
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalCards) {
            this.currentIndex = index;
            this.updateCarousel();
            this.resetAutoPlay();
        }
    }
    
    handleCardClick(card, index) {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('.card-title').textContent;
        
        // If clicking on non-active card, make it active
        if (index !== this.currentIndex) {
            this.goToSlide(index);
            return;
        }
        
        // Handle active card click - navigate or show details
        this.showCategoryDetails(category, title);
    }
    
    showCategoryDetails(category, title) {
        console.log(`Showing details for: ${category} - ${title}`);
        
        // You can implement different actions based on category
        switch(category) {
            case 'visit':
                this.handleVisitClick();
                break;
            case 'grow':
                this.handleGrowClick();
                break;
            case 'community':
                this.handleCommunityClick();
                break;
            case 'connect':
                this.handleConnectClick();
                break;
            case 'serve':
                this.handleServeClick();
                break;
            default:
                alert(`Learn more about ${title}`);
        }
    }
    
    handleVisitClick() {
        // Navigate to new visitor page or show modal
        alert('Welcome! Learn more about visiting Motivation Church');
        // window.location.href = '/visit';
    }
    
    handleGrowClick() {
        // Navigate to growth/discipleship page
        alert('Discover your next steps in faith');
        // window.location.href = '/grow';
    }
    
    handleCommunityClick() {
        // Navigate to small groups page
        alert('Find your community in small groups');
        // window.location.href = '/small-groups';
    }
    
    handleConnectClick() {
        // Navigate to connection opportunities
        alert('Get connected with others');
        // window.location.href = '/connect';
    }
    
    handleServeClick() {
        // Navigate to volunteer opportunities
        alert('Find ways to serve and make a difference');
        // window.location.href = '/serve';
    }
    
    addSwipeSupport() {
        let startX = 0;
        let currentX = 0;
        let isSwipe = false;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwipe = true;
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            if (!isSwipe) return;
            currentX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchend', () => {
            if (!isSwipe) return;
            
            const diff = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isSwipe = false;
        });
    }
    
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            // Only handle keyboard if carousel is in focus area
            if (document.activeElement.closest('.discover-section')) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prevSlide();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                    case 'Enter':
                    case ' ':
                        if (document.activeElement.classList.contains('discover-card')) {
                            e.preventDefault();
                            const index = Array.from(this.cards).indexOf(document.activeElement);
                            this.handleCardClick(document.activeElement, index);
                        }
                        break;
                }
            }
        });
        
        // Make cards focusable
        this.cards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `${card.querySelector('.card-category').textContent} - ${card.querySelector('.card-title').textContent}`);
        });
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    handleResize() {
        // Recalculate card width based on screen size
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 576) {
            this.cardWidth = 280; // 250px + 30px gap
        } else if (screenWidth <= 768) {
            this.cardWidth = 310; // 280px + 30px gap
        } else if (screenWidth <= 992) {
            this.cardWidth = 350; // 320px + 30px gap
        } else if (screenWidth <= 1200) {
            this.cardWidth = 380; // 350px + 30px gap
        } else {
            this.cardWidth = 430; // 400px + 30px gap
        }
        
        this.updateCarousel();
    }
    
    // Public methods for external control
    pause() {
        this.stopAutoPlay();
    }
    
    play() {
        this.startAutoPlay();
    }
    
    getCurrentIndex() {
        return this.currentIndex;
    }
    
    getTotalCards() {
        return this.totalCards;
    }
    
    // Method to destroy the carousel instance
    destroy() {
        this.stopAutoPlay();
        // Remove event listeners
        this.prevBtn.removeEventListener('click', () => this.prevSlide());
        this.nextBtn.removeEventListener('click', () => this.nextSlide());
        this.carousel.removeEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.removeEventListener('mouseleave', () => this.startAutoPlay());
        window.removeEventListener('resize', () => this.handleResize());
    }
}

// Intersection Observer for performance optimization
class DiscoverAnimationObserver {
    constructor() {
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe section title and cards
        const elementsToObserve = document.querySelectorAll('.section-title, .discover-card');
        elementsToObserve.forEach(el => this.observer.observe(el));
    }
    
    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if required elements exist
    const carouselElement = document.getElementById('discoverCarousel');
    if (!carouselElement) {
        console.warn('Discover carousel element not found');
        return;
    }
    
    // Initialize carousel
    const carousel = new DiscoverCarousel();
    
    // Initialize animation observer
    const animationObserver = new DiscoverAnimationObserver();
    
    // Add CSS for animation observer
    const style = document.createElement('style');
    style.textContent = `
        .section-title,
        .discover-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .section-title.animate-in,
        .discover-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .discover-card.animate-in:nth-child(1) { transition-delay: 0.1s; }
        .discover-card.animate-in:nth-child(2) { transition-delay: 0.2s; }
        .discover-card.animate-in:nth-child(3) { transition-delay: 0.3s; }
        .discover-card.animate-in:nth-child(4) { transition-delay: 0.4s; }
        .discover-card.animate-in:nth-child(5) { transition-delay: 0.5s; }
        
        /* Ensure smooth transitions */
        .discover-carousel {
            transition: transform 0.3s ease-in-out;
        }
        
        /* Card hover effects */
        .discover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .discover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .discover-card.active {
            transform: scale(1.02);
        }
        
        .discover-card.active:hover {
            transform: scale(1.02) translateY(-5px);
        }
    `;
    document.head.appendChild(style);
    
    // Global access to carousel instance
    window.discoverCarousel = carousel;
    window.discoverAnimationObserver = animationObserver;
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (window.discoverCarousel) {
            window.discoverCarousel.destroy();
        }
        if (window.discoverAnimationObserver) {
            window.discoverAnimationObserver.disconnect();
        }
    });
});

// Utility functions
const DiscoverUtils = {
    // Add new card dynamically
    addCard: function(cardData) {
        const carousel = document.getElementById('discoverCarousel');
        if (!carousel) return false;
        
        const cardHTML = `
            <div class="discover-card" data-category="${cardData.category}">
                <div class="discover-card-image">
                    <img src="${cardData.image}" alt="${cardData.title}" class="card-bg-image">
                    <div class="card-overlay"></div>
                </div>
                <div class="card-content">
                    <div class="card-category">${cardData.category.toUpperCase()}</div>
                    <h3 class="card-title">${cardData.title}</h3>
                    <a href="#" class="learn-more-btn">
                        Learn More <i class="fas fa-chevron-right"></i>
                    </a>
                </div>
            </div>
        `;
        carousel.insertAdjacentHTML('beforeend', cardHTML);
        
        // Add corresponding dot
        const dotsContainer = document.getElementById('carouselDots');
        if (dotsContainer) {
            const newDot = document.createElement('span');
            newDot.className = 'dot';
            newDot.setAttribute('data-slide', carousel.children.length - 1);
            dotsContainer.appendChild(newDot);
        }
        
        // Reinitialize carousel if it exists
        if (window.discoverCarousel) {
            window.discoverCarousel.destroy();
            window.discoverCarousel = new DiscoverCarousel();
        }
        
        return true;
    },
    
    // Get current active card data
    getActiveCardData: function() {
        const activeCard = document.querySelector('.discover-card.active');
        if (activeCard) {
            return {
                category: activeCard.getAttribute('data-category'),
                title: activeCard.querySelector('.card-title').textContent,
                categoryText: activeCard.querySelector('.card-category').textContent,
                image: activeCard.querySelector('.card-bg-image').src,
                element: activeCard
            };
        }
        return null;
    },
    
    // Remove card by index
    removeCard: function(index) {
        const cards = document.querySelectorAll('.discover-card');
        const dots = document.querySelectorAll('.dot');
        
        if (index >= 0 && index < cards.length) {
            cards[index].remove();
            if (dots[index]) {
                dots[index].remove();
            }
            
            // Update remaining dots data-slide attributes
            const remainingDots = document.querySelectorAll('.dot');
            remainingDots.forEach((dot, i) => {
                dot.setAttribute('data-slide', i);
            });
            
            // Reinitialize carousel
            if (window.discoverCarousel) {
                window.discoverCarousel.destroy();
                window.discoverCarousel = new DiscoverCarousel();
            }
            
            return true;
        }
        return false;
    },
    
    // Update card content
    updateCard: function(index, cardData) {
        const cards = document.querySelectorAll('.discover-card');
        if (index >= 0 && index < cards.length) {
            const card = cards[index];
            
            if (cardData.category) {
                card.setAttribute('data-category', cardData.category);
                card.querySelector('.card-category').textContent = cardData.category.toUpperCase();
            }
            
            if (cardData.title) {
                card.querySelector('.card-title').textContent = cardData.title;
            }
            
            if (cardData.image) {
                card.querySelector('.card-bg-image').src = cardData.image;
                card.querySelector('.card-bg-image').alt = cardData.title || 'Card Image';
            }
            
            return true;
        }
        return false;
    },
    
    // Get all cards data
    getAllCardsData: function() {
        const cards = document.querySelectorAll('.discover-card');
        return Array.from(cards).map((card, index) => ({
            index,
            category: card.getAttribute('data-category'),
            title: card.querySelector('.card-title').textContent,
            categoryText: card.querySelector('.card-category').textContent,
            image: card.querySelector('.card-bg-image').src,
            isActive: card.classList.contains('active')
        }));
    },
    
    // Validate card data
    validateCardData: function(cardData) {
        const required = ['category', 'title', 'image'];
        const missing = required.filter(field => !cardData[field]);
        
        if (missing.length > 0) {
            console.warn('Missing required card data fields:', missing);
            return false;
        }
        
        return true;
    }
};

// Export for use in other modules (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DiscoverCarousel,
        DiscoverAnimationObserver,
        DiscoverUtils
    };
}