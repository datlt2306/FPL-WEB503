import express from "express";
const app = express();

// Middleware
app.use(express.json());

// Validation helper function
const validateProduct = (data, isUpdate = false) => {
    const errors = {};
    
    if (!isUpdate || data.name !== undefined) {
        if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
            errors.name = "Name is required and must be a non-empty string";
        }
    }
    
    if (!isUpdate || data.price !== undefined) {
        if (data.price === undefined || typeof data.price !== 'number' || data.price <= 0) {
            errors.price = "Price is required and must be a positive number";
        }
    }
    
    // For update, at least one field must be provided
    if (isUpdate && data.name === undefined && data.price === undefined) {
        errors.general = "At least one field (name or price) must be provided for update";
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// router
const products = [
    { id: 1, name: "Product 1", price: 100 }, // item
    { id: 2, name: "Product 2", price: 200 }, // item
    { id: 3, name: "Product 3", price: 300 }, // item
];

// GET /products - Lấy danh sách tất cả sản phẩm
app.get("/products", (req, res) => {
    try {
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// GET /products/:id - Lấy chi tiết sản phẩm theo ID
app.get("/products/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = products.find((item) => item.id === id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// POST /products - Tạo sản phẩm mới
app.post("/products", (req, res) => {
    try {
        const validation = validateProduct(req.body, false);
        if (!validation.isValid) {
            return res.status(400).json({
                message: "Validation error",
                errors: validation.errors
            });
        }
        
        // Generate ID tự động
        const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
        const newId = maxId + 1;
        
        // Tạo sản phẩm mới
        const newProduct = {
            id: newId,
            name: req.body.name.trim(),
            price: Number(req.body.price)
        };
        
        products.push(newProduct);
        
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// PUT /products/:id - Cập nhật sản phẩm
app.put("/products/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = products.find((item) => item.id === id);
        
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        
        const validation = validateProduct(req.body, true);
        if (!validation.isValid) {
            return res.status(400).json({
                message: "Validation error",
                errors: validation.errors
            });
        }
        
        // Update product
        if (req.body.name !== undefined) {
            product.name = req.body.name.trim();
        }
        if (req.body.price !== undefined) {
            product.price = Number(req.body.price);
        }
        
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// DELETE /products/:id - Xóa sản phẩm
app.delete("/products/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const index = products.findIndex((item) => item.id === id);
        if (index === -1) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        // Xóa sản phẩm
        products.splice(index, 1);
        return res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
