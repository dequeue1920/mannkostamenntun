/**
 * Breadcrumbs Component
 * Handles keyboard navigation and accessibility features
 */

class Breadcrumbs {
    constructor() {
        this.menu = null;
        this.items = null;
        this.isMenuVisible = false;
        this.currentIndex = -1;
        
        this.init();
    }

    /**
     * Initialize breadcrumbs functionality
     */
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.menu = document.querySelector('.breadcrumb-menu');
            this.items = Array.from(this.menu?.querySelectorAll('.breadcrumb-menu-item') || []);
            
            if (!this.menu || !this.items.length) return;
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Add keyboard support for the breadcrumb list
            const breadcrumbList = document.querySelector('.breadcrumb');
            if (breadcrumbList) {
                this.setupKeyboardNavigation(breadcrumbList);
            }
        });
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('click', (e) => this.handleClick(e));
        
        // Handle focus management
        this.items.forEach(item => {
            item.addEventListener('focus', () => {
                this.currentIndex = this.items.indexOf(item);
            });
        });
    }

    /**
     * Set up keyboard navigation for the breadcrumb list
     */
    setupKeyboardNavigation(list) {
        const items = Array.from(list.querySelectorAll('.breadcrumb-item'));
        
        items.forEach(item => {
            item.setAttribute('tabindex', '0');
            item.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowRight':
                        e.preventDefault();
                        this.focusNextItem(items, items.indexOf(item));
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.focusPreviousItem(items, items.indexOf(item));
                        break;
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        const link = item.querySelector('a');
                        if (link) link.click();
                        break;
                }
            });
        });
    }

    /**
     * Handle keyboard events
     */
    handleKeyDown(e) {
        if (!this.isMenuVisible && e.key === 'Enter' && e.target.matches('.breadcrumb-item')) {
            e.preventDefault();
            this.showMenu();
            return;
        }

        if (!this.isMenuVisible) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.focusNextMenuItem();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.focusPreviousMenuItem();
                break;
            case 'Escape':
                e.preventDefault();
                this.hideMenu();
                break;
            case 'Enter':
            case ' ':
                if (this.currentIndex >= 0) {
                    e.preventDefault();
                    this.items[this.currentIndex].click();
                    this.hideMenu();
                }
                break;
        }
    }

    /**
     * Handle click events
     */
    handleClick(e) {
        if (!this.menu?.contains(e.target)) {
            this.hideMenu();
        }
    }

    /**
     * Focus the next menu item
     */
    focusNextMenuItem() {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
            this.items[this.currentIndex].focus();
        }
    }

    /**
     * Focus the previous menu item
     */
    focusPreviousMenuItem() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.items[this.currentIndex].focus();
        }
    }

    /**
     * Focus next item in breadcrumb list
     */
    focusNextItem(items, currentIndex) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < items.length) {
            items[nextIndex].focus();
        }
    }

    /**
     * Focus previous item in breadcrumb list
     */
    focusPreviousItem(items, currentIndex) {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            items[prevIndex].focus();
        }
    }

    /**
     * Show the breadcrumb menu
     */
    showMenu() {
        if (!this.menu) return;
        
        this.menu.classList.remove('visually-hidden');
        this.isMenuVisible = true;
        this.currentIndex = 0;
        this.items[0]?.focus();
    }

    /**
     * Hide the breadcrumb menu
     */
    hideMenu() {
        if (!this.menu) return;
        
        this.menu.classList.add('visually-hidden');
        this.isMenuVisible = false;
        this.currentIndex = -1;
    }
}

// Initialize breadcrumbs
const breadcrumbs = new Breadcrumbs();
export default breadcrumbs;