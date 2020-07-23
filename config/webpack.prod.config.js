const pathConfig = require("./path");
const loaders = require("./loaders.js");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  mode: "production",
  bail: true,
  entry: pathConfig.appIndex,
  output: {
    pathinfo: true,
    path: pathConfig.appBuild,
    filename: "static/js/[name].bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
    publicPath: pathConfig.publicPath,
    globalObject: "this",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
    alias: {
      "@/*": path.resolve(__dirname, "../src"),
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: pathConfig.appTsConfig,
      }),
    ],
  },
  module: {
    rules: [
      {
        oneOf: [
          loaders.babelLoader,
          loaders.cssLoaderProd,
          loaders.lessLoaderProd,
          loaders.svgLoader,
          loaders.urlLoader,
          loaders.fileLoader,
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        // 不怎么更新的第三方库
        vendor: {
          name: "vendor",
          chunks: "all",
          priority: -10,
          reuseExistingChunk: false,
          test: /[\\/](react|react-dom|react-router|react-router-dom|moment|antd|@ant-design)[\\/]/,
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  plugins: [
    // 编译进度条
    new WebpackBar({
      color: "#40a9ff",
      reporters: ["profile"],
      profile: true,
    }),
    // html 模版
    new HtmlWebpackPlugin({
      inject: true,
      template: pathConfig.appHtml,
      filename: `index.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      hash: false,
      cache: true,
      chunks: ["vendor", "commons", "manifest", "main"],
    }),
    new ExtractCssChunks({
      filename: "static/css/index.[hash:8].css",
      chunkFilename: "static/css/[id].css",
    }),
    // 文件路径的大小检查
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      //
    }),
    new webpack.DefinePlugin({
      //
      "process.env.PROXY": JSON.stringify(process.env.PROXY),
      "process.env.MOCK": JSON.stringify(process.env.MOCK),
    }),
  ],
};
