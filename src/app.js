import express from "express";
import router from "./routers";
import mongoose from "mongoose";
const app = express();

app.use(express.json());


// middlewares

app.use("/api", router);

// Kết nối cơ sở dữ liệu
mongoose
    .connect("mongodb://localhost:27017/WD20307")
    .then(() => {
        console.log("\x1b[32m✓\x1b[0m \x1b[1mKết nối CSDL Thành công\x1b[0m");
    })
    .catch(() => {
        console.log("\x1b[31m✗\x1b[0m \x1b[1mLỗi kết nối DB\x1b[0m");
    });

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\x1b[34m\x1b[1mServer is running on port ${port}\x1b[0m`);
    console.log(`\x1b[36m\x1b[4m\x1b]8;;${url}\x1b\\${url}\x1b]8;;\x1b\\\x1b[0m`);
});

// 1. Kết nối cơ sở dữ liệu
// 2. Khai báo model ( schema )
// 3. Sử dụng Model trong controller
