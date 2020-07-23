const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const path = require("path");
const fs = require("fs");

const fileLoader = {
  loader: "file-loader",
  // Exclude `js` files to keep "css" loader working as it injects
  // it's runtime that would otherwise processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.js$/, /\.html$/, /\.json$/],
  options: {
    name: "static/media/[name].[hash:8].[ext]",
  },
};

const urlLoader = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve("url-loader"),
  options: {
    limit: 10000,
    name: "static/media/[name].[hash:8].[ext]",
  },
};

const svgLoader = {
  test: /\.svg$/,
  use: ["@svgr/webpack", "url-loader"],
  exclude: /node_modules/,
};

const rawCssLoaderDev = {
  loader: "css-loader",
  options: {
    importLoaders: 1,
  },
};

const rawCssLoaderProd = {
  loader: "css-loader",
  options: {
    importLoaders: 1,
  },
};

const cssLoaderProd = {
  test: /\.css$/,
  use: [rawCssLoaderProd],
};

// less loader
const lessLoaderDev = {
  test: /\.(less|css)$/,
  use: [
    "style-loader",
    rawCssLoaderDev,
    "postcss-loader",
    {
      loader: "less-loader",
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
        appendData: (loader) => {
          loader.addDependency(path.resolve(__dirname, "../theme.less"));

          return fs
            .readFileSync(path.resolve(__dirname, "../theme.less"))
            .toString();
        },
      },
    },
  ],
};

const lessLoaderProd = {
  test: /\.(less|css)$/,
  use: [
    ExtractCssChunks.loader,
    rawCssLoaderProd,
    "postcss-loader",
    {
      loader: "less-loader",
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
        appendData: (loader) => {
          loader.addDependency(path.resolve(__dirname, "../theme.less"));

          return fs
            .readFileSync(path.resolve(__dirname, "../theme.less"))
            .toString();
        },
      },
    },
  ],
};

const babelLoader = {
  test: /\.(js|jsx|ts|tsx|mjs)$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    // @remove-on-eject-begin
    babelrc: false,
    presets: [
      ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
      ["@babel/preset-react"],
      ["@babel/preset-typescript"],
    ],
    plugins: [
      // Stage 2
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      "@babel/plugin-proposal-numeric-separator",
      // Stage 3
      "@babel/plugin-syntax-dynamic-import",
      ["@babel/plugin-proposal-class-properties", { loose: false }],

      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-spread",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-private-methods",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-transform-object-assign",
      ["import", { libraryName: "antd", libraryDirectory: "lib", style: true }],
    ],

    // @remove-on-eject-end
    compact: true,
    sourceType: "unambiguous",
    cacheDirectory: true,
  },
};

module.exports = {
  fileLoader,
  urlLoader,
  svgLoader,
  lessLoaderDev,
  lessLoaderProd,
  babelLoader,
  cssLoaderProd,
};
