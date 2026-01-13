import Product from "../models/product.model";

// Lấy danh sách
export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};
// trả về 1 sản phẩm
export const getOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "không có sản phẩm nào!",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};
// Thêm sản phẩm
export const createOne = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({
            message: "Loi khi tao san pham",
            error: error.message,
        });
    }
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
