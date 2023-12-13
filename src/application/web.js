import express from 'express';
import publicRouter from '../routes/public-api.js';
import errorMiddleware from '../middleware/error-middleware.js';
import userRouter from '../routes/api.js';

const web = express();
export { web };
web.use(express.json());
web.use(express.urlencoded({ extended: false }));
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
