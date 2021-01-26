const { SyncHook } = require("tapable");

const pluginName = 'MyPlugin'
class MyPlugin {
    // 传入webpack config中的plugin配置参数
    constructor(options) {
        console.log('--------------开始测试自定义 tapable hook ---------------');
        console.log(pluginName, '@plugin constructor', options);
    }

    apply(compiler) {
        console.log(pluginName, '@plugin apply');

        // 实例化自定义事件
        compiler.hooks.myPlugin = new SyncHook(['data'])

        compiler.hooks.environment.tap(pluginName, () => {
            //广播自定义事件
            compiler.hooks.myPlugin.call("It's my plugin.")
            console.log('@environment');
            console.log('--------------结束测试自定义 tapable hook ---------------');
        });

        // compiler.hooks.compilation.tap(pluginName, (compilation) => {
        //     // 你也可以在compilation上挂载hook
        //     compilation.hooks.myPlugin = new SyncHook(['data'])
        //     compilation.hooks.myPlugin.call("It's my plugin.")
        // });
    }
}
module.exports = MyPlugin
