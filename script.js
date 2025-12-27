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

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('8')) {
            value = '7' + value.slice(1);
        }
        if (value.startsWith('7')) {
            let formatted = '+7 (';
            if (value.length > 1) {
                formatted += value.slice(1, 4);
            }
            if (value.length >= 4) {
                formatted += ') ';
            }
            if (value.length > 4) {
                formatted += value.slice(4, 7);
            }
            if (value.length >= 7) {
                formatted += '-';
            }
            if (value.length > 7) {
                formatted += value.slice(7, 9);
            }
            if (value.length >= 9) {
                formatted += '-';
            }
            if (value.length > 9) {
                formatted += value.slice(9, 11);
            }
            e.target.value = formatted;
        } else if (value.length > 0) {
            e.target.value = '+' + value;
        }
    });
}

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Collect form data
    const orderData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        type: formData.get('type'),
        flavors: Array.from(form.querySelectorAll('input[name="flavor"]:checked')).map(cb => cb.value),
        address: formData.get('address'),
        message: formData.get('message')
    };
    
    // Here you would typically send the data to a server
    // For now, we'll just log it and show a success message
    console.log('Order submitted:', orderData);
    
    // Show success message
    form.style.display = 'none';
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
    
    // In a real application, you would send this data to your backend:
    // fetch('/api/orders', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(orderData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Handle success
    // })
    // .catch(error => {
    //     // Handle error
    // });
}

// Add animation on scroll
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

// Observe all cards and sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.benefit-card, .audience-card, .product-card, .pricing-card, .step');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

