import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getDb } from '../db/index.js';
import { authenticateToken, signToken } from '../middleware/auth.js';
import { LoginRequestSchema, ADMIN_COOKIE_NAME } from '@infa/shared';
import { ok, fail } from '../middleware/error.js';

export const authRoutes = Router();

authRoutes.post('/login', (req, res) => {
  const body = LoginRequestSchema.parse(req.body);
  const db = getDb();

  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(body.username) as
    | { id: number; username: string; password_hash: string }
    | undefined;

  if (!admin || !bcrypt.compareSync(body.password, admin.password_hash)) {
    return res.status(401).json(fail('INVALID_CREDENTIALS', '用户名或密码错误'));
  }

  const token = signToken({ id: admin.id, username: admin.username });

  res.cookie(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });

  res.json(ok({ admin: { id: admin.id, username: admin.username } }));
});

authRoutes.post('/logout', (_req, res) => {
  res.clearCookie(ADMIN_COOKIE_NAME, { path: '/' });
  res.json(ok({ success: true }));
});

authRoutes.get('/me', authenticateToken, (req, res) => {
  res.json(ok({ admin: { id: req.admin!.id, username: req.admin!.username } }));
});
