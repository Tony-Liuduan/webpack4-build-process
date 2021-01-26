const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require("tapable");

// 接受一个可选参数，参数是一个 string[]
// queue = complier.hooks
let queue = new SyncHook(["name"]);

// 订阅tap
// 参数1-标识订阅函数
queue.tap("1", function(name) {
    console.log(name)
});

queue.tap("2", function(name1, name2) {
    console.log(name1, name2)
});

// 执行勾子
queue.call("webpack平锅");