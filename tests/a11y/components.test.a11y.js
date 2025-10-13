import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

expect.extend(toHaveNoViolations);

describe('Component Accessibility Tests', () => {
    // Test Contact Form
    describe('Contact Form', () => {
        let formHTML;

        beforeAll(() => {
            formHTML = fs.readFileSync(
                path.join(__dirname, '../../_includes/components/contact-form.html'),
                'utf8'
            );
        });

        it('should have no accessibility violations', async () => {
            const dom = new JSDOM(formHTML);
            const results = await axe(dom.window.document.body);
            expect(results).toHaveNoViolations();
        });

        it('should have proper form labels and ARIA attributes', () => {
            const dom = new JSDOM(formHTML);
            const form = dom.window.document.querySelector('form');
            
            // Check for required attributes
            expect(form.getAttribute('novalidate')).toBeTruthy();
            expect(form.querySelector('input[name="_csrf"]')).toBeTruthy();

            // Check input fields
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                const label = form.querySelector(`label[for="${input.id}"]`);
                expect(label).toBeTruthy();
                expect(input.getAttribute('aria-label')).toBeTruthy();
            });
        });
    });

    // Test Language Switcher
    describe('Language Switcher', () => {
        let switcherHTML;

        beforeAll(() => {
            switcherHTML = fs.readFileSync(
                path.join(__dirname, '../../_includes/components/language-switcher.html'),
                'utf8'
            );
        });

        it('should have no accessibility violations', async () => {
            const dom = new JSDOM(switcherHTML);
            const results = await axe(dom.window.document.body);
            expect(results).toHaveNoViolations();
        });

        it('should have proper ARIA labels and language attributes', () => {
            const dom = new JSDOM(switcherHTML);
            const switcher = dom.window.document.querySelector('.language-switcher');
            
            // Check dropdown button
            const button = switcher.querySelector('button');
            expect(button.getAttribute('aria-expanded')).toBeTruthy();
            expect(button.getAttribute('aria-label')).toBeTruthy();

            // Check language links
            const links = switcher.querySelectorAll('a');
            links.forEach(link => {
                expect(link.getAttribute('lang')).toBeTruthy();
                expect(link.getAttribute('hreflang')).toBeTruthy();
            });
        });
    });

    // Test Navigation
    describe('Navigation', () => {
        let navHTML;

        beforeAll(() => {
            navHTML = fs.readFileSync(
                path.join(__dirname, '../../_includes/components/nav.html'),
                'utf8'
            );
        });

        it('should have no accessibility violations', async () => {
            const dom = new JSDOM(navHTML);
            const results = await axe(dom.window.document.body);
            expect(results).toHaveNoViolations();
        });

        it('should have proper navigation landmarks and ARIA attributes', () => {
            const dom = new JSDOM(navHTML);
            const nav = dom.window.document.querySelector('nav');
            
            expect(nav.getAttribute('aria-label')).toBeTruthy();
            
            // Check mobile menu button
            const menuButton = nav.querySelector('button.navbar-toggler');
            expect(menuButton.getAttribute('aria-expanded')).toBeTruthy();
            expect(menuButton.getAttribute('aria-controls')).toBeTruthy();
        });
    });
});