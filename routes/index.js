var express = require('express');
var router = express.Router();

/* GET home page. */

// respond with "hello world" when a GET request is made to the homepage
router.get('/', function (req, res) {
  res.send('hello world')
})


module.exports = router;
