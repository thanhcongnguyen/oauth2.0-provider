import db from '../models';
import BaseService from './base.service';
import {
	AuthenticationError
} from '../components/errors';
import * as auth from '../components/auth';
import * as constant from '../configs/constants';
import * as token from '../configs';
import jwt from 'jsonwebtoken';

export default class UserService extends BaseService {
	login({ phone, password }) {
		return db.User.findOne({
			where: {
				phone
			}
		}).then( user => {
			if( !user ){
				throw new AuthenticationError('Oops! Wrong phone number');
			}
			if( auth.compareHash(password,user.password) === false ){
				throw new AuthenticationError('Oops! Wrong password');
			}
			const accessToken = this.generateToken({
				userId: user.id,
				phone: user.phone
			});
			const refreshToken = this.generateRefreshToken({
				userId: user.id,
				phone: user.phone
			});
			return {
				accessToken,
				refreshToken,
				userId: user.id,
				phone: user.phone
			};
		});
	}


	register({ password, phone }) {
		return db.User.findOne({
			where: {
				$or: [
					{
						phone
					}
				]
			},
		}).then((user) => {
			if (user) {
				throw new AuthenticationError('User exists');
			} else {
				return db.User.create({
					password: auth.hashPassword(password),
					phone, 
				});
			}
		});
	}

	

	generateToken(data) {
		const accessToken = Object.assign(token.accessTokenData, data);
		return jwt.sign(accessToken, constant.secrect);
		
	}

	generateRefreshToken(data) {
		const refreshToken = Object.assign(token.refreshTokenData, data);
		return jwt.sign(refreshToken, constant.secrect);
	}
}
