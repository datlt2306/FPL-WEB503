import express from "express";
import cors from "cors";
import router from "./routers";
import mongoose from "mongoose";
const app = express();

app.use(cors());
app.use(express.json());

// khai báo router
app.use("/api", router);

// kết nối database
mongoose
    .connect("mongodb://localhost:27017/WD20306")
    .then(() => {
        console.log("Kết nối database thành công");
    })
    .catch((error) => {
        console.log("Kết nối database thất bại", error);
    });
// khởi tạo server cổng 3000
app.listen(3000, () => {
    console.log("Server đang chạy cổng 3000");
});
