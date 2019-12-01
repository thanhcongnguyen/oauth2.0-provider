import { CRUD } from './crud';
import userService from '../services/user.service';

const user = new userService();

export class userController extends CRUD{
	register(req, res, next){
		const { phone , password } = req.body;
		user.register({
			phone,
			password
		}).then( newUser => {
			res.status(200).send({
				data: newUser,
				status: true
			});
		}).catch(err => {
			next(err);
		});

	}

	login(req, res, next){
		const { phone, password } = req.body;
		user.login({
			phone,
			password
		}).then(user =>{
			res.status(200).send({
				data: user,
				status: true
			});
		}).catch(err => {
			next(err);
		});

	}
}
