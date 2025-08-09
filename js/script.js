// Main JavaScript file for portfolio website functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initRTLToggle();
    initPortfolioFilter();
    initBlogFilter();
    initPricingToggle();
    initFAQ();
    initContactForm();
    initScrollAnimations();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('nav');
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });
}

// RTL Toggle functionality
function initRTLToggle() {
    const rtlToggle = document.getElementById('rtlToggle');
    const html = document.documentElement;
    
    if (rtlToggle) {
        rtlToggle.addEventListener('click', function() {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            
            html.setAttribute('dir', newDir);
            
            // Store preference in localStorage
            localStorage.setItem('textDirection', newDir);
            
            // Update toggle icon rotation
            const icon = rtlToggle.querySelector('svg');
            if (newDir === 'rtl') {
                icon.style.transform = 'scaleX(-1)';
            } else {
                icon.style.transform = 'scaleX(1)';
            }
        });
        
        // Load saved preference
        const savedDir = localStorage.getItem('textDirection');
        if (savedDir) {
            html.setAttribute('dir', savedDir);
            const icon = rtlToggle.querySelector('svg');
            if (savedDir === 'rtl') {
                icon.style.transform = 'scaleX(-1)';
            }
        }
    }
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Blog filter functionality
function initBlogFilter() {
    const filterButtons = document.querySelectorAll('.blog-filter');
    const blogItems = document.querySelectorAll('.blog-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            blogItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggleButtons = document.querySelectorAll('.pricing-toggle');
    const projectPricing = document.getElementById('projectPricing');
    const hourlyPricing = document.getElementById('hourlyPricing');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Toggle pricing sections
            if (type === 'project') {
                if (projectPricing) projectPricing.classList.remove('hidden');
                if (hourlyPricing) hourlyPricing.classList.add('hidden');
            } else {
                if (projectPricing) projectPricing.classList.add('hidden');
                if (hourlyPricing) hourlyPricing.classList.remove('hidden');
            }
        });
    });
}

// FAQ functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('svg');
            
            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('svg');
                    
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.classList.remove('open');
                    otherIcon.style.transform = 'rotate(0deg)';
                    otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current FAQ
            const isOpen = answer.classList.contains('open');
            
            if (isOpen) {
                answer.style.maxHeight = '0';
                answer.classList.remove('open');
                icon.style.transform = 'rotate(0deg)';
                this.setAttribute('aria-expanded', 'false');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.classList.add('open');
                icon.style.transform = 'rotate(180deg)';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// Global function for FAQ toggle (called from HTML)
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('svg');
    
    // Close other open FAQs
    document.querySelectorAll('.faq-question').forEach(otherQuestion => {
        if (otherQuestion !== button) {
            const otherItem = otherQuestion.parentElement;
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherIcon = otherQuestion.querySelector('svg');
            
            otherAnswer.style.maxHeight = '0';
            otherAnswer.classList.remove('open');
            otherIcon.style.transform = 'rotate(0deg)';
            otherQuestion.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Toggle current FAQ
    const isOpen = answer.classList.contains('open');
    
    if (isOpen) {
        answer.style.maxHeight = '0';
        answer.classList.remove('open');
        icon.style.transform = 'rotate(0deg)';
        button.setAttribute('aria-expanded', 'false');
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.classList.add('open');
        icon.style.transform = 'rotate(180deg)';
        button.setAttribute('aria-expanded', 'true');
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .skill-card, .timeline-card, .blog-item');
    animateElements.forEach(el => observer.observe(el));
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isVisible = !mobileMenu.classList.contains('invisible');
            
            if (isVisible) {
                mobileMenu.classList.add('opacity-0','hidden', 'invisible');
            } else {
                mobileMenu.classList.remove('opacity-0','hidden', 'invisible');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('opacity-0','hidden', 'invisible');
            }
        });
    }
}

// Global function for mobile dropdown toggle
function toggleMobileDropdown() {
    const dropdown = document.getElementById('mobileDropdown');
    const icon = document.getElementById('mobileDropdownIcon');
    
    if (dropdown && icon) {
        const isOpen = dropdown.style.maxHeight && dropdown.style.maxHeight !== '0px';
        
        if (isOpen) {
            dropdown.style.maxHeight = '0px';
            icon.style.transform = 'rotate(0deg)';
        } else {
            dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${getNotificationClasses(type)}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            ${getNotificationIcon(type)}
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

function getNotificationClasses(type) {
    switch (type) {
        case 'success':
            return 'bg-green-500 text-white';
        case 'error':
            return 'bg-red-500 text-white';
        case 'warning':
            return 'bg-yellow-500 text-white';
        default:
            return 'bg-blue-500 text-white';
    }
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        case 'error':
            return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
        case 'warning':
            return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>';
        default:
            return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    }
}

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

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are lazy images
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('invisible')) {
            mobileMenu.classList.add('opacity-0', 'invisible');
        }
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Add any scroll-based functionality here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Accessibility improvements
function initAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize accessibility features
initAccessibility();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Service worker registration (for PWA features if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you add a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Export functions for testing or external use
window.portfolioApp = {
    showNotification,
    validateEmail,
    validatePhone,
    toggleFAQ,
    toggleMobileDropdown
};