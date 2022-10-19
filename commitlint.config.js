module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'footer-max-length': [0, 'always', Infinity],
  },
};
