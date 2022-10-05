const path = require("path")
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  lintOnSave: false,
  publicPath:'./',
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  }
}
