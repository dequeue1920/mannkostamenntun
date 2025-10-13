/**
 * Generates a responsive picture element with AVIF, WebP, and fallback formats
 * @param {Object} options Configuration object for the image
 * @param {string} options.src Original image source path
 * @param {string} options.alt Alt text for accessibility
 * @param {string[]} options.sizes Array of size descriptors (e.g., "(max-width: 768px) 100vw, 960px")
 * @param {Object} options.widths Object containing width breakpoints
 * @param {string} options.className Optional CSS class name for the img element
 * @param {boolean} options.lazy Whether to use lazy loading (default: true)
 * @returns {string} HTML string containing the picture element
 */
export function createResponsiveImage({
    src,
    alt,
    sizes = "(max-width: 960px) 100vw, 960px",
    widths = [320, 640, 960, 1200, 1800, 2400],
    className = "",
    lazy = true
}) {
    // Extract base filename and extension
    const [basePath, ext] = src.split('.');
    
    // Generate srcset for each format and width
    const generateSrcSet = (format) => {
        return widths
            .map(width => `${basePath}-${width}.${format} ${width}w`)
            .join(', ');
    };

    // Build the picture element
    return `
<picture>
    <source
        type="image/avif"
        srcset="${generateSrcSet('avif')}"
        sizes="${sizes}">
    <source
        type="image/webp"
        srcset="${generateSrcSet('webp')}"
        sizes="${sizes}">
    <img
        src="${src}"
        srcset="${generateSrcSet(ext)}"
        sizes="${sizes}"
        alt="${alt}"
        class="${className}"
        loading="${lazy ? 'lazy' : 'eager'}"
        decoding="async">
</picture>`;
}

/**
 * Helper function to initialize responsive images across the page
 * Looks for data-responsive-image attributes and replaces img elements with picture elements
 */
export function initResponsiveImages() {
    document.querySelectorAll('img[data-responsive-image]').forEach(img => {
        const config = {
            src: img.src,
            alt: img.alt || '',
            sizes: img.dataset.sizes || "(max-width: 960px) 100vw, 960px",
            className: img.className,
            lazy: img.dataset.lazy !== 'false'
        };

        // Create new picture element
        const pictureHTML = createResponsiveImage(config);
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = pictureHTML.trim();
        
        // Replace the original img with the new picture element
        img.parentNode.replaceChild(tempContainer.firstChild, img);
    });
}

// Initialize responsive images when the DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initResponsiveImages);
    } else {
        initResponsiveImages();
    }
}