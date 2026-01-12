// Alpine.js Main Component
function vinarstvoApp() {
    return {
        // Mobile menu state
        mobileMenuOpen: false,

        // Form state
        formToken: '',
        formSubmitting: false,
        formSuccess: false,
        formError: false,

        // Seasonal background
        seasonalBackground: {
            src: '',
            alt: ''
        },

        // Initialize
        init() {
            // Set seasonal background
            this.setSeasonalBackground();

            // Initialize Leaflet map
            this.initMap();

            // Generate form token
            this.generateFormToken();
        },

        // Set seasonal background based on current month
        setSeasonalBackground() {
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

            const seasonNames = {
                'spring': 'Jar',
                'summer': 'Leto',
                'autumn': 'Jeseň',
                'winter': 'Zima'
            };

            this.seasonalBackground = {
                src: `assets/images/hero-bg-${season}.png`,
                alt: `Vinice pod Malými Karpatmi - ${seasonNames[season]}`
            };
        },

        // Initialize Leaflet map
        initMap() {
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
        },

        // Generate form token from n8n webhook
        async generateFormToken() {
            try {
                const response = await fetch('https://n8n.bocko.sk/webhook/generate-token');
                const data = await response.json();

                if (data.success && data.token) {
                    this.formToken = data.token;
                    console.log('Form token generated successfully');
                } else {
                    console.error('Token generation failed:', data);
                }
            } catch (error) {
                console.error('Error generating token:', error);
            }
        },

        // Submit contact form
        async submitForm(event) {
            // Reset messages
            this.formSuccess = false;
            this.formError = false;
            this.formSubmitting = true;

            const form = event.target;
            const formData = new FormData(form);

            try {
                const response = await fetch('https://n8n.bocko.sk/webhook/submit-form', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    // Show success message
                    this.formSuccess = true;

                    // Reset form
                    form.reset();

                    // Generate new token
                    await this.generateFormToken();

                    // Scroll to success message
                    this.$nextTick(() => {
                        document.querySelector('.form-success')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    });
                } else {
                    // Show error message
                    this.formError = true;
                    this.$nextTick(() => {
                        document.querySelector('.form-error')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    });
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                this.formError = true;
                this.$nextTick(() => {
                    document.querySelector('.form-error')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                });
            } finally {
                this.formSubmitting = false;
            }
        }
    };
}
