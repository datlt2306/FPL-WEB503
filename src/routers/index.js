import { Router } from 'express';
import postsRouter from "./posts.router";
import usersRouter from "./users.router";
const router = Router();

// api/posts
router.use('/posts', postsRouter);
// api/users
router.use('/users', usersRouter);


export default router;