import _ from 'lodash';
import db from '../../models';
import { ValidationError } from '../middlewares/errors';

export class ProviderService{
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
}


