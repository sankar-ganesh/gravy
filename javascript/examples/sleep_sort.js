/*
 *  Sleep Sort - A Funny Example
 */

function sleep_sort(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a);
    }, a);
  });
}

[123, 897, 234, 568, 902].forEach(async (a) => {
  let result = await sleep_sort(a);
  console.log(result);
});
