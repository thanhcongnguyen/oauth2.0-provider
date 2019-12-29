import { ProviderService } from '../services/provider.service';
const provider = new ProviderService();

export class ProviderController{
    create(req, res, next){
        const { client_id, client_secret, redirect_uri } = req.body;
        return provider.create({
            client_id,
            client_secret,
            redirect_uri
        }).then( () => {
            res.status(200).send({
				status: true
			});
        }).catch( err => {
            next(err);
        });
    }
}