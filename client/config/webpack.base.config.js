const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./../path");
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: paths.clientMain,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.(?:sa|s?c)ss$/,
          exclude: [/node_modules/],
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    output: {
      path: paths.dist,
      publicPath: paths.publicPath,
      filename: "bundle.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.indexHtml,
        filename: "./index.html"
      }),
      new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
      contentBase: paths.dist,
      hot: true
    }
  };
};
