var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var app = express();
const path = require('path');

//import routes
const usersRouter = require('./src/routes/user.route');
const providersRouter = require('./src/routes/provider.route');

app.use(express.static(path.resolve('./uploads')));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());


//use routes
app.use('/user', usersRouter);
app.use('/provider', providersRouter);
module.exports = app;
