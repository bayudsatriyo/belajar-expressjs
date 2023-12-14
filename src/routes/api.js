import express from 'express';
import userController from '../controller/userController.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get('/api/users/current', userController.getUserByIdHandler);
userRouter.put('/api/users/current', userController.updateUserByIdHandler);
userRouter.put('/api/users/logout', userController.userLogoutHandler);

export default userRouter;
