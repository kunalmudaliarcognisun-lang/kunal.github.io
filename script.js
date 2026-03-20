/**
 * ═══════════════════════════════════════════════════
 * PRISM LUX — CORE LOGIC
 * ═══════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollAnimations();
    initNavbar();
    initTilt();
});

/**
 * ═════════ CUSTOM CURSOR ═════════
 */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
    let fPosX = 0, fPosY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth follower animation
    function animate() {
        posX += (mouseX - posX) * 0.2;
        posY += (mouseY - posY) * 0.2;
        fPosX += (mouseX - fPosX) * 0.1;
        fPosY += (mouseY - fPosY) * 0.1;

        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        follower.style.transform = `translate3d(${fPosX - 20}px, ${fPosY - 20}px, 0)`;

        requestAnimationFrame(animate);
    }
    animate();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .bento-card, .project-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '80px';
            follower.style.height = '80px';
            follower.style.transform = `translate3d(${fPosX - 40}px, ${fPosY - 40}px, 0)`;
            follower.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            follower.style.borderColor = 'rgba(255, 255, 255, 0.8)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.backgroundColor = 'transparent';
            follower.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        });
    });
}

/**
 * ═════════ SCROLL ANIMATIONS ═════════
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to sections and cards
    const animElements = document.querySelectorAll('.bento-card, .project-item, .section-title, .section-label');
    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Add a custom class to trigger the transition
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * ═════════ NAVBAR ADAPTATION ═════════
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.height = '56px';
            navbar.style.top = '12px';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.6)';
            navbar.style.height = '64px';
            navbar.style.top = '24px';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        }
    });
}

/**
 * ═════════ 3D TILT EFFECT ═════════
 */
function initTilt() {
    const cards = document.querySelectorAll('.bento-card, .project-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0,0,0,0.5)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = 'none';
        });
    });
}
