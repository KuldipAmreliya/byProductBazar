// Add this at the top of the file
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Sample data for chemical waste listings
const sampleListings = [
    {
        id: 1,
        title: "Used Sulfuric Acid",
        description: "98% concentration, 1000L available",
        price: "$500",
        location: "Chicago, IL",
        company: "ChemCorp Industries",
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 2,
        title: "Excess Sodium Hydroxide",
        description: "50% solution, 500kg available",
        price: "$300",
        location: "Houston, TX",
        company: "TexChem Solutions",
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 3,
        title: "Waste Acetone",
        description: "Technical grade, 2000L available",
        price: "$800",
        location: "Los Angeles, CA",
        company: "West Coast Processing",
        image: "https://via.placeholder.com/300x200"
    }
];

// Function to create listing cards
function createListingCard(listing, index) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden opacity-0 animate-slide-up hover-lift hover-glow" 
             style="animation-delay: ${index * 0.2}s">
            <img src="${listing.image}" alt="${listing.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-bold text-lg mb-2">${listing.title}</h3>
                <p class="text-gray-600 mb-2">${listing.description}</p>
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-green-600">${listing.price}</span>
                    <span class="text-gray-500">${listing.location}</span>
                </div>
                <p class="text-sm text-gray-500 mb-4">${listing.company}</p>
                <button class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
                    Contact Seller
                </button>
            </div>
        </div>
    `;
}

// Function to display listings
function displayListings() {
    const listingsContainer = document.getElementById('listings');
    listingsContainer.innerHTML = sampleListings
        .map((listing, index) => createListingCard(listing, index))
        .join('');
}

// Add animation for navigation items
function animateNavItems() {
    const navItems = document.querySelectorAll('nav a');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animation = `slideIn 0.5s ease-out ${index * 0.1}s forwards`;
    });
}

// Mobile Menu Handler
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = menuBtn?.querySelector('.hamburger');
    const body = document.body;

    if (!menuBtn || !mobileMenu || !hamburger) return;

    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
        hamburger.classList.toggle('active');
        body.classList.toggle('overflow-hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('active');
            body.classList.remove('overflow-hidden');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('active');
            body.classList.remove('overflow-hidden');
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayListings();
    animateOnScroll();
    animateNavItems();

    // Add smooth scroll behavior for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add click animation for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Mobile menu functionality
    initMobileMenu();

    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function setActiveLink(links) {
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveLink(navLinks);
    setActiveLink(mobileNavLinks);
});