const pluginName = 'HtmlAfterWebpckPlugin';

class HtmlAfterWebpckPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            // html-webpack-plugin-before-html-processing
            // 这里是htmlPlugin还没有把文件吐完之前执行的勾子方法
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName, htmlPluginData => {
                const result = htmlPluginData.assets.js;
                let _html = htmlPluginData.html;
                console.log('🍌 🍪  🍌 🍪  🍌 🍪 ');
                _html = _html.replace("<!--injectjs-->", `<script src="/${result}"></script>`);
                htmlPluginData.html = _html;
            });
        });
    }
}

module.exports = HtmlAfterWebpckPlugin;