# Component Documentation # Adding a manual comment to run a git commit 18 October 2025

## Table of Contents
1. [Navigation](#navigation)
2. [Hero Section](#hero-section)
3. [Cards](#cards)
4. [Forms](#forms)
5. [Language Switcher](#language-switcher)

## Navigation

### Usage
```html
{% include nav.html activeItem='home' showLanguageSwitcher='true' %}
```

### Properties
- `activeItem`: Current page identifier
- `showLanguageSwitcher`: Boolean to toggle language switcher visibility

### Accessibility Features
- Proper `aria-current` for active items
- Mobile menu toggle with proper ARIA attributes
- Skip link for keyboard navigation
- Responsive design with proper contrast

## Hero Section

### Usage
```html
{% include hero.html title='Main Title' subtitle='Optional subtitle' background='/path/to/image.jpg' ctaText='Learn More' ctaUrl='/learn-more' %}
```

### Properties
- `title`: Main heading (required)
- `subtitle`: Secondary text (optional)
- `background`: Background image path
- `ctaText`: Call-to-action button text
- `ctaUrl`: Call-to-action URL

### Accessibility Features
- Semantic heading structure
- Image alt text for background images
- ARIA landmarks for main content
- Reduced motion support

## Cards

### Usage
```html
{% include card.html title='Card Title' content='Card content here' image='/path/to/image.jpg' imageAlt='Description of image' link='/card-link' %}
```

### Properties
- `title`: Card heading
- `content`: Main content
- `image`: Optional image path
- `imageAlt`: Image alt text
- `link`: Card link URL

### Accessibility Features
- Proper heading hierarchy
- Image alt text
- Interactive elements properly labeled
- Focus states for links

## Forms

### Usage
```html
{% include contact-form.html submitUrl='/api/contact' successMessage='Message sent!' errorMessage='Please try again' %}
```

### Properties
- `submitUrl`: Form submission endpoint
- `successMessage`: Success feedback text
- `errorMessage`: Error feedback text

### Security Features
- CSRF Protection
- Input validation
- XSS prevention
- Rate limiting support

### Accessibility Features
- Proper form labels
- Error message announcements
- Required field indicators
- Focus management

## Language Switcher

### Usage
```html
{% include language-switcher.html currentLang='is' languages='[{"code":"is","name":"Íslenska","url":"/is/page"},{"code":"en","name":"English","url":"/en/page"}]' %}
```

### Properties
- `currentLang`: Current language code
- `languages`: Array of available languages

### Accessibility Features
- Language attributes on links
- Proper ARIA labels
- Clear visual indicators
- Keyboard navigation support

## General Accessibility Features

### Keyboard Navigation
- All interactive elements are focusable
- Logical tab order
- Skip links for main content
- Focus visible indicators

### Screen Readers
- ARIA landmarks
- Descriptive labels
- Status announcements
- Alternative text for images

### Color and Contrast
- WCAG 2.1 AA compliance
- High contrast mode support
- Focus indicators
- Text over images contrast

### Responsive Design
- Mobile-first approach
- Flexible layouts
- Touch targets sizing
- Viewport meta tag

## Implementation Notes

### CSRF Protection
All forms include automatic CSRF protection:
```javascript
// Automatically included in all forms
const csrf = new CSRFProtection();
csrf.initializeForms();
```

### Multilingual Support
Language switching handled through:
```javascript
// URL pattern for language versions
const langPattern = '/:lang/:path*';
```

### Component Dependencies
- Bootstrap 5.3.x
- Custom CSS modules
- Vanilla JavaScript