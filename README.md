# Efling Dygda Website

A modern, responsive website for character education through poetry. Currently undergoing modernization from Bootstrap 3 to Bootstrap 5 and modern JavaScript.

## 🚥 Project Status (October 13, 2025)

### Completed
- ✅ Initial project setup
- ✅ Development environment configuration
- ✅ Documentation structure
- ✅ Migration planning

### In Progress
- 🔄 CSRF Protection implementation
- 🔄 Bootstrap 3 to 5 migration
- 🔄 jQuery removal and modern JavaScript implementation
- 🔄 Webpack configuration

### Pending
- ⏳ Security headers implementation
- ⏳ Accessibility improvements (ARIA labels, semantic HTML)
- ⏳ Performance optimization
- ⏳ Image optimization pipeline
- ⏳ Form validation modernization

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/dequeue1920/mannkostamenntun.git
cd mannkostamenntun
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## 🛠️ Technology Stack

### Current
- **Frontend Framework**: Bootstrap 3.3.1 (Migration to 5.x in progress)
- **JavaScript**: jQuery with custom plugins (Migration to ES6+ in progress)
- **Image Handling**: Basic responsive images

### Target Stack (In Progress)
- **Frontend Framework**: Bootstrap 5.3
- **JavaScript**: Modern ES6+, no jQuery
- **Build Tools**: Webpack, Babel
- **Image Optimization**: image-webpack-loader
- **Form Validation**: Custom FormValidator class
- **Animations**: CSS3 + Intersection Observer
- **Galleries**: PhotoSwipe
- **Sliders**: Swiper.js

### Migration Progress
- 🔄 Bootstrap: ~20% migrated
- 🔄 jQuery Removal: ~15% completed
- 🔄 Build System: ~40% configured
- 🔄 Security Features: ~10% implemented

## 📁 Project Structure

```
├── src/
│   ├── js/
│   │   ├── main.js           # Main JavaScript entry
│   │   ├── formValidation.js # Form handling
│   │   └── components/       # UI components
│   ├── css/
│   │   ├── main.scss        # Main stylesheet
│   │   └── components/      # Component styles
│   └── assets/
│       ├── images/          # Optimized images
│       └── fonts/          # Web fonts
├── public/
│   ├── index.html
│   └── ...
├── webpack.config.js        # Webpack configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🔒 Security Features

### Planned Improvements
- 🔄 CSRF Protection (In Progress)
- ⏳ Content Security Policy
- ⏳ XSS Prevention
- ⏳ Input Sanitization
- ⏳ Secure Headers

### Current Security Status
- Basic form validation
- Client-side sanitization
- Standard HTTP security

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Chrome for Android (latest)

## 🛡️ Security Headers

```apache
# Security Headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Content-Security-Policy "default-src 'self'"
Header set Strict-Transport-Security "max-age=31536000"
Header set Referrer-Policy "strict-origin-when-cross-origin"
```

## 📝 Development Guidelines

### Current Migration Tasks
1. **Bootstrap Migration**
   - Update class names to Bootstrap 5
   - Replace deprecated components
   - Update grid system usage

2. **JavaScript Modernization**
   - Convert jQuery to vanilla JS
   - Implement ES6+ modules
   - Add TypeScript definitions (planned)

### Development Standards
1. **JavaScript**
   - Use ES6+ features
   - Follow ESLint configuration
   - Document with JSDoc comments

2. **CSS**
   - Follow BEM methodology
   - Use CSS custom properties
   - Mobile-first approach

3. **Images**
   - Optimize all images
   - Use WebP format with fallbacks
   - Implement lazy loading

4. **Accessibility**
   - Maintain WCAG 2.1 compliance
   - Test with screen readers
   - Use semantic HTML

## 🔄 Build Process

### Current Setup (Legacy)
- Manual file management
- Direct script/style inclusion
- No build optimization

### New Build Process (In Progress)
1. **Development**
   ```bash
   npm start
   ```
   - Starts webpack-dev-server (coming soon)
   - Hot module replacement (planned)
   - Source maps enabled (planned)

2. **Production Build**
   ```bash
   npm run build
   ```
   - Minifies JavaScript
   - Optimizes CSS
   - Compresses images
   - Generates source maps

3. **Code Quality**
   ```bash
   npm run lint    # Run ESLint
   npm run format  # Run Prettier
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Kristian Guttesen (Project Lead)

## 📞 Support

For support, email support@eflingdygda.is or create an issue in the repository.