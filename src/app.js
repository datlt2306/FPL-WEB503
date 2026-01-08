import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

// khai báo router
const products = [
    { id: 1, name: "Product 1", price: 100 }, // product
    { id: 2, name: "Product 2", price: 200 }, // product
    { id: 3, name: "Product 3", price: 300 }, // product
];

// trả về danh sách sản phẩm
app.get("/products", (req, res) => {
    return res.json(products);
});
// Trả về chi tiết 1 sản phẩm
app.get("/products/:id", (req, res) => {
    // trả về 1 sản phẩm
    const product = products.find((product) => product.id == req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "Khoong tim thay san pham",
        });
    }
    return res.json(product);
});

// khởi tạo server cổng 3000
app.listen(3000, () => {
    console.log("Server đang chạy cổng 3000");
});
