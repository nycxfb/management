module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-indent': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-multi-spaces': 'off',
    'vue/valid-template-root': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-unused-vars': 'off'
  },
  extends: [
    'plugin:vue/recommended',
    // '@vue/standard'
  ],

  'extends': [
    'plugin:vue/recommended'
  ]
}

