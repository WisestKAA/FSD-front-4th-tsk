const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (env, options) => {
  const production = options.mode === 'production';
  const publicDir = production ? 'https://wisestkaa.github.io/FSD-front-4th-tsk' : '/';

  return {
    watch: true,
    entry: './src/index',
    devtool: production ? false : 'inline-source-map',
    mode: options.mode,
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components|\.spec.ts)/
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './out/'
              }
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(ttf|eot|woff|svg|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: './'
            }
          }
        },
        {
          test: /\.(svg|png|ico|xml|json|webmanifest)$/,
          exclude: [/node_modules/, /demopage/],
          use: [{
            loader: 'file-loader',
            options: {
              name: './favicons/[name].[ext]',
              publicPath: '../'
            }
          }]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist'),
      publicPath: publicDir
    },
    devServer: {
      contentBase: path.join(__dirname, './dist'),
      compress: true,
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.pug',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  };
};
