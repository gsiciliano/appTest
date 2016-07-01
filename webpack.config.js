var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
module.exports = {
    entry: {
            app: './src/js/index' 
    },
    output: {
        path: path.resolve(__dirname, "www/dist"),
        filename: '[name].bundle.js'
    },
    devtools: 'source-map',
    devServer: {
       historyApiFallback: true,
       contentBase: ("./platforms/browser/www"),
       headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET",
         "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
       }
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader'
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.(woff|woff2)$/,
                loader:'url?prefix=font/&limit=5000'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.handlebars$/,
                loader: "handlebars-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.bundle.css', {
            allChunks: true
        })
    ]
};