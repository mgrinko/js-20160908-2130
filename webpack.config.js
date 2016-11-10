let webpack = require('webpack');
let path = require('path');


module.exports = {
  context: __dirname + '/frontend/scripts',
  entry: "./index.js",
  output: {
    path: __dirname + "/public",
    filename: "build.js"
  },

  watch: true,
  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  devServer: {
    proxy: {
      '*': 'http://localhost:3000'
    }
  }

  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   }),
  // ]
};
