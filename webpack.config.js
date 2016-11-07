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
        loader: "style-loader!css-loader"
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

  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   }),
  // ]
};



// module.exports = {
//   context: path.join(__dirname, 'frontend', 'scripts'),
//   entry: './index.js',
//   output: {
//     path: path.join(__dirname, 'public'),
//     filename: 'build.js'
//   },
//
//   watch: true,
//   devtool: 'source-map',
//
//   module: {
//     loaders: [
//       // {
//       //   test: /\.hbs$/,
//       //   loader: "handlebars-loader"
//       // },
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         loader: 'babel',
//         query: {
//           presets: ['es2015'],
//           plugins: ['transform-runtime']
//         }
//       }
//     ]
//   },
//
//   plugins: [
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       }
//     }),
//   ]
// };