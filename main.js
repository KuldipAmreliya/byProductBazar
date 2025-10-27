// Form handling
function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // For demonstration, log the data
    console.log('Form submitted:', data);

    // You would typically send this to a server
    alert('Form submitted successfully!');
}

// Search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const listings = document.querySelectorAll('.material-card');
    
    listings.forEach(listing => {
        const title = listing.querySelector('h3').textContent.toLowerCase();
        const description = listing.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}

// Filter functionality
function handleFilter(event) {
    const category = event.target.value;
    const listings = document.querySelectorAll('.material-card');
    
    listings.forEach(listing => {
        const listingCategory = listing.dataset.category;
        if (category === 'All Categories' || category === listingCategory) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}

// Add these functions to the existing main.js file

function handleRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate passwords match
    if (data.password !== data.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // For demonstration, log the data
    console.log('Registration submitted:', data);
    alert('Registration successful! Please check your email to verify your account.');
}

function handlePasswordReset(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // For demonstration, log the data
    console.log('Password reset requested for:', data.email);
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.remove('hidden');
    }
}

// Background Slider functionality
function initBackgroundSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.style.opacity = '0');
        slides[index].style.opacity = '1';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Show first slide
    showSlide(0);

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initBackgroundSlider);

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Form initialization
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });

    // Search initialization
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Filter initialization
    const filterSelect = document.querySelector('select');
    if (filterSelect) {
        filterSelect.addEventListener('change', handleFilter);
    }

    // Add animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        });
        observer.observe(element);
    });

    // Registration form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }

    // Password reset form
    const passwordResetForm = document.getElementById('passwordResetForm');
    if (passwordResetForm) {
        passwordResetForm.addEventListener('submit', handlePasswordReset);
    }

    // Navigation functionality
    const nav = document.getElementById('mainNav');
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let lastScroll = 0;

    // Add animation delay to nav links
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
    });

    // Handle scroll events for navbar
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('nav-scrolled');
            nav.classList.remove('nav-hidden');
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('nav-hidden')) {
            // Scroll down - hide navbar
            nav.classList.add('nav-hidden');
            nav.classList.add('nav-scrolled');
            // Close mobile menu when scrolling
            mobileMenu.classList.add('hidden');
            menuBtn.classList.remove('active');
        }
        
        if (currentScroll < lastScroll && nav.classList.contains('nav-hidden')) {
            // Scroll up - show navbar
            nav.classList.remove('nav-hidden');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle with animations
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuBtn.classList.toggle('active');
        
        // Toggle menu icon
        const menuOpen = menuBtn.querySelector('.menu-open');
        const menuClose = menuBtn.querySelector('.menu-close');
        menuOpen.classList.toggle('hidden');
        menuClose.classList.toggle('hidden');

        // Animate menu items
        if (!mobileMenu.classList.contains('hidden')) {
            const menuItems = mobileMenu.querySelectorAll('a');
            menuItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });

    // Add hover animation for logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', () => {
            logo.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseout', () => {
            logo.style.transform = 'scale(1)';
        });
    }
}); 

document.addEventListener('DOMContentLoaded', function () {
  const docForm = document.getElementById('document-upload-form');
  if (!docForm) return;

  docForm.addEventListener('submit', function (e) {
    let valid = true;
    const fileInputs = docForm.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      const errorSpan = input.nextElementSibling;
      errorSpan.classList.add('hidden');
      errorSpan.textContent = '';
      if (!input.files.length) {
        errorSpan.textContent = 'This field is required.';
        errorSpan.classList.remove('hidden');
        valid = false;
      } else {
        const file = input.files[0];
        const ext = file.name.split('.').pop().toLowerCase();
        let allowed = ['pdf'];
        if (input.name === 'panCard') allowed.push('cpg');
        if (!allowed.includes(ext)) {
          errorSpan.textContent = `Only ${allowed.map(a => a.toUpperCase()).join(' or ')} files are accepted.`;
          errorSpan.classList.remove('hidden');
          valid = false;
        }
      }
    });
    if (!valid) {
      e.preventDefault();
    } else {
      alert('Documents uploaded successfully!');
    }
  });

  // Scroll-triggered animation for all <section> elements
  const animationClasses = [
    'fade-in-up',
    'fade-in-left',
    'fade-in-right',
    'fade-in-scale',
    'bounce-in'
  ];
  const sections = document.querySelectorAll('section');
  sections.forEach((section, idx) => {
    const anim = animationClasses[idx % animationClasses.length];
    section.classList.add(anim);
    if (anim !== 'bounce-in') {
      section.classList.remove('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    }
  });

  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add 'active' class for new animations, or trigger bounce-in
        if (entry.target.classList.contains('bounce-in')) {
          entry.target.style.opacity = 1;
          entry.target.style.animationPlayState = 'running';
        } else {
          entry.target.classList.add('active');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => {
    observer.observe(section);
  });
}); 