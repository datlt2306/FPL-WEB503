import express from "express";
import cors from "cors";
import router from "./routers";
const app = express();

app.use(cors());
app.use(express.json());

// khai báo router
app.use("/api", router);

// khởi tạo server cổng 3000
app.listen(3000, () => {
    console.log("Server đang chạy cổng 3000");
});
