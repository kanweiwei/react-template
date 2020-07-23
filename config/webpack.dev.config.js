const pathConfig = require("./path");
const loaders = require("./loaders.js");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    pathinfo: true,
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
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        oneOf: [
          loaders.babelLoader,
          loaders.lessLoaderDev,
          loaders.svgLoader,
          loaders.urlLoader,
          loaders.fileLoader,
        ],
      },
    ],
  },
  plugins: [
    // 编译进度条
    new WebpackBar({
      color: "#40a9ff",
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
    }),
    // 文件路径的大小检查
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      //
      "process.env.PROXY": JSON.stringify(process.env.PROXY),
      "process.env.MOCK": JSON.stringify(process.env.MOCK),
    }),
  ],
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
  devServer: {
    publicPath: "/",
    contentBase: [
      path.join(__dirname, "../build"),
      path.join(__dirname, "../src"),
    ],
    compress: true,
    proxy:
      process.env.PROXY === "true"
        ? {
            "/admin": {
              target: "http://116.62.165.39",
              changeOrigin: true,
              // onProxyRes(proxyRes) {
              //     const cookies = proxyRes.headers['set-cookie'];
              //     const cookieRegex = /Domain=\.?116\.62\.165\.39/i; // 返回的cookie中提取domain
              //     // 修改cookie Path
              //     if (cookies) {
              //       const newCookie = cookies.map(cookie => {
              //         if (cookieRegex.test(cookie)) {
              //           // 将domain设置为localhost
              //           return cookie.replace(cookieRegex, 'Domain=localhost');
              //         }
              //         return cookie;
              //       });
              //       delete proxyRes.headers['set-cookie'];
              //       proxyRes.headers['set-cookie'] = newCookie;
              //     }
              //   },
            },
          }
        : {},
  },
};
