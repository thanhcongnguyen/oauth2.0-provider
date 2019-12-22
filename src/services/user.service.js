import db from '../../models';
import { ValidationError } from '../middlewares/errors';


function hashPassword(password){
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

export class UserService{
    register({ phone, address, avatar, email, firstName, lastName, password }){
        if(!phone || !email || !address || !firstName || !lastName || !avatar || !password){
            throw new ValidationError();
        }
        return db.User.findOne({
            where: { email }
        }).then((user) => {
            if(user){
                throw new ValidationError('user exists!');
            }else {
                return db.User.create({
                    phone,
                    address,
                    email,
                    firstName,
                    lastName,
                    avatar,
                    password: hashPassword(password)
                });
            }
        })
    }

    login(){
        return true;
    }
}


