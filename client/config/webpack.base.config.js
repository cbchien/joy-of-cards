const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./../path');

module.exports = {
    entry: paths.clientMain,
    module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.(?:sa|s?c)ss$/,
            exclude: [/node_modules/],
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    },
                },
                'sass-loader',
            ],
        },
      ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: paths.dist,
        publicPath: paths.publicPath,
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({ 
          template: paths.indexHtml, 
          filename: './index.html' 
        }),
    ],
    devServer: {
        contentBase: paths.dist,
        hot: true
    }
} 