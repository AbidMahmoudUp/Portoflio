// Project Gallery Data
const projectGalleries = {
    recetta: {
        title: 'Recetta - AI-Powered Cooking Assistant',
        images: [
            'assets/Recetta/1.jpg',
            'assets/Recetta/2.jpg',
            'assets/Recetta/3.jpg',
            'assets/Recetta/4.jpg',
            'assets/Recetta/5.jpg',
            'assets/Recetta/6.jpg',
            'assets/Recetta/7.jpg',
            'assets/Recetta/8.jpg',
            'assets/Recetta/9.jpg',
            'assets/Recetta/10.jpg',

        ]
    },
    farming: {
        title: 'Smart Farming Management Platform',
        images: [
            'assets/Smart_farming/1.png',
            'assets/Smart_farming/2.png',
            'assets/Smart_farming/3.png',
            'assets/Smart_farming/4.png',
            'assets/Smart_farming/5.png',
            'assets/Smart_farming/6.png',
            'assets/Smart_farming/7.png',
            'assets/Smart_farming/8.png',
            'assets/Smart_farming/9.png',

        ]
    }
};

let currentGallery = null;
let currentImageIndex = 0;

// Gallery Functions
function openProjectGallery(projectKey) {
    if (!projectGalleries[projectKey]) return;
    
    currentGallery = projectGalleries[projectKey];
    currentImageIndex = 0;
    
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryTitle');
    
    title.textContent = currentGallery.title;
    
    // Populate thumbnails
    populateThumbnails();
    
    // Set main image
    updateMainImage();
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add active class for animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeProjectGallery() {
    const modal = document.getElementById('galleryModal');
    
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        currentGallery = null;
        currentImageIndex = 0;
    }, 400);
}

function populateThumbnails() {
    const container = document.getElementById('thumbnailContainer');
    container.innerHTML = '';
    
    currentGallery.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.innerHTML = `<img src="${image}" alt="Screenshot ${index + 1}" onerror="this.parentElement.style.display='none'">`;
        
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateMainImage();
            updateActiveThumbnail();
        });
        
        container.appendChild(thumbnail);
    });
}

function updateMainImage() {
    const mainImage = document.getElementById('mainImage');
    if (currentGallery && currentGallery.images[currentImageIndex]) {
        mainImage.src = currentGallery.images[currentImageIndex];
        mainImage.alt = `${currentGallery.title} - Screenshot ${currentImageIndex + 1}`;
        
        // Add loading animation
        mainImage.style.opacity = '0';
        mainImage.onload = () => {
            mainImage.style.transition = 'opacity 0.3s ease';
            mainImage.style.opacity = '1';
        };
    }
}

function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

function changeImage(direction) {
    if (!currentGallery) return;
    
    const newIndex = currentImageIndex + direction;
    
    if (newIndex >= 0 && newIndex < currentGallery.images.length) {
        currentImageIndex = newIndex;
        updateMainImage();
        updateActiveThumbnail();
    }
}

// Keyboard navigation for gallery
document.addEventListener('keydown', function(e) {
    if (currentGallery) {
        switch(e.key) {
            case 'Escape':
                closeProjectGallery();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                changeImage(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                changeImage(1);
                break;
        }
    }
});

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loading').classList.add('fade-out');
    }, 1000);
});

// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'CsT3XUTQ8yAE9dSwX',
    SERVICE_ID: 'Portfolio',
    TEMPLATE_ID: 'template_zt3hymk'
};

// Initialize EmailJS
function initEmailJS() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// Initialize EmailJS when DOM loads
document.addEventListener('DOMContentLoaded', initEmailJS);

// Theme Toggle with improved dark mode header
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    }
});

// Enhanced Header scroll effect with proper dark mode support
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scrollProgress');
    
    // Header scroll effect
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Scroll progress
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
});

// Smooth Scrolling
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

// Enhanced Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add stagger animation for skill categories
            if (entry.target.classList.contains('skills-grid')) {
                const skillCategories = entry.target.querySelectorAll('.skill-category');
                skillCategories.forEach((category, index) => {
                    setTimeout(() => {
                        category.style.transform = 'translateY(0)';
                        category.style.opacity = '1';
                    }, index * 150);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Initialize skill category animations
document.querySelectorAll('.skill-category').forEach(category => {
    category.style.transform = 'translateY(50px)';
    category.style.opacity = '0';
    category.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Rate limiting for contact form
const RATE_LIMIT = {
    maxSubmissions: 3,
    timeWindow: 60 * 1000, // 1 minute
    submissions: []
};

function checkRateLimit() {
    const now = Date.now();
    
    // Remove old submissions outside time window
    RATE_LIMIT.submissions = RATE_LIMIT.submissions.filter(
        time => now - time < RATE_LIMIT.timeWindow
    );
    
    if (RATE_LIMIT.submissions.length >= RATE_LIMIT.maxSubmissions) {
        showNotification('Too many submissions. Please wait before sending another message.', 'error');
        return false;
    }
    
    RATE_LIMIT.submissions.push(now);
    return true;
}

// Enhanced Contact Form with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check rate limit
    if (!checkRateLimit()) {
        return;
    }
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate all fields are filled
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate field lengths
    if (name.length < 2 || name.length > 50) {
        showNotification('Name must be between 2 and 50 characters', 'error');
        return;
    }
    
    if (subject.length < 5 || subject.length > 100) {
        showNotification('Subject must be between 5 and 100 characters', 'error');
        return;
    }
    
    if (message.length < 10 || message.length > 1000) {
        showNotification('Message must be between 10 and 1000 characters', 'error');
        return;
    }
    
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Prepare template parameters to match your EmailJS template
    const templateParams = {
        name: name,
        time: new Date().toLocaleString(),
        message: `Subject: ${subject}\n\nEmail: ${email}\n\nMessage:\n${message}`
    };
    
    // Send email using EmailJS
    emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID, 
        EMAILJS_CONFIG.TEMPLATE_ID, 
        templateParams
    )
    .then(function(response) {
        console.log('Email sent successfully!', response.status, response.text);
        
        // Add success animation to form
        const form = document.getElementById('contactForm');
        form.classList.add('success-animation');
        
        // Add success styling to submit button
        submitBtn.classList.add('form-success');
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent Successfully!';
        
        // Enhanced success notification
        showNotification('🎉 Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            form.classList.remove('success-animation');
            submitBtn.classList.remove('form-success');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
        
    })
    .catch(function(error) {
        console.error('Email sending failed:', error);
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        
        // Provide fallback mailto option
        setTimeout(() => {
            const fallbackMessage = `Would you like to send this message via your email client instead?`;
            if (confirm(fallbackMessage)) {
                const mailtoLink = `mailto:mahmoudabidup@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                window.location.href = mailtoLink;
            }
        }, 2000);
    })
    .finally(function() {
        // Only reset if not successful (success case is handled above)
        if (!submitBtn.classList.contains('form-success')) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
});

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    
    notification.innerHTML = `
        <i class="${icons[type]}" style="margin-right: 0.75rem; font-size: 1.2rem;"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1.2rem 1.8rem;
        background: ${colors[type]};
        color: white;
        border-radius: 15px;
        font-weight: 600;
        z-index: 10001;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        max-width: 400px;
        font-size: 1rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    `;
    
    // Add special animation for success
    if (type === 'success') {
        notification.style.animation = 'successSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add confetti effect for success
        createConfetti();
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    const displayTime = type === 'success' ? 5000 : 4000;
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, displayTime);
}

// Add success slide-in animation
const successKeyframes = `
    @keyframes successSlideIn {
        0% {
            transform: translateX(400px) scale(0.8);
            opacity: 0;
        }
        50% {
            transform: translateX(-20px) scale(1.05);
            opacity: 1;
        }
        100% {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
`;

const successStyle = document.createElement('style');
successStyle.textContent = successKeyframes;
document.head.appendChild(successStyle);

// Confetti animation for success
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            right: ${Math.random() * 200 + 100}px;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
            pointer-events: none;
            z-index: 10002;
            border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 4000);
    }
}

// Add confetti animation keyframes
const confettiKeyframes = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;

const confettiStyle = document.createElement('style');
confettiStyle.textContent = confettiKeyframes;
document.head.appendChild(confettiStyle);

// Typewriter effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    
    // Set fixed height to prevent layout jumping
    element.style.minHeight = element.offsetHeight || '1.2em';
    
    function startCycle() {
        element.innerHTML = '';
        element.style.borderRight = '3px solid white';
        element.style.animation = 'blink 1s infinite';
        i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                    
                    // Wait a moment then start again
                    setTimeout(() => {
                        startCycle(); // Restart the cycle
                    }, 1000); // 1 second pause before restarting
                }, 1000);
            }
        }
        type();
    }
    
    // Start the continuous cycle
    startCycle();
}

// Add blinking cursor animation
const blinkKeyframes = `
    @keyframes blink {
        0%, 50% { border-color: white; }
        51%, 100% { border-color: transparent; }
    }
`;

const blinkStyle = document.createElement('style');
blinkStyle.textContent = blinkKeyframes;
document.head.appendChild(blinkStyle);

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        const heroTitle = document.getElementById('heroTitle');
        if (heroTitle) {
            typeWriter(heroTitle, 'Mahmoud Abid', 120);
        }
    }, 1500);
});

// Enhanced parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add particle system for hero background
function createParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 4 + 3}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation keyframes
const particleKeyframes = `
    @keyframes particleFloat {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3; 
        }
        25% { 
            transform: translateY(-30px) rotate(90deg); 
            opacity: 0.7; 
        }
        50% { 
            transform: translateY(-60px) rotate(180deg); 
            opacity: 1; 
        }
        75% { 
            transform: translateY(-30px) rotate(270deg); 
            opacity: 0.7; 
        }
    }
`;

const particleStyle = document.createElement('style');
particleStyle.textContent = particleKeyframes;
document.head.appendChild(particleStyle);

// Initialize particle system
createParticleSystem();

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateX(5deg)';
        this.style.boxShadow = 'var(--shadow-heavy)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0deg)';
        this.style.boxShadow = 'var(--shadow-medium)';
    });
});

// Console welcome message
console.log(`
    🚀 Welcome to Mahmoud Abid's Enhanced Portfolio!
    
    ✨ Features:
    • Stunning animations and micro-interactions
    • Responsive design with modern aesthetics
    • Dark mode support with proper header behavior
    • Enhanced performance and accessibility
    • Custom particle system and parallax effects
    • Integrated EmailJS contact form
    • Professional project gallery modal
    
    Built with passion using:
    • HTML5 & Advanced CSS3
    • Vanilla JavaScript & Modern APIs
    • Custom animations and transitions
    • Responsive design principles
    
    Let's connect and build something extraordinary together!
    📧 mahmoudabidup@gmail.com
    📱 +216 26 371 661
`);

// Add smooth reveal animations for sections
function addRevealAnimations() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        observer.observe(section);
    });
}

// Initialize reveal animations
addRevealAnimations();

// Add mobile menu functionality
function initMobileMenu() {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (!document.querySelector('.mobile-menu-toggle') && nav && navLinks) {
            const hamburger = document.createElement('button');
            hamburger.className = 'mobile-menu-toggle';
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.style.cssText = `
                display: block;
                background: none;
                border: none;
                color: var(--primary-color);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 5px;
                transition: all 0.3s ease;
            `;
            
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                nav.insertBefore(hamburger, themeToggle);
            }
            
            hamburger.addEventListener('click', () => {
                const isOpen = navLinks.style.display === 'flex';
                navLinks.style.display = isOpen ? 'none' : 'flex';
                hamburger.querySelector('i').className = isOpen ? 'fas fa-bars' : 'fas fa-times';
                
                if (!isOpen) {
                    navLinks.style.cssText = `
                        display: flex;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        flex-direction: column;
                        background: var(--card-bg);
                        padding: 2rem;
                        box-shadow: var(--shadow-medium);
                        border-radius: 0 0 15px 15px;
                    `;
                }
            });
        }
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();