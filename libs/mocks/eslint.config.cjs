const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      "@nrwl/nx/enforce-module-boundaries": "off"
    },
    languageOptions: {
      parser: require('jsonc-eslint-parser'),
    },
  },
];
