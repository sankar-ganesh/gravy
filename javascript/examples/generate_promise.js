/*
 *  generatify - uses generate function
 */
function generatify(replayFunction, replayCount) {
  let index = 0;
  return function* generate() {
    while (index < replayCount) {
      yield replayFunction;
      index += 1;
    }
  };
}

// callToServer - create a promise to resolve the server call
async function callToServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(200);
    }, 2000)
  });
}

// use generatify function to replay the promise
var gen = generatify(callToServer, 3)(), k;
while (k = gen.next()) {
  if (k.done) {
    break;
  }
  if (k.value) {
    let resp = await k.value();
    console.log(`Response => ${resp}`);
  }
}