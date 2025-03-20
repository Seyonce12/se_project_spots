const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./scripts/index.js",
  },
  output: {
    filename: "./scripts/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "./images", to: "images" },
        { from: "./blocks", to: "blocks" },
        { from: "./vendor", to: "vendor" },
        { from: "./pages", to: "pages" },
        { from: "./scripts/validation.js", to: "scripts/validation.js"}
      ],
    }),
  ],
};
