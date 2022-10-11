import express from 'express';
import { apiRouter } from './api/api.router.js';

const appRouter = express.Router();
appRouter.use('/api', apiRouter);

export default appRouter;