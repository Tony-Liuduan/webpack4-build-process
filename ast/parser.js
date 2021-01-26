const acorn = require("acorn"); // 相当于parse阶段
const walk = require("acorn-walk"); // 相当于transform阶段


// console.log(acorn.parse("var a = 1", {
//     // ...options
// }))

walk.simple(acorn.parse("let x = 10"), {
    Literal(node) {
        console.log(`Found a literal: ${node.value}`)
    }
})


/* 输出结果
Node {
  type: 'Program',
  start: 0,
  end: 9,
  body: 
   [ Node {
       type: 'VariableDeclaration',
       start: 0,
       end: 9,
       declarations: [Array],
       kind: 'var' } ],
  sourceType: 'script' }
*/

/* 
option参数：
1. 输出sourceType值是什么？module、script
    - script 严格模式，可以使用import
    - module 不用严格模式
2. locations 记录源代码的行数
*/