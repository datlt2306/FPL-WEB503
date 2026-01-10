const products = [
    { id: 1, name: "Product 1", price: 101 }, // item
    { id: 2, name: "Product 2", price: 200 }, // item
    { id: 3, name: "Product 3", price: 300 }, // item
];

export const getAll = (req, res) => {
    try {
        return res.json(products);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const getOne = (req, res) => {
    try {
        const product = products.find((item) => item.id === req.params.id);
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

export const createOne = (req, res) => {
    try {
        const product = { id: products.length + 1, ...req.body }; // spread operator
        products.push(product);
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
