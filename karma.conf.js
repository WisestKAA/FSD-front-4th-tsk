const webpackConfig = require('./webpack.testconfig');

module.exports = function(config) {
    config.set({
        basePath: '',
        plugins: ['@metahub/karma-jasmine-jquery', 'karma-*'],
        frameworks: ['jasmine-jquery', 'jasmine'],
        files: ['test/*.ts', 
            'test/*.js', 
            './node_modules/jquery/dist/jquery.js',
            "test/**/*.ts"],
        exclude: [],
        preprocessors: {
            'test/**/*.ts': ['webpack'],
            'test/**/*.js': ['webpack'],
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            mode: webpackConfig.mode,
            devtool: 'inline-source-map',
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
    }); 
}