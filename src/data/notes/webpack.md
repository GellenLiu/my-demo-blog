
# webpack

entry里面配置入口文件

output里面配置出口文件和路径

rules里面的test用正则去匹配相关文件，然后use属性配置相关的loader，按顺序调用。

loader的主要作用是将css、图片、sass等其他文件，解析成js文件

file-loader和Url-loader可以接收任何文件，比如字体文件

plugins配置插件，数组里面放插件对象，会自动执行插件的apply方法。

编写插件：一个class，构造函数（参数），apply方法（会自动调用该方法），module.exports = xxx。

detool属性配置source-map，可以追踪错误代码

loader是处理文件的，插件相当于一些自动化脚本

tree shaking: 自动删除未引用的代码。

vue-cli内部只能通过vue.config.js配置，configWebpack属性。和chainWebpack链式维护。



## webpack打包

webpack是一个前端资源加载/打包工具。

Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

webpack 命令执行后，会默认载入当前目录的 webpack.config.js 文件。

```javascript
module.exports = {
    entry: "./runoob1.js",//输入要打包的文件
    output: {
        path: __dirname,
        filename: "bundle.js"   //打包后输出的静态文件
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};
```



## css modules

通过构建工具改变css的类名，或者选择器名字来实现作用域，scoped也是。解决全局命名冲突，样式冲突，模块化。

通过webpack的css-loader来实现。


## 1、webpack了解吗

可以将多个静态资源js、css转换成一个静态资源。减少页面请求。

可以压缩代码。

webpack本身只处理js，要处理css所以还需要css-loader。等loader

使用plugins功能更强大，loader主要是打包。

这样要根据具体的情况来定


## esmodule  commonjs的区别

Commonjs的动态引入，运行时引入。require

ESmodule是静态引入，编译时引入，，import。。from

CommonJS 是一种模块规范，最初被应用于 Nodejs，成为 Nodejs 的模块规范。

ES6 modulde是后面出的

我们平时在 Webpack 中使用的 export 和 import，会经过 Babel 转换为 CommonJS 规范。在使用上的差别主要有：

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
3. CommonJs 是单个值导出，ES6 Module可以导出多个
4. CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层
5. CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined

