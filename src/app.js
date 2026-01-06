import express from "express";
const app = express();

app.get("/", () => {
    console.log("Home page");
});
app.listen(3000, () => {
    console.log("Server đang chạy cổng 3000");
});
