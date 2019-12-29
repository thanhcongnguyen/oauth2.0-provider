import { UserService } from '../services/user.service';
import { ValidationError } from '../middlewares/errors';
import { hostname } from '../configs/constants';
const user = new UserService();

export class UserController{
    register(req, res, next){
        const { phone , email, address, firstName, lastName, password } = req.body;
        const file = req.file;
        if(!file){
            throw new ValidationError('please choose avatar!');
        }
		user.register({
			phone,
            password,
            email,
            address,
            firstName,
            lastName,
            avatar: hostname + file.filename
		}).then( user => {
			res.status(200).send({
				data: {
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    avatar: user.avatar
                },
				status: true
			});
		}).catch(err => {
			next(err);
		});

    }
    
    login(req, res, next){
        const { response_type, client_id, redirect_uri, scope, state } = req.query;
        const { email, password } = req.body;
        return user.login({
            email,
            password,
            response_type,
            client_id,
            redirect_uri,
            scope,
            state
        }).then( user => {
            res.status(200).send({
                data:{
                    code: user.code,
                    state: user.state
                },
                status: true
            });
        }).catch( err => {
            next(err);
        });

    }

    getUserInfo(req, res, next){
        const access_token  = req.header['authorization'];
        
    }
}