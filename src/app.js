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
        console.log("Kết nối CSDL Thành công");
    })
    .catch(() => {
        console.log("Lỗi kết nối DB");
    });

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// 1. Kết nối cơ sở dữ liệu
// 2. Khai báo model ( schema )
// 3. Sử dụng Model trong controller
