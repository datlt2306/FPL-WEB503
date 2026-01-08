import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

// khai báo router
const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
];

app.get("/products", (req, res) => {
    return res.json(products);
});

// khởi tạo server cổng 3000
app.listen(3000, () => {
    console.log("Server đang chạy cổng 3000");
});
