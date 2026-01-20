import Product from "../models/product.model";
import { asyncHandler } from "../utils/asyncHandler";



// Lấy danh sách
export const getAll = asyncHandler(async (req, res) => {
    const products = await Product.find();
    return products;
})
// trả về 1 sản phẩm
export const getOne = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "không có sản phẩm nào!",
        });
    }
    return product;
})
// Thêm sản phẩm
export const createOne = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    return product;
})
// Xóa sản phẩm
export const deleteOne = asyncHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    return {
        message: "Xóa sản phẩm thành công",
    }
})
// cập nhật sản phẩm
export const updateOne = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return product
})
