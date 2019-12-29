const express = require('express');
const router = express.Router();


//import middleware
import { errorMiddleware } from '../middlewares/errorMiddleware';


//import controller
import { 
    AuthenticateController
} from '../controllers/authenticate.controller';
const auth = new AuthenticateController();

router.post('/', auth.createToken);
router.use(errorMiddleware);
module.exports = router;