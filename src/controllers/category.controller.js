import Category from "../models/category.model";
import Product from "../models/product.model";
import { asyncHandler } from "../utils/asyncHandler";

export const createOne = asyncHandler(async (req, res) => {
    const category = await Category.create(req.body);
    return category;
});
export const getOne = asyncHandler(async (req, res) => {
    const categoy = await Category.findById(req.params.id);
    return category;
});

export const relatedProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({ categoryId: req.params.id })
        .populate('categoryId', 'name _id')
    return products
});