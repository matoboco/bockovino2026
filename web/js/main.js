// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Leaflet Map Initialization
    // Coordinates for Šenkvice (approximate center or specific address)
    // Družstevná 49, 900 81 Šenkvice -> Approx: 48.301, 17.352 48.2982052,17.3496664
    const wineryLat = 48.29820;
    const wineryLng = 17.3496664;

    if (document.getElementById('map')) {
        const map = L.map('map').setView([wineryLat, wineryLng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([wineryLat, wineryLng]).addTo(map)
            .bindPopup('<b>Vinárstvo BOČKO</b><br>Družstevná 49, Šenkvice<br><a href="https://www.google.com/maps/search/?api=1&query=48.29820,17.3496664" target="_blank" rel="noopener noreferrer">Navigovať</a>')
            .openPopup();
    }

    // Seasonal Hero Background
    const heroImage = document.querySelector('.hero-bg img');
    if (heroImage) {
        const month = new Date().getMonth(); // 0-11
        let season = '';

        // Spring: March (2), April (3), May (4)
        if (month >= 2 && month <= 4) {
            season = 'spring';
        }
        // Summer: June (5), July (6), August (7)
        else if (month >= 5 && month <= 7) {
            season = 'summer';
        }
        // Autumn: September (8), October (9), November (10)
        else if (month >= 8 && month <= 10) {
            season = 'autumn';
        }
        // Winter: December (11), January (0), February (1)
        else {
            season = 'winter';
        }

        // Set the image source based on season
        // Note: hero-bg-autumn.png and hero-bg-winter.png are currently placeholders (copies of hero-bg.png)
        heroImage.src = `assets/images/hero-bg-${season}.png`;

        // Update alt text for better accessibility
        const seasonNames = {
            'spring': 'Jar',
            'summer': 'Leto',
            'autumn': 'Jeseň',
            'winter': 'Zima'
        };
        heroImage.alt = `Vinice pod Malými Karpatmi - ${seasonNames[season]}`;
    }

    // Wine Detail Logic (Expandable Cards)
    const wineCards = document.querySelectorAll('.wine-card');

    if (wineCards.length > 0) {
        wineCards.forEach(card => {
            card.addEventListener('click', function () {
                // Toggle active class on the clicked card
                this.classList.toggle('active');
            });
        });
    }

    // ========================================
    // Contact Form with n8n Integration
    // ========================================

    // Generate token on page load
    async function generateFormToken() {
        try {
            const response = await fetch('https://n8n.bocko.sk/webhook/generate-token');
            const data = await response.json();

            if (data.success && data.token) {
                // Store token in hidden field
                const tokenField = document.getElementById('form-token');
                if (tokenField) {
                    tokenField.value = data.token;
                    console.log('Form token generated successfully');
                }
            } else {
                console.error('Token generation failed:', data);
            }
        } catch (error) {
            console.error('Error generating token:', error);
        }
    }

    // Call token generation on page load
    generateFormToken();

    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form elements
            const submitButton = document.getElementById('submit-button');
            const successMessage = document.getElementById('form-success-message');
            const errorMessage = document.getElementById('form-error-message');

            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Odosielam...';

            // Hide previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';

            // Get form data
            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://n8n.bocko.sk/webhook/submit-form', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    // Show success message
                    successMessage.style.display = 'block';

                    // Reset form
                    contactForm.reset();

                    // Generate new token for next submission
                    generateFormToken();

                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    // Show error message
                    errorMessage.style.display = 'block';
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                // Show error message
                errorMessage.style.display = 'block';
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Odoslať správu';
            }
        });
    }
});
