import { Router } from 'express';
import postsRouter from "./posts.router";
import usersRouter from "./users.router";
import productsRouter from './products.router';
import authRouter from './auth.router';
const router = Router();
router.use('/posts', postsRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);


export default router;