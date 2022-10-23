const path = require("path")
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  lintOnSave: false,
  publicPath:'./',
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  },
  chainWebpack: config => {
		// use show markdown file
	    config.module
	      .rule('md')
	      .test(/\.md$/)
	      .use('html-loader')
	      .loader('html-loader')
	      .end()
	      .use('markdown-loader')
	      .loader('markdown-loader')
	      .end();
	}
}
