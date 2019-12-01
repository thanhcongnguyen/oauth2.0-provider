import bcrypt from 'bcrypt-nodejs';
import * as constants from '../configs/constants';

export function compareHash(pw,password) {
	const res = bcrypt.compareSync(pw, password);
	return res;
}

export function hashPassword(password){
	const salt = bcrypt.genSaltSync(constants.genSalt);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}
