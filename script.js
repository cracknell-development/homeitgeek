// Navigation functionality
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update URL hash
    window.location.hash = pageId;
    
    // Close mobile menu
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
});

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
    
    // Initialize captcha
    generateCaptcha();
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!nav.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// Captcha functionality
let captchaAnswer = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    
    const captchaQuestion = document.getElementById('captchaQuestion');
    if (captchaQuestion) {
        captchaQuestion.textContent = `${num1} + ${num2} = ?`;
    }
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const captchaInput = parseInt(formData.get('captcha'));
    
    // Validate captcha
    if (captchaInput !== captchaAnswer) {
        alert('Please solve the math problem correctly');
        return;
    }
    
    // Prepare form data for submission
    const submitData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('serviceType'),
        urgency: formData.get('urgency'),
        description: formData.get('description'),
        contact: formData.get('preferredContact'),
        subject: `New IT Support Enquiry from ${formData.get('name')}`
    };
    
    try {
        // Submit to Formspree
        const response = await fetch('https://formspree.io/f/mnnlqaay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitData)
        });
        
        if (response.ok) {
            showThankYou();
        } else {
            alert('Error submitting enquiry. Please try again.');
        }
    } catch (error) {
        alert('Error submitting enquiry. Please try again.');
    }
});

function showThankYou() {
    // Generate reference ID
    const referenceId = Math.random().toString(36).substr(2, 9).toUpperCase();
    document.getElementById('referenceId').textContent = '#' + referenceId;
    
    // Hide form and show thank you message
    document.getElementById('enquiry-form').style.display = 'none';
    document.getElementById('thank-you').style.display = 'block';
}

function resetForm() {
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Generate new captcha
    generateCaptcha();
    
    // Show form and hide thank you message
    document.getElementById('enquiry-form').style.display = 'block';
    document.getElementById('thank-you').style.display = 'none';
}