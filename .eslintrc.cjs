module.exports = {
   extends: ['prettier', 'eslint:recommended'],
   rules: {
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
      indent: ['error', 3]
   },
   parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module'
   },
   env: {
      node: true,
      es6: true
   }
};
