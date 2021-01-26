const path = require("path");
const os = require("os");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const FirstPlugin = require("./plugins/FirstPlugin.js");
const MyPlugin = require("./plugins/MyPlugin.js");
const Listen4Myplugin = require("./plugins/Listen4Myplugin.js");

module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            loader: path.resolve("./loader/index.js")
        },
        // {
        //     test: /\.m?js$/,
        //     exclude: /(node_modules|bower_components)/,
        //     use: {
        //         loader: 'babel-loader',
        //         options: {
        //             presets: ['@babel/preset-env']
        //         }
        //     }
        // },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: 'happypack/loader?id=babel'
        },
            // {
            //     test: /\.css$/,
            //     use: 'happypack/loader?id=styles'
            // },
        ],
    },
    plugins: [
        new FirstPlugin(),
        new MyPlugin({ test: 1 }),
        new Listen4Myplugin(),

        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                // options: {
                //     presets: ['es2015']
                // }
            }],
        }),

        // new HappyPack({
        //     id: 'styles',
        //     threadPool: happyThreadPool,
        //     loaders: ['style-loader', 'css-loader', 'less-loader'],
        // }),
    ],
}