import express from 'express';
import userController from '../controller/userController.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get('/api/users/current', userController.getUserByIdHandler);

export default userRouter;
