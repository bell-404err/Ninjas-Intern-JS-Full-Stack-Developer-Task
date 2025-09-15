import express from 'express';
import cors from 'cors';
import superheroRouter from './modules/superhero/superhero.routes.js';
import { multerErrorHandler } from './modules/middlewares/errors/multer-error.middleware.js';
import { generalErrorHandler } from './modules/middlewares/errors/general-error.middleware.js';
import { notFoundHandler } from './modules/middlewares/errors/not-found.middleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', superheroRouter);
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use(notFoundHandler);
app.use(multerErrorHandler);
app.use(generalErrorHandler);

export default app;