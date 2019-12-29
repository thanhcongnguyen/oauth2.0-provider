import { AuthenticateService } from '../services/authenticate.service';
const auth = new AuthenticateService();

export class AuthenticateController {
    createToken(req, res, next){
        let {
            client_id,
            client_secret,
            grant_type,
            code,
            redirect_uri
        } = req.body;
        auth.createToken({
            client_id,
            client_secret,
            grant_type,
            code,
            redirect_uri
        }).then( res => {

        }).catch( err => {

        });
    }
}