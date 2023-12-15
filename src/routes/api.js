import express from 'express';
import userController from '../controller/userController.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import contactController from '../controller/contactController.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.getUserByIdHandler);
userRouter.put('/api/users/current', userController.updateUserByIdHandler);
userRouter.put('/api/users/logout', userController.userLogoutHandler);

// Contact API
userRouter.post('/api/contact', contactController.addContactHandler);
userRouter.get('/api/contact/:id', contactController.getContactByIdHandler);
userRouter.put('/api/contact/:id', contactController.updateContactHandler);
userRouter.delete('/api/contact/:id', contactController.deleteContactHandler);

export default userRouter;
