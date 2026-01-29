import { Router } from 'express';
import { createOne, relatedProduct } from '../controllers/category.controller';


const cateRouter = Router();
cateRouter.get(`/:id/products`, relatedProduct);
cateRouter.post(`/`, createOne);
export default cateRouter;