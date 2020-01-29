module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
    'plugin:react/recommended',
  ],
  'ignorePatterns': ['node_modules/', 'build'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'object-curly-spacing': [2, 'always'],
    'linebreak-style': 0,
  },
  'settings': {
    'react': {
      'pragma': 'React',
      'version': 'detect'
    }
  },
};
