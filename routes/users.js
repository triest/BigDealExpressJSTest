var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/add', function(req, res, next) {
  res.render('add_user', { title: 'Expresqs' });
});

router.post('/add', function(req, res, next) {
  console.log(req.body); // this is what you want           
  
});



module.exports = router;
