const products = [
    { id: 1, name: "Product 1", price: 100 }, // product
    { id: 2, name: "Product 2", price: 200 }, // product
    { id: 3, name: "Product 3", price: 300 }, // product
];

// Lấy danh sách
export const getAll = (req, res) => {
    return res.json(products);
};
// trả về 1 sản phẩm
export const getOne = (req, res) => {
    const product = products.find((product) => product.id == req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "Khoong tim thay san pham",
        });
    }
    return res.json(product);
};
// Thêm sản phẩm
export const createOne = (req, res) => {
    const product = { id: products.length + 1, ...req.body }; // spread operator
    products.push(product);
    return res.status(201).json(product);
};
// Xóa sản phẩm
export const deleteOne = (req, res) => {
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Products not found" });
    products.splice(index, 1);
    return res.json({ success: true });
};
// cập nhật sản phẩm
export const updateOne = (req, res) => {
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
};
