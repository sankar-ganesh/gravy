/*
 *  Use Generate Function to produce fibonacci series
 */

function fibo(n) {
  let s1 = 0, s2 = 1;
  return function* generate() {
    while (s2 < n) {
      let temp = s2;
      yield temp;
      s2 = s1 + s2;
      s1 = temp;
    }
  };
}

var gen = fibo(100)(), k;
while (k = gen.next()) {
  if (k.done) {
    break;
  }
  console.log(k.value);
}
