import { Router } from 'express';

const postsRouter = Router();

postsRouter.get('/posts', (req, res) => {
    return res.json({
        message: "Danh sách bài viết!"
    })
});


export default postsRouter;