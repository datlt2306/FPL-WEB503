import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routers/posts.router";
dotenv.config();

const app = express();

// Kết nối db
mongoose
    .connect(`mongodb://localhost:27017/web50301`)
    .then(() => console.log("đã nối db"))
    .catch(() => console.log("không thể nối db"));
// middleware

app.use(express.json());
// router
app.use("/api", postRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
