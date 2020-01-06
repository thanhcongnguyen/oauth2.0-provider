import { PostService } from '../services/post.service';
const post = new PostService();

export class PostController{
    share(req, res, next){
        const { content, created_by, id } = req.body;
        console.log('content', content);
        console.log('created_by', created_by);
        console.log('id', id);
        const accessToken = req.headers['authorization'];
        // console.log('accessToken', accessToken);
        return post.share({
            accessToken,
            content,
            created_by,
            id
        }).then( () => {
            res.status(200).send({
				status: true
			});
        }).catch( err => {
            next(err);
        });
    }
}