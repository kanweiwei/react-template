const fs = require("fs");
const { resolve } = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => resolve(appDirectory, relativePath);

module.exports = {
  appIndex: resolveApp("src/index.tsx"),
  publicPath: "./",
  appHtml: resolveApp("public/index.html"),
  appBuild: resolveApp("build"),
  appTsConfig: resolveApp("tsconfig.json"),
};
