import Product from "../models/product.model";

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const getOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product Not found",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const createOne = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const deleteOne = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        return res.json({
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const updateOne = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
