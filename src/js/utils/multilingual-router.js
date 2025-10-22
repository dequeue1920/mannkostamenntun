/**
 * Multilingual Routing Configuration
 * Handles language-specific routing and content delivery
 */

class MultilingualRouter {
    constructor() {
        this.defaultLanguage = 'is';
        this.supportedLanguages = ['is', 'en'];
        this.routes = new Map();
        this.init();
    }

    /**
     * Initialize the router
     */
    init() {
        // Set up language detection
        this.detectLanguage();
        
        // Set up route handlers
        this.setupRoutes();
        
        // Handle language switches
        this.handleLanguageSwitching();
        
        // Update meta tags
        this.updateMetaTags();
    }

    /**
     * Detect user's preferred language
     * @returns {string} Detected language code
     */
    detectLanguage() {
        // Check URL path first
        const pathLang = window.location.pathname.split('/')[1];
        if (this.supportedLanguages.includes(pathLang)) {
            return pathLang;
        }

        // Check localStorage for saved preference
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            return savedLang;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLang)) {
            return browserLang;
        }

        return this.defaultLanguage;
    }

    /**
     * Set up route mapping for different languages
     */
    setupRoutes() {
        // Map routes for each supported language
        this.supportedLanguages.forEach(lang => {
            this.routes.set(lang, {
                home: lang === this.defaultLanguage ? '/' : `/${lang}`,
                about: `/${lang}/about`,
                courses: `/${lang}/courses`,
                contact: `/${lang}/contact`,
                portfolio: `/${lang}/portfolio`,
                pricing: `/${lang}/pricing`
            });
        });
    }

    /**
     * Handle language switching
     */
    handleLanguageSwitching() {
        document.addEventListener('DOMContentLoaded', () => {
            const switcher = document.querySelector('.language-switcher');
            if (!switcher) return;

            // Handle language selection
            switcher.addEventListener('click', (e) => {
                const langLink = e.target.closest('a[lang]');
                if (!langLink) return;

                e.preventDefault();
                const newLang = langLink.getAttribute('lang');
                this.switchLanguage(newLang);
            });

            // Handle keyboard navigation
            switcher.addEventListener('keydown', (e) => {
                const items = [...switcher.querySelectorAll('.dropdown-item')];
                const currentIndex = items.indexOf(document.activeElement);

                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextIndex = (currentIndex + 1) % items.length;
                        items[nextIndex].focus();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                        items[prevIndex].focus();
                        break;
                }
            });
        });
    }

    /**
     * Switch to a new language
     * @param {string} newLang - The language code to switch to
     */
    switchLanguage(newLang) {
        if (!this.supportedLanguages.includes(newLang)) return;

        // Save preference
        localStorage.setItem('preferred-language', newLang);

        // Get current route
        const currentPath = window.location.pathname;
        const currentLang = this.detectLanguage();
        
        // Calculate new URL
        let newPath;
        if (currentLang === this.defaultLanguage && !currentPath.startsWith('/' + currentLang)) {
            newPath = '/' + newLang + currentPath;
        } else {
            newPath = currentPath.replace('/' + currentLang, '/' + newLang);
        }

        // Navigate to new URL
        window.location.href = newPath;
    }

    /**
     * Update meta tags for language support
     */
    updateMetaTags() {
        const currentLang = this.detectLanguage();
        
        // Update html lang attribute
        document.documentElement.setAttribute('lang', currentLang);

        // Update alternate language links
        this.supportedLanguages.forEach(lang => {
            if (lang === currentLang) return;

            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            link.href = this.getAlternateUrl(lang);
            document.head.appendChild(link);
        });

        // Add x-default if not on default language
        if (currentLang !== this.defaultLanguage) {
            const defaultLink = document.createElement('link');
            defaultLink.rel = 'alternate';
            defaultLink.hreflang = 'x-default';
            defaultLink.href = this.getAlternateUrl(this.defaultLanguage);
            document.head.appendChild(defaultLink);
        }
    }

    /**
     * Get alternate URL for a language
     * @param {string} lang - Language code
     * @returns {string} Alternate URL
     */
    getAlternateUrl(lang) {
        const currentPath = window.location.pathname;
        const currentLang = this.detectLanguage();
        
        if (currentLang === this.defaultLanguage && !currentPath.startsWith('/' + currentLang)) {
            return window.location.origin + '/' + lang + currentPath;
        }
        
        return window.location.origin + currentPath.replace('/' + currentLang, '/' + lang);
    }
}

// Initialize router
const router = new MultilingualRouter();
export default router;