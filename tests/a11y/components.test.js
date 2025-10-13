import { axe, toHaveNoViolations } from 'jest-axe';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
    describe('Components', () => {
        // Test Hero Component
        describe('Hero Component', () => {
            let heroHTML;
            beforeAll(() => {
                heroHTML = fs.readFileSync(
                    path.join(__dirname, '../../_includes/hero.html'),
                    'utf8'
                );
            });

            it('should have no accessibility violations', async () => {
                const dom = new JSDOM(heroHTML);
                const results = await axe(dom.window.document.body);
                expect(results).toHaveNoViolations();
            });

            it('should have proper ARIA attributes', () => {
                const dom = new JSDOM(heroHTML);
                const hero = dom.window.document.querySelector('.hero');
                expect(hero.getAttribute('role')).toBe('banner');
                expect(hero.querySelector('h1')).toBeTruthy();
            });
        });

        // Test Navigation Component
        describe('Navigation Component', () => {
            let navHTML;
            beforeAll(() => {
                navHTML = fs.readFileSync(
                    path.join(__dirname, '../../_includes/nav.html'),
                    'utf8'
                );
            });

            it('should have no accessibility violations', async () => {
                const dom = new JSDOM(navHTML);
                const results = await axe(dom.window.document.body);
                expect(results).toHaveNoViolations();
            });

            it('should have proper navigation landmarks', () => {
                const dom = new JSDOM(navHTML);
                const nav = dom.window.document.querySelector('nav');
                expect(nav.getAttribute('aria-label')).toBeTruthy();
            });
        });

        // Test Form Components
        describe('Form Components', () => {
            let formHTML;
            beforeAll(() => {
                formHTML = fs.readFileSync(
                    path.join(__dirname, '../../_includes/contact-form.html'),
                    'utf8'
                );
            });

            it('should have no accessibility violations', async () => {
                const dom = new JSDOM(formHTML);
                const results = await axe(dom.window.document.body);
                expect(results).toHaveNoViolations();
            });

            it('should have proper form labeling', () => {
                const dom = new JSDOM(formHTML);
                const form = dom.window.document.querySelector('form');
                const inputs = form.querySelectorAll('input, textarea, select');
                
                inputs.forEach(input => {
                    const label = form.querySelector(`label[for="${input.id}"]`);
                    expect(label).toBeTruthy();
                });
            });

            it('should have CSRF protection', () => {
                const dom = new JSDOM(formHTML);
                const form = dom.window.document.querySelector('form');
                const csrfInput = form.querySelector('input[name="_csrf"]');
                expect(csrfInput).toBeTruthy();
                expect(csrfInput.type).toBe('hidden');
            });
        });

        // Test Language Switcher
        describe('Language Switcher', () => {
            let switcherHTML;
            beforeAll(() => {
                switcherHTML = fs.readFileSync(
                    path.join(__dirname, '../../_includes/language-switcher.html'),
                    'utf8'
                );
            });

            it('should have no accessibility violations', async () => {
                const dom = new JSDOM(switcherHTML);
                const results = await axe(dom.window.document.body);
                expect(results).toHaveNoViolations();
            });

            it('should have proper language attributes', () => {
                const dom = new JSDOM(switcherHTML);
                const links = dom.window.document.querySelectorAll('a[lang]');
                links.forEach(link => {
                    expect(link.getAttribute('lang')).toMatch(/^[a-z]{2}$/);
                    expect(link.getAttribute('hreflang')).toBeTruthy();
                });
            });
        });

        // Test Card Components
        describe('Card Components', () => {
            let cardHTML;
            beforeAll(() => {
                cardHTML = fs.readFileSync(
                    path.join(__dirname, '../../_includes/card.html'),
                    'utf8'
                );
            });

            it('should have no accessibility violations', async () => {
                const dom = new JSDOM(cardHTML);
                const results = await axe(dom.window.document.body);
                expect(results).toHaveNoViolations();
            });

            it('should have proper heading structure', () => {
                const dom = new JSDOM(cardHTML);
                const card = dom.window.document.querySelector('.card');
                const heading = card.querySelector('.card-title');
                expect(heading).toBeTruthy();
                expect(['h2', 'h3', 'h4', 'h5', 'h6']).toContain(heading.tagName.toLowerCase());
            });
        });
    });

    // Test Page Templates
    describe('Page Templates', () => {
        // Test Base Template
        describe('Base Template', () => {
            let baseHTML;
            beforeAll(() => {
                baseHTML = fs.readFileSync(
                    path.join(__dirname, '../../_layouts/base.html'),
                    'utf8'
                );
            });

            it('should have no accessibility violations', async () => {
                const dom = new JSDOM(baseHTML);
                const results = await axe(dom.window.document.body);
                expect(results).toHaveNoViolations();
            });

            it('should have proper document structure', () => {
                const dom = new JSDOM(baseHTML);
                const doc = dom.window.document;
                
                expect(doc.querySelector('html[lang]')).toBeTruthy();
                expect(doc.querySelector('main')).toBeTruthy();
                expect(doc.querySelector('header')).toBeTruthy();
                expect(doc.querySelector('footer')).toBeTruthy();
                expect(doc.querySelector('nav')).toBeTruthy();
            });

            it('should have skip link', () => {
                const dom = new JSDOM(baseHTML);
                const skipLink = dom.window.document.querySelector('a.visually-hidden-focusable');
                expect(skipLink).toBeTruthy();
                expect(skipLink.getAttribute('href')).toBe('#main-content');
            });
        });
    });
});