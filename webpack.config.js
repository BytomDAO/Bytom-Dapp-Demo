const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        loaders: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    // Send API requests on localhost to API server get around CORS.
    proxy: {
      '/dapptestnet': {
        target:'http://app.bycoin.io:3200/dapp',
        secure: false,
        pathRewrite: {
          '^/dapptestnet': ''
        }
      },
      '/dapp': {
        target:'http://app.bycoin.io:3100/dapp',
        secure: false,
        pathRewrite: {
          '^/dapp': ''
        }
      },
    }
  },
  resolve: {
    extensions: ['.scss', '.css', '.js', '.jsx', '.json'],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './contracts',
        to: 'contracts/'
      }
    ]),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  externals: {
    config:  "config",
  }
};