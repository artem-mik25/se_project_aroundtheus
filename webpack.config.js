const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/pages/index.js", // Adjusted path to point to the 'pages' folder for index.js
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js", // Output JavaScript file name
    publicPath: "",
  },
  target: ["web", "es5"],
  stats: "errors-only",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 8080,
    open: true,
    liveReload: true,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Test for JS files
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/, // Test for CSS files
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/i, // Adjusted to include common assets like fonts and images
        type: "asset/resource",
        generator: {
          filename: 'assets/[hash][ext][query]', // Store assets in assets folder with hash-based file names
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Adjusted path to point to your root HTML file
      favicon: "./src/images/favicon.ico", // Ensure favicon path is correct
    }),
    new CleanWebpackPlugin(), // Cleans up the dist folder before every build
    new MiniCssExtractPlugin(), // Extracts CSS into separate files
  ],
};
