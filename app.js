// Contact information
const contactInfo = {
    name: 'Engineer Dr. Pulak Kanti Barua, FIEB',
    firstName: 'Pulak',
    lastName: 'Barua',
    title: 'Director & Founder',
    company: 'Grihayan Limited',
    email: 'pulak@grihayanbd.com',
    phone: '+8801755608365',
    phoneDisplay: '01755608365',
    whatsapp: '+8801755608365'
};

// Social media links
const socialLinks = {
    facebook: 'https://www.facebook.com/pulak.kantibarua.92',
    linkedin: '#',
    youtube: 'https://www.youtube.com/@eng.pulakkantibarua1963',
    instagram: 'https://www.instagram.com/pula.k1612/'
};

// Toast notification
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Generate vCard
function generateVCard() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
N:${contactInfo.lastName};${contactInfo.firstName};;;
ORG:${contactInfo.company}
TITLE:${contactInfo.title}
TEL;TYPE=CELL:${contactInfo.phone}
EMAIL:${contactInfo.email}
END:VCARD`;
    
    return vcard;
}

// Download vCard
function downloadVCard() {
    const vcard = generateVCard();
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contactInfo.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    showToast('Contact saved to your device!');
}

// Connect via WhatsApp
function connectWhatsApp() {
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, '')}`;
    showToast('Opening WhatsApp...');
    
    // Small delay to show toast before opening
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 500);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Save Contact button
    const saveContactBtn = document.getElementById('saveContact');
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadVCard();
        });
    }
    
    // Connect button
    const connectBtn = document.getElementById('connect');
    if (connectBtn) {
        connectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            connectWhatsApp();
        });
    }
    
    // Social media links
    const socialLinksElements = document.querySelectorAll('.social-link');
    socialLinksElements.forEach((link, index) => {
        const platforms = ['facebook', 'linkedin', 'youtube', 'instagram'];
        const platform = platforms[index];
        
        if (socialLinks[platform] && socialLinks[platform] !== '#') {
            link.href = socialLinks[platform];
            link.target = '_blank';
        } else {
            // Add click handler for placeholder links
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showToast(`${platform.charAt(0).toUpperCase() + platform.slice(1)} link coming soon!`);
            });
        }
    });
    
    // Shop and Login links
    const shopLink = document.querySelector('.nav-link.shop');
    const loginLink = document.querySelector('.nav-link.login');
    
    if (shopLink) {
        shopLink.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Shop coming soon!');
        });
    }
    
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Login coming soon!');
        });
    }
    
    // Add loading state to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
    
    // Handle contact row clicks for better mobile experience
    const contactRows = document.querySelectorAll('.contact-row');
    contactRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Add subtle feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.btn, .social-link, .contact-row');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.opacity = '0.7';
            });
            
            element.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
    }
    
    // PWA Install Prompt (if applicable)
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // You could show an install button here if desired
        // For now, we'll just log it
        console.log('PWA install prompt available');
    });
    
    // Handle PWA installation
    const installPWA = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA installed');
                }
                deferredPrompt = null;
            });
        }
    };
    
    // Analytics/Tracking (placeholder)
    const trackEvent = (action, category = 'User Interaction') => {
        console.log(`Event: ${category} - ${action}`);
        // Add your analytics here (Google Analytics, etc.)
    };
    
    // Track button clicks
    saveContactBtn?.addEventListener('click', () => trackEvent('Save Contact', 'Contact Actions'));
    connectBtn?.addEventListener('click', () => trackEvent('Connect WhatsApp', 'Contact Actions'));
    
    // Track social clicks
    socialLinksElements.forEach((link, index) => {
        const platforms = ['facebook', 'linkedin', 'youtube', 'instagram'];
        link.addEventListener('click', () => trackEvent(`Social: ${platforms[index]}`, 'Social Media'));
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        });
    }
    
    // Service Worker registration for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    }
});

// Utility functions
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '($1) $2-$3');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Copied to clipboard!');
    }
}

// Add long press functionality for contact info
let pressTimer;
const contactRows = document.querySelectorAll('.contact-row');

contactRows.forEach(row => {
    // Mouse events for desktop
    row.addEventListener('mousedown', startPress);
    row.addEventListener('mouseup', cancelPress);
    row.addEventListener('mouseleave', cancelPress);
    
    // Touch events for mobile
    row.addEventListener('touchstart', startPress);
    row.addEventListener('touchend', cancelPress);
    row.addEventListener('touchcancel', cancelPress);
});

function startPress(e) {
    const contactValue = this.querySelector('.contact-value').textContent;
    
    pressTimer = setTimeout(() => {
        copyToClipboard(contactValue);
    }, 500);
}

function cancelPress() {
    clearTimeout(pressTimer);
}

// Export functions for potential external use
window.DigitalCard = {
    downloadVCard,
    connectWhatsApp,
    showToast,
    copyToClipboard,
    contactInfo
};
