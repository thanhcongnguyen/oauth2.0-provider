var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var app = express();

//import routes
var usersRouter = require('./src/routes/user.route');

app.use(express.static('uploads'))
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());


//use routes
app.use('/user', usersRouter);
module.exports = app;
