import express from 'express';
import cors from 'cors';

import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ success: true, message: 'API is running' }));

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
