import { Router } from 'express';

const postsRouter = Router();

let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];

postsRouter.get('/', (req, res) => {
    try {
        return res.json({
            data: posts
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

});
postsRouter.get('/:id', (req, res) => {
    try {
        console.log(typeof req.params.id)
        const post = posts.find(post => post.id === parseInt(req.params.id));
        if (!post) return res.status(404).json({
            message: "Bài viết không tồn tại"
        })
        return res.json(post);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

});
postsRouter.post('/', (req, res) => {
    return res.json({
        message: "Thêm mới bài viết!"
    })
});
postsRouter.put('/:id', (req, res) => {
    return res.json({
        message: "Cập nhật bài viết!"
    })
});
postsRouter.delete('/:id', (req, res) => {
    return res.json({
        message: "Xóa bài viết!"
    })
});

export default postsRouter;