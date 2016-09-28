var express 	 = require('express');
var app			 = express();
var port 		 = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var session 	 = require('express-session');
var morgan 		 = require('morgan');
var mongoose 	 = require('mongoose');
var bodyParser 	 = require('body-parser');
var passport 	 = require('passport');
var flash 		 = require('connect-flash');
var oauth 		 = require('oauth');
var methodOverride = require('method-override');
var router 		 = express.Router();

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));

app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/views'));

app.set('view engine', 'pug');

// Routes
require('./app/routes/userRoutes.js')(app, passport);
require('./app/routes/tweetRoutes.js')(app, passport);

console.log('Magic happens on port: ' + port);
app.listen(port);