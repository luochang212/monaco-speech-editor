import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        window: 'writable',
        document: 'readonly',
        console: 'readonly',
        self: 'writable',
        location: 'readonly',
        URLSearchParams: 'readonly',
        SpeechSynthesisUtterance: 'readonly',
        speechSynthesis: 'readonly',
        XMLHttpRequest: 'readonly',
        FileReader: 'readonly',
        setTimeout: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        prompt: 'readonly',
        screen: 'readonly',
        monaco: 'writable',
        require: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-redeclare': 'off',
      'no-useless-escape': 'off',
      'no-empty': 'warn',
      'no-cond-assign': 'warn'
    }
  }
];
