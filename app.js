var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var app = express();

//import routes
const usersRouter = require('./src/routes/user.route');
const providersRouter = require('./src/routes/provider.route');

app.set('view engine', 'ejs');
app.use(express.static('uploads'));
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());


//use routes
app.use('/user', usersRouter);
app.use('/provider', providersRouter);
app.use('/oauth/v2/authorize', (req, res, next) => {
    res.render('login', { title: 'Đăng nhập' });
});

module.exports = app;
