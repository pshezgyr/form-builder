const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path_dist = resolve("dist");
const pkg = require("./package.json");

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: "./src/index.tsx",
  entry: [
    "react-hot-loader/patch",
    resolve("src", "index.tsx")
  ],
  output: {
    filename: "./dist/bundle.js",
    path: path_dist,
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, use: "ts-loader",
        exclude: /node_modules/
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.js$/, use: "source-map-loader" }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: pkg.name,
      filename: resolve("dist", "index.html"),
      template: resolve("src", "index.ejs"),
      inject: false,
      hash: true
    })
  ],
  devServer: {
    contentBase: path_dist,
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: "/"
  }
};
