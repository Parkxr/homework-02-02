#####1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

答：
1、在配置文件或者shell语句中收集并合并配置参数。
2、加载插件。
3、从入口文件开始，将每一个模块进行loader编译，再找出模块中依赖的模块，在进行loader编译，直到所有的依赖模块都经过了编译过程。
4、将编译后的模块组合成chunk，再将chunk转换成文件。
5、将文件输出到output配置的路径中。


#####2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

答：
`Loader`的本质是一个函数，loader负责资源文件从输入到输出的转换。loader是一种管道的概念，对于同一个资源可以一次使用多个loader，用多个loader实现一个功能。注意，转换后的结果必须是一段JS代码。
Loader在module.rules数组里面配置，数组里面每一项都是一个对象，必须包含test和use，test是正则匹配出来的文件类型，use是要指定的loader，如果有参数要配置，需要写在options属性里。

`Plugin`可以扩展webpack的功能，在webpack运行声明周期里挂载在合适的钩子函数中，改变webpack运行的结果。webpack要求插件必须是一个函数或者是一个包含apply方法的对象。
插件在plugins 中配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

#####3、Webpack 实现 Vue 项目打包任务说明文档

首先写一个公共的配置文件，之后使用`webpack-merge`对开发环境和生产环境的配置文件进行扩展。

######公共配置文件

首先在entry中确定好入口文件，这里我只是使用单文件作为入口文件。在module的rules里配置各个loader，这里我是用到的有`vue-loader`，`css-loader`，`less-loader`，`vue-style-loader`，`file-loader`，`url-loader`。
`vue-loader`的作用就是转换vue文件，在安装并使用的过程中遇到了很多问题，比如说在安装前忘记安装vue，安装过后还需要安装对应的vueLoaderPlugin等等。
`less-loader`的作用就是编译less文件，一般需要配合`css-loader`还有`style-loader`，因为是vue，所以使用的是`vue-style-loader`，但是最后我使用的是`MiniCssExtractPlugin`插件里的loader进行css代码的压缩。
`file-loader`用来加载图片文件，还用到了`url-loader`，这个loader的作用是将图片文件转换为base64格式的，两个loader可以配合着使用，可以给`url-loader`传入指定文件大小的limit参数，如果高于该大小的图片文件就不进行base64转换，交给`file-loader`进行图片模块的转换。
插件里我用到了`html-webpack-plugin`，该插件下有一些参数属性，`template`是指定html模板，`filename`是构建后的输出的html文件名称`title`是html的title`meta`是html文件的一些属性，`favicon`可以指定站点图标。站点图标这里一开始遇到了一些问题，因为一开始忽略了`definePlugin`可以为代码注入全局成员的功能，就一直看在一个错误中，最后翻阅`html-webpack-plugin`文档，找到`favicon`参数的功能，所以就用了这个功能，其实是可以用`definePlugin`+`copy-webpack-plugin`来实现的。
以上就是公共配置文件的说明。

######生产环境配置文件

将`mode`指定为`production`。
配置`output`，指定输出路径和输出名称。
使用`CleanWebpackPlugin`

######开发环境配置文件
将`mode`指定为`development`。
`devtool`中将source-map模式设置为了`cheap-module-eval-source-map`
开启了`webpack-dev-server`，在里面配置了端口号，是否自动打开浏览器，指定静态资源路径，是否开启热更新，还配置了代理服务器。
一开始在插件里也写了课程里的删除配置文件中删除无用注释的插件，后来因为没什么用，因为不生成文件，所以最后给注释掉了。


