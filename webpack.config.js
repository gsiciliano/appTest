module.exports = {
    entry: {
            app: './src/js/index' 
    },
    output: {
        path: './www/js',
        filename: '[name].bundle.js'
    },
    devtools: 'source-map',
    devServer: {
       historyApiFallback: true,
       contentBase: './platforms/browser/www',
       //host: '192.168.252.93',
       //port: '443',
       https: true,
       headers: {
         "Access-Control-Allow-Origin": "*"
//         "Access-Control-Allow-Methods": "GET",
//         "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
       }
  }};