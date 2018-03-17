var express = require('express');
var router = express.Router();
var db = require('../models');
var path = require('path');

router.get('/', function(req, res){
  // res.sendFile(path.join(__dirname, '../views/html/index.html'));
  res.render('index');
});

module.exports = router;
