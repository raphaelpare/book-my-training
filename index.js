var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'))

app.listen(4000);
console.log('server is running');

app.get('/', function(req, res) {
  res.render('index');
});