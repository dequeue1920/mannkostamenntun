# Dev Day Migration Notes - October 13, 2025

## Security Audit Results

### Forms Found
- Main contact form (`contact.html`)
- Form component template (`_includes/components/form.html`)

### CSRF Implementation Plan
1. Add CSRF token middleware
2. Update form submissions to include CSRF token
3. Add form validation sanitization

### Security Headers to Add
```apache
# Add to .htaccess or server config
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header set Referrer-Policy "strict-origin-when-cross-origin"
Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
```

## Bootstrap Migration Notes

### Classes to Update
- `col-md-6` → `col-md-6` (unchanged)
- `panel` → `card`
- `panel-heading` → `card-header`
- `panel-body` → `card-body`
- `btn-default` → `btn-secondary`
- `navbar-toggle` → `navbar-toggler`
- `icon-bar` → `navbar-toggler-icon`

### jQuery Refactoring Notes

Current jQuery Dependencies:
1. Animations/Hover effects
2. Accordion functionality
3. FancyBox lightbox
4. ScrollToTop functionality
5. FlexSlider for carousels

Modern Replacements:
1. CSS Animations with @keyframes
2. Bootstrap 5 Collapse component
3. PhotoSwipe or GLightbox
4. CSS Scroll Behavior + Intersection Observer
5. Swiper.js or Splide.js

## Accessibility Improvements

1. ARIA Labels to Add:
   - Navigation landmarks
   - Form controls
   - Modal dialogs
   - Image descriptions

2. Semantic HTML Updates:
   - Replace div-based navigation with `<nav>`
   - Use `<main>`, `<article>`, `<section>` appropriately
   - Add `<header>` and `<footer>` landmarks

## Performance Optimization

### Webpack Configuration
```javascript
// webpack.config.js
module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|webp)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { quality: 65 },
              webp: { quality: 80 },
              gifsicle: { optimizationLevel: 3 },
              pngquant: { quality: [0.65, 0.90] }
            }
          }
        ]
      }
    ]
  }
}
```

## Progress Tracking

- [ ] Implement CSRF Protection
- [ ] Add Security Headers
- [ ] Update Bootstrap Classes
- [ ] Replace jQuery Dependencies
- [ ] Add ARIA Labels
- [ ] Configure Webpack
- [ ] Update Documentation