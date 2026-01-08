import express from "express";
const app = express();

// router
const products = [
    { id: 1, name: "Product 1", price: 100 }, // item
    { id: 2, name: "Product 2", price: 200 }, // item
    { id: 3, name: "Product 3", price: 300 }, // item
];
app.get("/products", (req, res) => {
    return res.json(products);
});
app.get("/products/:id", (req, res) => {
    const product = products.find((item) => item.id == req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "Product not found",
        });
    }
    return res.json(product);
});

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
