import express from 'express';
import userController from '../controller/userController.js';

const publicRouter = new express.Router();
publicRouter.post('/api/users', userController.registerHandler);
publicRouter.post('/api/users/login', userController.loginHandler);

export default publicRouter;
