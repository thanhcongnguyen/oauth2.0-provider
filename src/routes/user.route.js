import express from 'express';
import joi from 'joi';
import { userController } from '../controllers/user.controller';
import { validateRequest } from '../components/middlewares';

const router = express.Router();
const user = new userController();

router.post(
	'/login',
	user.login
);

router.post(
	'/register',
	validateRequest({
		bodySchema:{
			password: joi.string().required(),
			phone: joi.string().regex(/^[0-9]{7,11}$/),
		}
	}),
	user.register
);


export default router;
