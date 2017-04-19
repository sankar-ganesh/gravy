/*
 *  undefined is just an arbitrary identifier. Safer to use void 0
 */

const isDefined = (function() {
  const undefined = 1;
  return function(x) {
    console.log(x);
    console.log(undefined);
    return x !== undefined;         // Use void 0 to compare with undefined
  };
})();

console.log(isDefined(undefined));  // true
