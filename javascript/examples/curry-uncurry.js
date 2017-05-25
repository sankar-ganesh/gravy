/*
 *  Curry & Uncurry
 */

var add = (a, b) => a + b

console.log(add(10, 20));

var curryAdd = (a) => ((b) => add(a, b))

console.log(curryAdd(10)(20));


var curriedAdd = (a) => (b) => a + b

console.log(curriedAdd(10)(20))

var uncurryAdd = (a, b) => curriedAdd(a)(b)

console.log(uncurryAdd(10, 20));
