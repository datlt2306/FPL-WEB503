import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

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

// Thêm sản phẩm
app.post("/products", (req, res) => {
    const product = { id: products.length + 1, ...req.body }; // spread operator
    products.push(product);
    return res.status(201).json(products);
});

// Cập nhật sản phẩm
app.put("/products/:id", (req, res) => {
    const product = products.find((product) => product.id == req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "Khoong tim thay san pham",
        });
    }

    // cập nhật
    const { name, price } = req.body;

    product.name = name || product.name;
    product.price = price || product.price;

    return res.json(product);
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

app.delete("/products/:id", (req, res) => {
    // tìm index của sản phẩm
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    // nếu không tìm ra index thì trả về 404
    if (index === -1) return res.status(404).json({ error: "Products not found" });

    // Xóa sản phẩm
    products.splice(index, 1);
    // trả về phía client
    return res.json({ success: true });
});

// khởi tạo server cổng 3000
app.listen(3000, () => {
    console.log("Server đang chạy cổng 3000");
});
