import { Router } from "express";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../controllers/product.controller";
import { validateRequest } from "../middlewares/validateRequest";
import schema from "../validations/product.validation";

const productRouter = Router();

// trả về danh sách sản phẩm
productRouter.get("/", getAll);
productRouter.get("/:id", getOne);
productRouter.post("/", validateRequest(schema), createOne);
productRouter.put("/:id",validateRequest(schema), updateOne);
productRouter.delete("/:id", deleteOne);

// /products

export default productRouter;
