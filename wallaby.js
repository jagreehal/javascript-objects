var babel = require('babel');
module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'node_modules/**', 'ignore': true},
      {pattern: 'src/**/*.spec.js', 'ignore': true},
      {pattern: 'node_modules/chai/chai.js', 'instrument': false},
      'src/**/*.js',
      ''
    ],
    tests: [
      'src/**/*.spec.js'
    ],
    env: {
      type: 'node'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: babel,
        optional: ['es7.asyncFunctions', 'es7.decorators', 'runtime'],
        stage: 0
      })
    }
  };
};
