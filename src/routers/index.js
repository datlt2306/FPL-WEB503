import { Router } from 'express';
import postsRouter from "./posts";
import usersRouter from "./users";
const router = Router();

// api/posts
router.use('/posts', postsRouter);
// api/users
router.use('/users', usersRouter);


export default router;