const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: {
    index: [
      './src/index.ts',
      './src/styles.scss'
    ]
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: false } },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/demopage/demopage.pug',
      filename: './index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};

module.exports = async () => {
  return merge(common, config);
};
