var express = require('express');
var app = express();
var path = require('path');

// CONF
var port = 4000;
// END CONF

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'));

app.listen(port);
console.log('server is running on port :' + port);

app.get('/', function(req, res) {
  res.render('index');
});