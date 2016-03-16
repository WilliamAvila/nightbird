// @AngularClass
var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = helpers.hasProcessFlag('hot');
var CleanPlugin = require('clean-webpack-plugin');

var metadata = {
    title: 'Angular2 Webpack Starter by @gdi2990 from @AngularClass',
    baseUrl: '/',
    host: 'localhost',
    port: 3000,
    ENV: ENV,
    HMR: HMR
};
/*
 * Config
 * with default values at webpack.default.conf
 */
module.exports = {
    // static data for index.html
    metadata: metadata,
    devtool: 'cheap-module-eval-source-map',
    // cache: true,
    debug: true,
    // devtool: 'eval' // for faster builds use 'eval'

    // our angular app
    entry: {
        'polyfills': './src/polyfills.ts',
        "externalLibraries": [
            "./node_modules/foundation-sites/dist/foundation.min.js"
        ],
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    // Config for our build files
    output: {
        path: helpers.root('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        preLoaders: [
            { test: /\.ts$/, loader: 'tslint-loader', exclude: [root('node_modules'), root('for_foundation'), root('for_bootstrap')] },
            // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },
            // TODO(gdi2290): `exclude: [ helpers.root('node_modules/rxjs') ]` fixed with rxjs 5 beta.3 release
            { test: /\.js$/, loader: 'source-map-loader', exclude: [helpers.root('node_modules/rxjs')] }
        ],
        loaders: [
            // Support for .ts files.
            { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/, root('for_foundation'), root('for_bootstrap')] },

            // Support for *.json files.
            { test: /\.json$/, loader: 'json-loader' },

            // Support for CSS as raw text
            { test: /\.css$/, loader: 'raw-loader' },

            // support for .html as raw text
            { test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')] },
            { test: /\.scss$/, exclude: /node_modules/, loader: 'raw-loader!sass-loader!postcss-loader' },
            { test: /\.less$/, loader: 'raw-loader!less' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }

        ]
    },

    plugins: [
        new CleanPlugin('dist'),
        new ForkCheckerPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
        // static assets
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
        // generating html
        new HtmlWebpackPlugin({ template: 'src/index.html', chunksSortMode: 'none' }),
        // Environment helpers (when adding more properties make sure you include them in custom-typings.d.ts)
        new webpack.DefinePlugin({
            'ENV': JSON.stringify(metadata.ENV),
            'HMR': HMR
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],

    // Other module loader config

    // our Webpack Development Server config
    tslint: {
        emitErrors: true,
        failOnHint: true,
        resourcePath: 'src',
    },
    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    node: {
        global: 'window',
        process: true,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}