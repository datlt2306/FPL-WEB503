import Post from "../models/posts.model";

export const getAllPosts = async (req, res) => {
    const posts = await Post.find();
    return res.json(posts);
};
export const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id);
    return res.json(post);
};
export const createPost = async (req, res) => {
    const post = await Post.create(req.body);
    return res.json(post);
};
export const updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(post);
};
export const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    return res.json({
        success: "true",
    });
};
