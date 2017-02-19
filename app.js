var path = require('path');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config.js');
var compiler = webpack(config);

var express = require('express');
var flash = require('connect-flash');
// You need session to use connect flash
var session = require('express-session');
var bodyParser = require('body-parser');
var routers = require('./routers/index');
var app = express();
var port = process.env.PORT || 3000;
app.use('/assets', express.static(__dirname + '/public'));
app.use(webpackMiddleware(compiler));
//app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true , limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use( session({
  saveUninitialized : true,
  secret : 'Some Secret' ,
  resave : true,
}));

var passport = require('./controllers/passport.js');
app.use( passport.initialize());
app.use( passport.session());
passport.appCallback();
app.use(flash());
app.use('/', routers);








app.listen(port, function() {
  console.log('started');
});
