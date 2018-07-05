const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: { main: './src/js/index.js'},
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
            // fallback to style-loader in development
            process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new UglifyJsPlugin({
      //options here
      test: /\.js($|\?)/i
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: "[id].css"
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: __dirname + '/src/html/index.html',
      filename: 'index.html'
    })
  ]
};