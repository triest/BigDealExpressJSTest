function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(ms);
    }, ms);
  });
}

(async function () {
  //console.log(sleep(100))
  sleep(100).then( result=>console.log(result)
  ,
    error => {
      // вторая функция - запустится при вызове reject
      alert("Rejected: " + error); // error - аргумент reject
    })

})();
