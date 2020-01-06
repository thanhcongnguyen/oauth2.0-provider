var express = require('express');
var router = express.Router();

//import middleware
import { errorMiddleware } from '../middlewares/errorMiddleware';

//import controller
import { PostController } from '../controllers/post.controller';
const post = new PostController();


//routes
router.post('/share', post.share);
router.use(errorMiddleware);

module.exports = router;
