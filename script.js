// Cursor Follower
const cursorFollower = document.getElementById('cursorFollower');
let isMouseMoving = false;
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Mouse movement tracking
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isMouseMoving) {
        cursorFollower.classList.add('active');
        isMouseMoving = true;
    }
    
    // Update follower position with smooth animation
    requestAnimationFrame(() => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    });
});

// Hide cursor follower when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursorFollower.classList.remove('active');
    isMouseMoving = false;
});

// Show cursor follower when mouse enters window
document.addEventListener('mouseenter', () => {
    if (isMouseMoving) {
        cursorFollower.classList.add('active');
    }
});

// Touch movement tracking for mobile/tablet
let touchActive = false;

document.addEventListener('touchstart', (e) => {
    touchActive = true;
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    followerX = mouseX;
    followerY = mouseY;
    cursorFollower.classList.add('active');
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (touchActive) {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        
        // Smooth follow for touch
        requestAnimationFrame(() => {
            followerX += (mouseX - followerX) * 0.2;
            followerY += (mouseY - followerY) * 0.2;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
        });
    }
}, { passive: true });

document.addEventListener('touchend', () => {
    touchActive = false;
    // Keep it visible for a moment, then fade out
    setTimeout(() => {
        if (!touchActive && !isMouseMoving) {
            cursorFollower.classList.remove('active');
        }
    }, 300);
});

// Keep default cursor visible
document.body.style.cursor = 'default';

// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect - always visible with enhanced styling
navbar.classList.add('scrolled'); // Always keep navbar visible and styled

window.addEventListener('scroll', () => {
    // Keep navbar always visible with scrolled styling
    navbar.classList.add('scrolled');
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
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
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    // Skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => observer.observe(item));

    // Cert cards
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
        observer.observe(card);
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => observer.observe(card));

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillBarObserver.observe(bar));
});

// Swipe gestures for mobile
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Only handle horizontal swipes if they're more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
            // Swipe right - could navigate to previous section
            console.log('Swipe right detected');
        } else {
            // Swipe left - could navigate to next section
            console.log('Swipe left detected');
        }
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    }

    // Parallax for gradient orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        orb.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.1}px)`;
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Create mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:zamkhammohsin@gmail.com?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// Active navigation link highlighting
const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = Array.from(navLinks);

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 150; // Offset for navbar height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if we're in this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    // If at the very top, highlight home
    if (window.pageYOffset < 100) {
        current = 'home';
    }

    // If at the bottom, highlight the last section
    if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
            current = lastSection.getAttribute('id');
        }
    }

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (current === 'home' && href === '#home')) {
            link.classList.add('active');
        }
    });
}

// Update on scroll
window.addEventListener('scroll', updateActiveNav);

// Update on page load
updateActiveNav();

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Subtle parallax effect for background orbs (works alongside cursor follower)
document.addEventListener('mousemove', (e) => {
    const parallaxX = e.clientX / window.innerWidth;
    const parallaxY = e.clientY / window.innerHeight;

    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const moveX = (parallaxX - 0.5) * (10 + index * 5);
        const moveY = (parallaxY - 0.5) * (10 + index * 5);
        orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Scroll to top functionality (optional)
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: var(--bg-primary);
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add ripple effect to buttons
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
