var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
//import routes
var usersRouter = require('./src/routes/user.route');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//use routes
app.use('/users', usersRouter);
module.exports = app;
