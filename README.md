# webpack4-build-process

## 参考文档
* [Webpack揭秘——走向高阶前端的必经之路](https://juejin.cn/post/6844903685407916039)

## tapable (webpack核心库)
> 使用tapable来实现plugins的binding和applying，tapable是一个用于事件发布订阅执行的可插拔架构，tapable就是webpack用来创建勾子的库
  * sync
     - SyncHook 同步的串行，不关心监听函数的返回值
     - SyncBailHook 同步的串行，只要监听函数有一个返回值不为null，就跳过剩下所有的函数
     - SyncWaterfallHook 同步的串行，上一个监听函数的返回值可以传给下一个函数参数
     - SyncLoopHook 同步的循环，监听函数触发时的返回值true，就反复执行这个函数
  * async
     - AsyncParalleHook 异步的串行，不关心监听函数的返回值
     - AsyncParalleBailHook 异步的串行，只要监听函数有一个返回值不为null，就跳过剩下所有的函数
     - AsyncSeriesHook
     - AsyncSeriesBailHook
     - AsyncSeriesWaterfallHook 异步的串行，上一个监听函数的返回值可以传给下一个函数参数
     
     ```js
     class Compiler extends Tapable {
	    constructor(context) {
		    super();
            this.hooks = {
                shouldEmit: new SyncBailHook(["compilation"]),
                // ...
            }
        }
        // ...
    }
     ```


## webpack构建流程
> Compiler --> Compilation --> Chunk --> Module --> runloaders --> Dependency --> Template
  1. **初始化-compiler**
     - 读取webpack配置参数，合并参数，获得complier实例：`new Complier | class Compiler extends Tapable`
     - 加载plugins：`plugin.apply(compiler)`，注册hooks事件
     - 开始构建：`compiler.run `
  2. **编译-compilation**
     - complier创建compilation，compiler把构建工作交给compilation干
     - 创建chunk实例，chunk实例创建module
     - 从entry出发，针对每一个module调用loader翻译文件内容，compilation.buildModule --> run loaders
     - loader处理完后，并且使用Parser实例找出module的依赖（使用acorn解析ast），然后递归加载依赖执行(run loader && 找出依赖)
     - 使用module和dependency管理代码模块相互关系
  3. **chunk**
     - 将编译出的module组合成chunk，就是打包后的代码
  3. **输出-template**
     - 使用template基于compilation的数据生成结果代码
     - 将chunk转换成文件，输出到文件系统中


## 关键类

### 1.Compiler: `class Compiler extends Tapable {}`
* compiler保存整个webpack核心编译结果
* 可以用来访问webpack的主环境


### 2.Compilation: `class Compilation extends Tapable {}`
* 是每一次的构建结果，代表了一次资源版本构建，生成当前构建版本的chunk流
* 当在开发环境时，每当检测到一个文件变化，就会创建一个新的compilation，从而生成新的编译资源
* 一个compilation对象表现了当前的模块资源、编译生成资源、变化的文件，以及被跟踪依赖的状态信息
* 提供关键步骤的勾子回调
* 用来管理每次的编译结果chunk，chunk是根据module组合而成


### 3.Chunk: `class Chunk {}`
* 用于表示chunk的类，构建时需要的chunk对象由Compilation创建后保存管理


### 4.Module: `class Module extends DependenciesBlock {}`
* 用于表示代码模块的基础类
* 关于代码模块的所有信息都会存储在module实例中，例如dependcies记录代码模块的依赖等
* 当module实例被创建后，重要的一个步骤是执行compilation.buildModule这个方法，里面会调用module.build()来创建module实例需要的东西，然后调用loader，执行对应的loader，将代码源码内容--交由配置中指定的loader处理后，再把处理后的结果保存起来


### 5.Parser: `class Parser extends Tapable {}`
* 基于acorn生成语法树，解析出代码模块的依赖关系


### 6.Dependency: `class Dependency {}`
* 解析时用于保存代码模块对应关系的依赖使用对象
* module实例执行build方法完成对应loader时，处理完模块代码自身的转换后，继续调用parser实例来解析自身依赖模块，解析后的结果放在module.dependencies中
* 首先保存的是依赖路径，后续会经由compication.processModuleDependencies方法，再来处理各个依赖模块，递归的去建立整个依赖

### 7.Template: `class Template {}`
> 用于生成最终代码要使用的代码模板，
> 主要template类：/lib/MainTemplate.js