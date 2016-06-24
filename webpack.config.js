module.exports = {
    entry: {
            app: './src/js/index' 
    },
    output: {
        path: './www/js',
        filename: '[name].bundle.js'
    },
    devtools: 'source-map'
 };