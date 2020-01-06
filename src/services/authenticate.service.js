import _ from 'lodash';
import db from '../../models';
import { ValidationError, AuthorizationError, AuthenticationError } from '../middlewares/errors';
import { TOKEN_KEY } from '../configs/constants';
const jwt = require('jsonwebtoken');
export class AuthenticateService {
    createToken({client_id, client_secret, grant_type, code, redirect_uri }){
        if(!client_id || !client_id || !client_secret || !grant_type || !code || !redirect_uri){
            throw new ValidationError({
                error: 'invalid_request'
            });
        }

        if(grant_type !== 'authorization_code'){
            throw new ValidationError({
                error: 'unsupported_grant_type'
            });
        }

        return db.Provider.findOne({
            where: {
                client_id,
                client_secret
            }
        }).then( provider => {
            if(!provider){
                throw new ValidationError({
                    error: 'unauthorized_client'
                });
            }

            if(redirect_uri != provider.redirect_uri){
                throw new ValidationError({
                    error: 'error_uri'
                });
            }

            return db.Code.findOne({
                where: {
                    client_id,
                    code
                }
            }).then( code => {
                if(!code){
                    throw new AuthenticationError({
                        error: 'code not exits!'
                    });
                }

                return  db.User.findOne({
                    where: { id: code.user_id }
                }).then( user => {
                    let userInfo = {
                        user_id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        avatar: user.avatar
                    };

                    let access_token = jwt.sign(
                        userInfo,
                        TOKEN_KEY
                    );

                    let refresh_token = jwt.sign(
                        { 
                            user_id: user.id 
                        }, 
                        TOKEN_KEY
                    );

                    return {
                        access_token,
                        token_type: 'bearer',
                        expires_in: 3600,
                        refresh_token,
                        scope: 'read create'
                    }
                });  
            });
        })
    }
}