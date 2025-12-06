import { Router } from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
} from "../controllers/posts.controller";

const router = Router();

// Lấy danh sách bài viết
router.get("/posts", getAllPosts);
// Lấy chi tiết bài viết
router.get("/posts/:id", getPostById);
// Thêm bài viết
router.post("/posts", createPost);
// Cập nhật bài viết
router.put("/posts/:id", updatePost);
// Xóa bài viết
router.delete("/posts/:id", deletePost);
export default router;
