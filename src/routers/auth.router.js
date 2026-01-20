import { Router } from 'express';
import { register } from '../controllers/auth.controller';

const authRouter = Router();
// localhost:3000/api/auth/register
authRouter.post('/register', register)


export default authRouter;