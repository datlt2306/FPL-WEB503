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

export const deleteOne = (req, res) => {
    try {
        const index = products.findIndex((item) => item.id === req.params.id);
        if (index == -1) {
            return res.json({
                message: "Product Not Found",
            });
        }

        products.splice(index, 1);

        return res.json({
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const updateOne = (req, res) => {
    try {
        const product = products.find((item) => item.id === Number(req.params.id));
        if (!product) {
            return res.status(404).json({
                message: "Product Not found",
            });
        }
        // { name: "Sản phẩm 5 update", price: 600}
        const { name, price } = req.body;

        product.name = name || product.name;
        product.price = price || product.price;

        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
