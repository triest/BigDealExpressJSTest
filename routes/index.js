var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Users list' });
 // res.json({});
});

router.get('/add', function(req, res, next) {
    res.render('add', { title: 'Users list' });
});



router.get('/test', function(req, res, next) {
  //console.log("tst")
  debug(body);
  const https = require('https');

  https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    //console.log(data)
    console.log(JSON.stringify(data).explanation)
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
});

module.exports = router;
