var express = require('express');
var router = express.Router();

//import middleware
import { errorMiddleware } from '../middlewares/errorMiddleware';

//import controller
import { ProviderController } from '../controllers/provider.cotroller';
const provider = new ProviderController();


//routes
router.post('/create', provider.create);
router.use(errorMiddleware);

module.exports = router;
