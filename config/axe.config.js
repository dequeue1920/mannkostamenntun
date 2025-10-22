const { configureAxe } = require('jest-axe');

const axeConfig = {
    rules: {
        // Custom rule configuration
        'color-contrast': { enabled: true },
        'html-has-lang': { enabled: true },
        'valid-lang': { enabled: true },
        'region': { enabled: true },
        'landmark-one-main': { enabled: true },
        'page-has-heading-one': { enabled: true },
        'button-name': { enabled: true },
        'form-field-multiple-labels': { enabled: true },
        // Additional rules for educational content
        'aria-allowed-attr': { enabled: true },
        'aria-hidden-focus': { enabled: true },
        'aria-required-children': { enabled: true },
        'aria-required-parent': { enabled: true },
        'aria-roles': { enabled: true },
        'aria-valid-attr-value': { enabled: true },
        'label': { enabled: true }
    },
    checks: [
        {
            id: 'multilingual-content',
            evaluate: function(node) {
                // Custom check for multilingual support
                const lang = node.getAttribute('lang');
                const hasLangAttr = !!lang;
                const hasValidLang = /^[a-z]{2}(-[A-Z]{2})?$/.test(lang);
                return hasLangAttr && hasValidLang;
            }
        }
    ]
};

// Export the configured axe
module.exports = configureAxe(axeConfig);