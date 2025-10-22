const { configureAxe } = require('jest-axe');

expect.extend(require('jest-axe/extend-expect'));

// Configure axe for your specific needs
const axe = configureAxe({
    rules: [
        {
            id: 'skip-link',
            enabled: true
        },
        {
            id: 'region',
            enabled: true
        }
    ],
    checks: [
        {
            id: 'color-contrast',
            options: {
                noScroll: true
            }
        }
    ]
});

global.axe = axe;