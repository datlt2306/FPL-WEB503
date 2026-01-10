import { Router } from "express";
import productRouter from "./product.router";

const router = Router();

// define routers
// PUT localhost:3000/api/products
router.use("/products", productRouter);

export default router;
