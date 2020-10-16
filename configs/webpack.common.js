const path = require('path');

module.exports = {
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
    extensions: ['.ts', '.js'],
    alias: {
      '@src': path.join(__dirname, '../src')
    }
  }
};
