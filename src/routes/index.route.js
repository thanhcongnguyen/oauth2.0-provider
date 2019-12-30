const express = require('express');
const router = express.Router();
//import routes
const usersRouter = require('./user.route');
const providersRouter = require('./provider.route');
const authRouter = require('./authenticate.route');

router.use('/user', usersRouter);
router.use('/provider', providersRouter);
router.use('/token', authRouter);

module.exports = router;