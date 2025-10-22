const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

const sizes = [320, 640, 960, 1200, 1800, 2400];
const formats = ['webp', 'avif'];
const quality = {
    webp: 80,
    avif: 65,
    jpeg: 75,
    png: 80
};

async function processImage(inputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    const baseName = path.basename(inputPath, ext);
    const dir = path.dirname(inputPath);
    const outputDir = path.join('dist', dir);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate sizes for each format
    for (const format of [...formats, ext.slice(1)]) {
        for (const size of sizes) {
            const outputPath = path.join(outputDir, `${baseName}-${size}.${format}`);
            
            let pipeline = sharp(inputPath)
                .resize(size, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                });

            // Format-specific options
            switch (format) {
                case 'webp':
                    pipeline = pipeline.webp({ quality: quality.webp });
                    break;
                case 'avif':
                    pipeline = pipeline.avif({ quality: quality.avif });
                    break;
                case 'jpg':
                case 'jpeg':
                    pipeline = pipeline.jpeg({ quality: quality.jpeg, progressive: true });
                    break;
                case 'png':
                    pipeline = pipeline.png({ quality: quality.png });
                    break;
            }

            try {
                await pipeline.toFile(outputPath);
                console.log(`Generated: ${outputPath}`);
            } catch (err) {
                console.error(`Error processing ${inputPath}:`, err);
            }
        }

        // Generate placeholder
        const placeholderPath = path.join(outputDir, `${baseName}-placeholder.${format}`);
        try {
            await sharp(inputPath)
                .resize(20, null, { withoutEnlargement: true })
                .blur(10)
                .toFile(placeholderPath);
            console.log(`Generated placeholder: ${placeholderPath}`);
        } catch (err) {
            console.error(`Error generating placeholder for ${inputPath}:`, err);
        }
    }
}

// Find all images in the img directory
const images = glob.sync('img/**/*.{jpg,jpeg,png,webp,gif}');

// Process each image
Promise.all(images.map(img => processImage(img)))
    .then(() => console.log('Image processing complete'))
    .catch(err => console.error('Error processing images:', err));