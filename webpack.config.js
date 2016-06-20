var webpack = require('webpack');

module.exports = {
  entry: './bundle.js',
  output: {
    path: __dirname,
    filename: '/dist/dapi.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ]
};
