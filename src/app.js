import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import eventRouter from "./routers/events";
import authRouter from "./routers/auth";

dotenv.config();

const app = express();

// Kết nối db
mongoose.connect(`mongodb://localhost:27017/wd20203`);
// middleware
app.use(express.json());

// router
app.use("/api/events", eventRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
