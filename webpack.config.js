var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    path: './public/assets/js/bable/',
    filename: '[name].js',
    chunkFilename: '[id].bundle.js',
    publicPath: '/public/assets/js/bable/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:/\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({'process.env':{'NODE_ENV':JSON.stringify('production')}}),
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]
};
