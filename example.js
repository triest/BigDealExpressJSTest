function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(ms);
    }, ms);
  });
}

(async function () {
  // console.log(sleep(100))
  // sleep(100).then(result => console.log(result));

  console.log(sleep(100));
  console.log(await sleep(100));
})();
