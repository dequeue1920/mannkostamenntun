// Handle progressive image loading
document.addEventListener('DOMContentLoaded', function() {
    // Load all images that have loading="lazy"
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
            handleImageLoad(img);
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    handleImageLoad(img);
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }

    function handleImageLoad(img) {
        const parent = img.closest('.img-loading');
        if (parent) {
            img.addEventListener('load', () => {
                parent.classList.add('img-loaded');
            });
        }
    }

    // Handle picture element loading
    const pictures = document.querySelectorAll('picture.img-loading');
    pictures.forEach(picture => {
        const img = picture.querySelector('img:not(.img-placeholder)');
        if (img) {
            handleImageLoad(img);
        }
    });

    // Add support for WebP format detection
    const webpSupport = new Promise(resolve => {
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
        webP.onload = webP.onerror = () => {
            resolve(webP.height === 1);
        };
    }).then(hasSupport => {
        if (!hasSupport) {
            document.documentElement.classList.add('no-webp');
        }
    });
});