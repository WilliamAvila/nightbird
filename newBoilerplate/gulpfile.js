var os = require('os');
var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackDevConfig = require("./webpack.config.js");
var webpackProdConfig = require("./webpack.prod.config.js");
var webserver = require('gulp-webserver');
var karmaServer = require('karma').Server;
var open = require('gulp-open');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var htmlhint = require('gulp-htmlhint');
var runSequence = require('run-sequence');
var CopyWebpackPlugin = require('copy-webpack-plugin');

gulp.task('default', ['dev', 'tdd', 'browser'], function (done) {
});
gulp.task('browser', function () {
    var browser = os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
            os.platform() === 'win32' ? 'chrome' : 'firefox'));
    return gulp.src('')
        .pipe(open({ app: browser, uri: 'http://localhost:3000' }));
});
gulp.task('compile_prod', function (callback) {
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

gulp.task('dev', ['lintHtmls'], function (callback) {
    var myConfig = Object.create(webpackDevConfig);
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
    }).listen(3000, 'localhost', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:3000/');
    });
});

gulp.task('prod:test', ['lintHtmls'], function (callback) {
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

gulp.task('build_prod', function (callback) {
    return runSequence('lintHtmls', 'compile_prod', 'imagemin', callback);
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

gulp.task('imagemin', function () {
    return gulp.src('./src/assets/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                { removeViewBox: false },
                { cleanupIDs: false }
            ],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/assets/img'));
})

gulp.task('tdd', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false,
        autoWatch: true
    }, done).start();
});

gulp.task('lintHtmls', function () {
    console.log('Linting HTML files');
    return gulp
        .src('./src/**/*.html')
        .pipe(htmlhint('htmlhintrc.json'))
        .pipe(htmlhint.reporter('htmlhint-stylish'))
        .pipe(htmlhint.failReporter())
});
