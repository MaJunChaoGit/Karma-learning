var webpackConfig = require('../../build/webpack.test.config');

module.exports = function (config) {
    config.set({
        // to run in additional browsers:
        // 1. install corresponding karma launcher
        //    http://karma-runner.github.io/0.13/config/browsers.html
        // 2. add it to the `browsers` array below.
        browsers: ['Chrome'],
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['spec', 'coverage'],
        files: ['index.js'],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },

        webpackMiddleware: {
            noInfo: true
        },
        // 不显示 `webpack` 打包日志信息
        webpackServer: {
            noInfo: true
        },
        webpack: webpackConfig,
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        }
    })
}