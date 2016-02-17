var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackDevConfig = require("./webpack.config.js");
var webpackProdConfig = require("./webpack.prod.config.js");
var webserver = require('gulp-webserver');

gulp.task('default', ['dev']);

gulp.task('build_prod', function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackProdConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production')
            }
        })
        );

    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('dev', function (callback) {
    var myConfig = Object.create(webpackDevConfig);
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
    }).listen(3000, 'localhost', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:3000/');
    });
});

gulp.task('testprod', function (callback) {
    var myConfig = Object.create(webpackProdConfig);
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        hot: true,
        stats: {
            colors: true
        }
    }).listen(8080, 'localhost', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/');
    });
});

gulp.task('prod', ['build_prod'], function (callback) {
    gulp.src('./dist')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: false,
            open: false,
            port: 8080
        }));
});