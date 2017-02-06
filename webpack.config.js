let webpack = require('webpack');
let production = !!process.env.PROD;

module.exports = {
  entry: {pseudofetch: './src/index.js'},
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      include: [__dirname + '/src'],
    }],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: __dirname + '/dist',
    filename: production ? '[name].min.js' : '[name].js',
  },
  plugins: production ? [new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false},
  })] : [],
  performance: {
    hints: false,
  },
};
