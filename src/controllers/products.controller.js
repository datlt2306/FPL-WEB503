import Product from '../models/products.model';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) return res.json({
            message: "Không có sản phẩm nào!"
        })
        return res.json(products)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.json({
            message: "Sản phẩm không tồn tại!"
        })
        return res.json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(201).json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(201).json({
            message: "Xóa sản phẩm thành công!"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}