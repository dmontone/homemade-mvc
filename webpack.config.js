const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill', __dirname + '/src/main.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'main.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader'
                }
            },
            
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{ loader: 'style-loader' },
                      { loader: 'css-loader' },
                      { loader: 'sass-loader' }]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            inject: 'body'
        })
    ],
    devServer: {},
    resolve: {
        alias: {
            APP: __dirname + '/src/app',
        }
    }
}