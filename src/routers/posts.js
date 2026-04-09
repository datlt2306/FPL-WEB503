import { Router } from 'express';

const postsRouter = Router();

let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" }, // 0
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" }, // 1
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
    try {
        const { title, content } = req.body;
        const newPost = { id: posts.length + 1, title, content };
        posts.push(newPost);
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

});
postsRouter.put('/:id', (req, res) => {
    try {
        const post = posts.find(post => post.id === parseInt(req.params.id));
        if (!post) return res.status(404).json({
            message: "Bài viết không tồn tại"
        })
        const { title, content } = req.body;


        console.log(title, content);
        console.log(post);

        post.title = title || post.title;
        post.content = content || post.content;

        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
postsRouter.delete('/:id', (req, res) => {
    try {

        const index = posts.findIndex(post => post.id === parseInt(req.params.id));
        console.log(index);
        if (index === -1) return res.status(404).json({
            message: "Bài viết không tồn tại"
        })

        posts.splice(index, 1);
        return res.json({
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

export default postsRouter;