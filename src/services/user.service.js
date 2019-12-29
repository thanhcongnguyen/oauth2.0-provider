import _ from 'lodash';
import db from '../../models';
import { ValidationError } from '../middlewares/errors';
import { SCOPE } from '../configs/constants';
import { randomString } from '../utils/randomString';



function hashPassword(password) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

function comparePassword(password, hash) {
    const bcrypt = require('bcrypt');
    return bcrypt.compare(password, hash).then(res => {
        return res;
    }).catch(err => {
        return false;
    })
}

export class UserService {
    register({ phone, address, avatar, email, firstName, lastName, password }) {
        if (!phone || !email || !address || !firstName || !lastName || !avatar || !password) {
            throw new ValidationError();
        }
        return db.User.findOne({
            where: { email }
        }).then((user) => {
            if (user) {
                throw new ValidationError('user exists!');
            } else {
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

    login({ email, password, client_id = '', redirect_uri = '', scope = '', response_type = '', state = undefined }) {

        if (!client_id || !redirect_uri || !response_type) {
            throw new ValidationError({
                error: 'invalid_request'
            });
        }

        if (!email || !password) {
            throw new ValidationError();
        }

        return db.User.findOne({
            where: { email }
        }).then(async user => {
            if (!user) {
                throw new ValidationError({
                    error: 'user not exits!'
                })
            }
            let result = await comparePassword(password, user.password);
            if (!result) {
                throw new ValidationError({
                    error: 'invalid password!'
                });
            }

            //check response_type
            if (response_type !== 'code') {
                throw new ValidationError({
                    error: 'unsupported_response_type'
                });
            }

            //check scope
            if (scope) {
                const scopeArr = scope.split(" ");
                const resultScopeDiff = _.difference(scopeArr, SCOPE);
                if (resultScopeDiff.length > 0) {
                    throw new ValidationError({
                        error: 'invalid_scope'
                    });
                }
            }

            return db.Provider.findOne({
                where: { client_id }
            }).then(client => {

                if (!client) {
                    throw new ValidationError({
                        error: 'unauthorized_client'
                    })
                }

                if (client.redirect_uri != redirect_uri) {
                    throw new ValidationError({
                        error: 'error_uri'
                    });
                }
                return db.Code.create({
                    code: randomString(30),
                    client_id,
                    user_id: user.id
                }).then(res => {
                    return {
                        code: res.code,
                        state: state ? state : randomString(20)
                    }
                });
            });

        })
    }
}


