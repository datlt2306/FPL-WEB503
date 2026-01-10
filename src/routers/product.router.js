import { Router } from "express";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", getAll);
productRouter.get("/:id", getOne);
productRouter.post("/", createOne);
productRouter.put("/:id", updateOne);
productRouter.delete("/:id", deleteOne);
export default productRouter;
