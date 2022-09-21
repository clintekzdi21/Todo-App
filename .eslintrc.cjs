module.exports = {
  env: {
    es2021: true,
  },
  extends: ['airbnb', 'plugin:import/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/extensions': ['.js'],
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
};
