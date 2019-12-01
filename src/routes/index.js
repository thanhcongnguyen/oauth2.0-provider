import express from 'express';
import userRoute from './user.route';
import {
	apiNotFound,
	errorMiddleware
} from '../components/middlewares';
const router = express.Router();
router.use('/users', userRoute);
router.use(errorMiddleware);
router.use(apiNotFound);
export default router;
