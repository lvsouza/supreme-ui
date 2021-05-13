const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: {
    "supreme-ui": path.resolve(__dirname, '..', 'src', 'global.css')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  },
  resolve: {},
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssoMinify,
      }),
    ],
  }
}
