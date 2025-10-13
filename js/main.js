// Import responsive image utility
import { initResponsiveImages } from './utils/responsiveImage';

// Export for global use
window.initResponsiveImages = initResponsiveImages;

// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    // Initialize responsive images
    initResponsiveImages();
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');

        // Update controls
        document.querySelectorAll('[data-slide]').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`[data-slide="${index + 1}"]`)?.classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto advance slides
    if (slides.length > 1) {
        setInterval(nextSlide, 5000);
    }

    // Click handlers for slide controls
    document.querySelectorAll('[data-slide]').forEach(button => {
        button.addEventListener('click', () => {
            const slideIndex = parseInt(button.dataset.slide) - 1;
            currentSlide = slideIndex;
            showSlide(currentSlide);
        });
    });
});

// Navbar scroll behavior
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.remove('d-none');
            } else {
                backToTop.classList.add('d-none');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    // Initialize all popovers
    const popovers = document.querySelectorAll('[data-bs-toggle="popover"]');
    popovers.forEach(popover => {
        new bootstrap.Popover(popover);
    });
});