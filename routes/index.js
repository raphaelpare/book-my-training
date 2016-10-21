var express = require('express');
var app = express.Router();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/recrutement', is_recruteur,function(req, res, next) {

  res.render('index', { title: 'Express' });
});

module.exports = app;