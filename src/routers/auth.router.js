import { Router } from 'express';
import { signup, signin } from '../controllers/auth.controller';

const authRouter = Router();
// localhost:3000/api/auth/register
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
export default authRouter;