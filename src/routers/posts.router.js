import { Router } from 'express';
import { createPost, deletePost, getAllPosts, getOne, updatePost } from '../controllers/posts.controller';

const postsRouter = Router();

postsRouter.get('/', getAllPosts);
postsRouter.get('/:id', getOne);
postsRouter.post('/', createPost);
postsRouter.put('/:id', updatePost);
postsRouter.delete('/:id', deletePost);

export default postsRouter;