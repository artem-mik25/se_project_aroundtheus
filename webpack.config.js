const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",

  // Entry point
  entry: {
    main: "./src/pages/index.js", // Path to your index.js file
  },

  // Output configuration
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory for bundled files
    filename: "main.js", // Output bundled JS filename
    publicPath: "/", // Ensures that paths are correctly handled
  },

  mode: "development", // Change to 'production' when building for production

  devServer: {
    static: path.resolve(__dirname, "dist"), // Directory to serve
    compress: true,
    port: 8080, // Webpack DevServer port
    open: true, // Automatically open browser
    liveReload: true, // Enable live reload
  },

  module: {
    rules: [
      {
        test: /\.js$/, // For JavaScript files
        loader: "babel-loader", // Transpile with Babel
        exclude: "/node_modules/", // Exclude node_modules
      },
      {
        test: /\.css$/, // For CSS files
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // Extract and process CSS
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/i, // For images and fonts
        type: "asset/resource", // Asset handling
        generator: {
          filename: "assets/[hash][ext][query]", // Output to assets folder with hash filenames
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Path to your source index.html
      favicon: "./src/images/favicon.ico", // Path to favicon
    }),
    new CleanWebpackPlugin(), // Clean dist folder before build
    new MiniCssExtractPlugin(), // Extract CSS into separate files
  ],
};
