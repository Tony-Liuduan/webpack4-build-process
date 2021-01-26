// <https://www.webpackjs.com/api/loaders/>
// 1. use:["xx1-loader", "xx2-loader"]
// 2. 最后的loader最早调用传入的资源
// 3. 中间的loader执行的时候，传入的就是上一个loader的执行结果
// 4. loader需要异步时: this.async() | this.callback()，loader执行时可能依赖外部I/O的结果，导致它必须是异步的方法来处理，这个需要在loader执行时使用this.asnyc()，来表示loader是异步处理的，然后使用this.callback来返回loader的处理结果
// 5. 前置勾子，loader进来前的预处理，执行顺序：xx1-loader.pitch --> xx2.loader.pitch --> xx2-loader --> xx1-loader
module.exports = function(content, map, meta) {
    console.log("my loader running");
    return content + this.data.value;
}

// 前置勾子
module.exports.pitch = function(remainRquest, preRequest, data) {
    // 前置勾子数据传递
    data.value = "123";
}

// async loasder
// module.exports = function(content, map, meta) {
//     var callback = this.async();
//     someAsyncOperation(content, function(err, result) {
//         if (err) return callback(err);
//         callback(null, result, map, meta);
//     });
// };