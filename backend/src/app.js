import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import apiRouter from './routes/index.js';

const app = express();

app.use(cors({
  origin: env.nodeEnv === 'development'
    ? /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/
    : env.corsOrigin,
}));
app.use(express.json());
app.use('/api', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;