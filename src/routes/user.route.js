var express = require('express');
var router = express.Router();

//import middleware
import { errorMiddleware } from '../middlewares/errorMiddleware';

//import multer
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + file.originalname);
  }
});
var upload = multer({ storage: storage });


//import controller
import {
  UserController
} from '../controllers/user.controller';
const user = new UserController();


//routes

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/register', upload.single('avatar'), user.register);


router.post('/login', user.login);

router.use(errorMiddleware);



module.exports = router;
