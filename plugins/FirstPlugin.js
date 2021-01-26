// <https://www.webpackjs.com/concepts/plugins/>
// 1. 插件一定要有apply
// 2. 插件里面complier
// 3. complier -> 留勾子 -> 给外界留下一个可以注册的接口
// 4. 该执行的时候定位的插件的时机给执行了


const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;