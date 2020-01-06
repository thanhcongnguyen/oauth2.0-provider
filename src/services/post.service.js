import _ from 'lodash';
import db from '../../models';
import { ValidationError } from '../middlewares/errors';
import { OauthServer } from '../libraries/oauthServer';

export class PostService{

    create({ client_id, client_secret, redirect_uri}){
        if(!client_id || !client_secret || !redirect_uri){
            throw new ValidationError({
                error: 'invalid_request'
            });
        }
        return db.Provider.findOne({
            where: { client_id }
        }).then( client => {
            if(client){
                throw new ValidationError({
                    error: 'client exits!'
                });
            }
            return db.Provider.create({
                client_id,
                client_secret,
                redirect_uri
            });
        })
    }

    share({ content, id , created_by }){

        if(!accessToken){
            throw new AuthorizationError({
                error: 'invalid access_token'
            });
        }

        let decoded = OauthServer.verifyJWT(accessToken, 'wecantalk.vn')
        if(!decoded){
            throw new AuthorizationError({
                error: 'invalid access_token'
            })
        }
        console.log('decoded',decoded );
        if(!content || !created_by){
            throw new ValidationError({
                error: 'invalid_request'
            });
        }
        return true;
        // return db.Post.create({
        //     created_by,
        //     content
        // }).then( post => {
        //     console.log('pót', post);
        // }).catch( err => {
        //     console.log('error', error);
        // })
    }

    getPosts({ accessToken }){
        if(!accessToken){
            throw new AuthorizationError({
                error: 'invalid access_token'
            });
        }

        let decoded = OauthServer.verifyJWT(accessToken, 'wecantalk.vn')
        if(!decoded){
            throw new AuthorizationError({
                error: 'invalid access_token'
            })
        }

        return db.Post.findAll({
            where: {
                created_by: `${decoded.user_id}`
            },
            order: [
                ['id', 'DESC']
            ],
        });

    }
}


