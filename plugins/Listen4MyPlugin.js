class Listen4Myplugin {
    apply(compiler) {
        // 在 MyPlugin environment 阶段被广播
        compiler.hooks.myPlugin.tap('Listen4MyPlugin', (data) => {
            console.log('@Listen4MyPlugin', data);
        });
    }
}

module.exports = Listen4Myplugin;
