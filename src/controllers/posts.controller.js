import Post from "../models/posts.model"

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.json({
            data: posts
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}
export const getOne = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({
            message: "Bài viết không tồn tại"
        })
        return res.json(post);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}
export const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({
            message: "Bài viết không tồn tại"
        })
        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa bài viết thành công!"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}