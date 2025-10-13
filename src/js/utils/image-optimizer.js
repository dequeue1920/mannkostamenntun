/**
 * Image optimization configuration and utilities
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

class ImageOptimizer {
    constructor() {
        this.config = {
            jpeg: {
                quality: 80,
                progressive: true,
                mozjpeg: true
            },
            webp: {
                quality: 80,
                lossless: false,
                nearLossless: true
            },
            avif: {
                quality: 65,
                speed: 5
            },
            png: {
                quality: 80,
                compressionLevel: 9,
                palette: true
            },
            responsive: {
                sizes: [640, 768, 1024, 1366, 1920],
                breakpoints: {
                    sm: 640,
                    md: 768,
                    lg: 1024,
                    xl: 1366,
                    xxl: 1920
                }
            }
        };
    }

    /**
     * Process an image for optimization
     * @param {string} inputPath - Path to input image
     * @param {string} outputDir - Output directory
     * @param {Object} options - Processing options
     */
    async processImage(inputPath, outputDir, options = {}) {
        const filename = path.basename(inputPath, path.extname(inputPath));
        const image = sharp(inputPath);

        // Generate responsive versions
        await this.generateResponsiveImages(image, filename, outputDir);

        // Generate different formats
        await Promise.all([
            this.generateWebP(image, filename, outputDir),
            this.generateAVIF(image, filename, outputDir)
        ]);
    }

    /**
     * Generate responsive image versions
     */
    async generateResponsiveImages(image, filename, outputDir) {
        const metadata = await image.metadata();
        const sizes = this.config.responsive.sizes.filter(size => size <= metadata.width);

        await Promise.all(sizes.map(size => {
            return image
                .resize(size, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .jpeg(this.config.jpeg)
                .toFile(path.join(outputDir, `${filename}-${size}.jpg`));
        }));
    }

    /**
     * Generate WebP version
     */
    async generateWebP(image, filename, outputDir) {
        const metadata = await image.metadata();
        const sizes = this.config.responsive.sizes.filter(size => size <= metadata.width);

        await Promise.all(sizes.map(size => {
            return image
                .resize(size, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp(this.config.webp)
                .toFile(path.join(outputDir, `${filename}-${size}.webp`));
        }));
    }

    /**
     * Generate AVIF version
     */
    async generateAVIF(image, filename, outputDir) {
        const metadata = await image.metadata();
        const sizes = this.config.responsive.sizes.filter(size => size <= metadata.width);

        await Promise.all(sizes.map(size => {
            return image
                .resize(size, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .avif(this.config.avif)
                .toFile(path.join(outputDir, `${filename}-${size}.avif`));
        }));
    }

    /**
     * Generate picture element markup
     */
    generatePictureMarkup(filename, alt, sizes = '100vw') {
        const breakpoints = this.config.responsive.breakpoints;
        
        return `
<picture>
    <!-- AVIF Support -->
    <source
        type="image/avif"
        srcset="${Object.entries(breakpoints)
            .map(([size, width]) => `${filename}-${width}.avif ${width}w`)
            .join(', ')}"
        sizes="${sizes}">
            
    <!-- WebP Support -->
    <source
        type="image/webp"
        srcset="${Object.entries(breakpoints)
            .map(([size, width]) => `${filename}-${width}.webp ${width}w`)
            .join(', ')}"
        sizes="${sizes}">
            
    <!-- JPEG Fallback -->
    <img
        srcset="${Object.entries(breakpoints)
            .map(([size, width]) => `${filename}-${width}.jpg ${width}w`)
            .join(', ')}"
        src="${filename}-${breakpoints.lg}.jpg"
        alt="${alt}"
        loading="lazy"
        decoding="async"
        sizes="${sizes}">
</picture>`;
    }
}

// Export the optimizer
module.exports = new ImageOptimizer();