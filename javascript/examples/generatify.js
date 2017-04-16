/*
 *  Generatify - uses generate function
 */

function generatify(g) {
  let index = 0;
  return function* generate() {
    while (index < g.length) {
      yield g[index];
      index += 1;
    }
  };
}

var gen = generatify([1, 2, 3, 4, 5])(), k;
while (k = gen.next()) {
  if (k.done) {
    break;
  }
  console.log(k.value);
}
