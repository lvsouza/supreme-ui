const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const portFinderSync = require('portfinder-sync');

const examplesPages = ['sign-page', 'sign-up-page'];

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: {
    "clean-ui": path.resolve(__dirname, '..', 'src', 'global.css')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  },
  resolve: {},
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...examplesPages.map(fileName => new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'examples', `${fileName}.html`),
      filename: `${fileName}.html`,
    })),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'dist-dev'),
    port: portFinderSync.getPort(3000),
    // writeToDisk: true,
    liveReload: false,
    hotOnly: true,
    inline: true,
    hot: true,

    // Desabilita logs
    stats: {
      entrypoints: false,
      publicPath: false,
      modules: false,
      version: false,
      assets: false,
      // timings: false,
    }
  },
  optimization: {
    minimize: false,
    minimizer: [
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssoMinify,
      }),
    ],
  }
}
