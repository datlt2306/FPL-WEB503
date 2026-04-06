import { Router } from 'express';

const postsRouter = Router();

// api/posts
postsRouter.get('/', (req, res) => {
    return res.json({
        message: "Danh sách bài viết!"
    })
});


export default postsRouter;