## AST 静态语法分析树 abstract syntax tree

 * parse-转成ast
 * transform-处理ast
 * output-输出ast

### AST仓库
 * acorn-webpack
 * uglify-js
 * babylon-babel
    + 把代码转换es6的ast语法树
    + 再转成es5的ast

### AST语法
  * type-当前语句类型：变量声明语句
  * kind-变量声明关键字：var
  * declaration-声明的内容数组，里面的每一项也是一个对象
    + type-描述该语句的类型
    + id-描述变量名称的对象
        - type-定义
        - name-变量名字
    + init-初始化变量值得对象
        - type-值类型
        - value-值
        - raw-原代码


