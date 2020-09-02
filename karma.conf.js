const webpackConfig = require('./webpack.testconfig');
const path = require('path');

delete webpackConfig.entry;

module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    plugins: ['@metahub/karma-jasmine-jquery', 'karma-*'],
    frameworks: ['jasmine-jquery', 'jasmine'],
    reporters: ['spec', 'coverage-istanbul'],
    files: [
      'test/**/*.ts'
    ],
    preprocessors: {
      'test/**/*.ts': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary', 'lcovonly'],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
      'report-config': {
        html: { outdir: 'html' }
      }
    }
  });
};
