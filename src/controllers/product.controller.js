import Product from "../models/product.model";
import { asyncHandler } from "../utils/asyncHandler";
export const getAll = asyncHandler(async (req, res) => {
    const products = await Product.find();
    return products;
});
export const getOne = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            messsage: "Không có sản phẩm"
        })
    }
    return product;
});
export const createOne = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    return product;
});

export const deleteOne = asyncHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    return { success: true }
})

export const updateOne = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return product;
})