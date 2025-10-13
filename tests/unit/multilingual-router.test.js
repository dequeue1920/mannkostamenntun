import MultilingualRouter from '../../src/js/utils/multilingual-router';
import { JSDOM } from 'jsdom';

describe('Multilingual Router', () => {
    let router;
    let originalWindow;
    
    beforeEach(() => {
        // Set up DOM environment
        const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
            url: 'https://example.com',
            referrer: 'https://example.com',
            contentType: 'text/html',
        });

        originalWindow = global.window;
        global.window = dom.window;
        global.document = dom.window.document;
        
        // Mock localStorage
        const localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn()
        };
        global.localStorage = localStorageMock;
        
        // Initialize router
        router = new MultilingualRouter();
    });

    afterEach(() => {
        global.window = originalWindow;
        jest.clearAllMocks();
    });

    describe('Language Detection', () => {
        it('should detect language from URL path', () => {
            window.location.pathname = '/en/about';
            expect(router.detectLanguage()).toBe('en');
        });

        it('should detect language from localStorage', () => {
            localStorage.getItem.mockReturnValue('en');
            expect(router.detectLanguage()).toBe('en');
        });

        it('should detect language from browser settings', () => {
            Object.defineProperty(window.navigator, 'language', {
                value: 'en-US',
                configurable: true
            });
            expect(router.detectLanguage()).toBe('en');
        });

        it('should fall back to default language', () => {
            expect(router.detectLanguage()).toBe('is');
        });
    });

    describe('Route Handling', () => {
        it('should generate correct routes for default language', () => {
            const routes = router.routes.get('is');
            expect(routes.home).toBe('/');
            expect(routes.about).toBe('/is/about');
        });

        it('should generate correct routes for non-default language', () => {
            const routes = router.routes.get('en');
            expect(routes.home).toBe('/en');
            expect(routes.about).toBe('/en/about');
        });
    });

    describe('Language Switching', () => {
        it('should correctly switch languages', () => {
            const newLang = 'en';
            router.switchLanguage(newLang);
            expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', newLang);
        });

        it('should update meta tags when switching languages', () => {
            router.switchLanguage('en');
            const altLinks = document.querySelectorAll('link[rel="alternate"]');
            expect(altLinks.length).toBeGreaterThan(0);
        });

        it('should handle invalid language codes', () => {
            router.switchLanguage('invalid');
            expect(localStorage.setItem).not.toHaveBeenCalled();
        });
    });

    describe('SEO Optimization', () => {
        it('should set correct html lang attribute', () => {
            router.updateMetaTags();
            expect(document.documentElement.getAttribute('lang')).toBe('is');
        });

        it('should add alternate language links', () => {
            router.updateMetaTags();
            const altLinks = document.querySelectorAll('link[rel="alternate"]');
            expect(altLinks.length).toBe(router.supportedLanguages.length - 1);
        });

        it('should add x-default link when not on default language', () => {
            window.location.pathname = '/en/about';
            router.updateMetaTags();
            const xDefaultLink = document.querySelector('link[hreflang="x-default"]');
            expect(xDefaultLink).toBeTruthy();
        });
    });

    describe('URL Generation', () => {
        it('should generate correct alternate URLs', () => {
            window.location.pathname = '/about';
            const altUrl = router.getAlternateUrl('en');
            expect(altUrl).toBe('https://example.com/en/about');
        });

        it('should handle already localized URLs', () => {
            window.location.pathname = '/en/about';
            const altUrl = router.getAlternateUrl('is');
            expect(altUrl).toBe('https://example.com/is/about');
        });
    });

    describe('Error Handling', () => {
        it('should handle missing language codes gracefully', () => {
            const result = router.switchLanguage();
            expect(result).toBeFalsy();
        });

        it('should handle invalid URLs gracefully', () => {
            window.location.pathname = '/invalid/path';
            const altUrl = router.getAlternateUrl('en');
            expect(altUrl).toBeTruthy();
        });
    });
});