const jwt = require('jsonwebtoken');
import {
    AuthorizationError
} from '../middlewares/errors';
export class OauthServer{
    static signJWT(payload, secretKey, options = {}){
        const token = jwt.sign(payload, secretKey, options);
        return token;
    }

    static verifyJWT(jwtString, secretKey){
        let decoded = null;
        
        try {
            
            decoded = jwt.verify(jwtString, secretKey);
        } catch(err) {
            throw new AuthorizationError({
                error: err.message
            });
        }
        return decoded;
    }
}