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
            .bindPopup('<b>Vinárstvo BOČKO</b><br>Družstevná 49, Šenkvice<br><a href="https://www.google.com/maps/search/?api=1&query=48.29820,17.3496664" target="_blank" rel="noopener noreferrer">Navigovať na Google Maps</a>')
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
});
