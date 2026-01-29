import { Router } from "express";
import productRouter from "./product.router";
import authRouter from "./auth.router";
import cateRouter from "./category.router";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", cateRouter);
router.use('/auth', authRouter)
export default router;
