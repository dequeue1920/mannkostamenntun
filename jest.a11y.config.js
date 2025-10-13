const path = require('path');

module.exports = {
    displayName: 'accessibility',
    testMatch: ['**/?(*.)+(spec|test).a11y.{js,jsx}'],
    setupFilesAfterEnv: [path.resolve(__dirname, './jest.a11y.setup.js')],
    testEnvironment: 'jsdom'
};