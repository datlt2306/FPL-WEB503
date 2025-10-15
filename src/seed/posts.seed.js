import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/post.model";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/wd20203";

const postsData = [
    { title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { title: "Bài viết 2", content: "Nội dung bài viết 2" },
    { title: "Bài viết 3", content: "Nội dung bài viết 3" },
    { title: "Bài viết 4", content: "Nội dung bài viết 4" },
    { title: "Bài viết 5", content: "Nội dung bài viết 5" },
    { title: "Bài viết 6", content: "Nội dung bài viết 6" },
    { title: "Bài viết 7", content: "Nội dung bài viết 7" },
    { title: "Bài viết 8", content: "Nội dung bài viết 8" },
    { title: "Bài viết 9", content: "Nội dung bài viết 9" },
    { title: "Bài viết 10", content: "Nội dung bài viết 10" },
];

const seedPosts = async () => {
    await mongoose.connect(MONGODB_URI);

    try {
        await Post.insertMany(postsData);
        console.log("✅ Đã chèn 10 bài viết vào database");
    } catch (error) {
        console.error("❌ Lỗi khi seed dữ liệu:", error);
    } finally {
        await mongoose.connection.close();
    }
};

seedPosts();
