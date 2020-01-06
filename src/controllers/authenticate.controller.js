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
        }).then( response  => {
            res.status(200).send({
				data: {
                    access_token: response.access_token,
                    token_type: response.token_type,
                    expires_in: response.expires_in,
                    refresh_token: response.refresh_token,
                    scope: response.scope,
                },
				status: true
			});
        }).catch( err => {
            next(err);
        });
    }
}