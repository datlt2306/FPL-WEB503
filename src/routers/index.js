import { Router } from "express";
import productRouter from "./product.router";
import authRouter from "./auth.router";

const router = Router();

// define routers
// PUT localhost:3000/api/products
router.use("/products", productRouter);
router.use("/auth", authRouter);
export default router;
