import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postsRouter from "./routers/posts";
dotenv.config();

const app = express();

// Kết nối db
// mongoose.connect(`mongodb://localhost:27017/web503`);
// middleware

app.use(express.json());

// router
app.use('/api', postsRouter)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\x1b[34m\x1b[1mServer is running on port ${port}\x1b[0m`);
    console.log(`\x1b[36m\x1b[4m\x1b]8;;${url}\x1b\\${url}\x1b]8;;\x1b\\\x1b[0m`);
});
