var path = require("path");
module.exports = {
    entry: {
        app: ['./src/js/barcodeScanner.js',
              './src/js/google.js',
              './src/js/index.js',
              './src/js/render.js',
              './src/js/utils.js']
     },

    output: {
        path: './www/js',
        filename: '[name].bundle.js'
    }
 };