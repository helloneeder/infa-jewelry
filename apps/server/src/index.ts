import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { initDb } from './db/index.js';
import { authRoutes } from './routes/auth.js';
import { productRoutes } from './routes/products.js';
import { categoryRoutes } from './routes/categories.js';
import { errorHandler } from './middleware/error.js';
import { ADMIN_COOKIE_NAME } from '@infa/shared';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// DB
initDb();

// Middleware
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, data: { status: 'alive', cookieName: ADMIN_COOKIE_NAME } });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server] running on http://localhost:${PORT}`);
});
