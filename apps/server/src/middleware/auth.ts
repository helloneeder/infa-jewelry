import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ADMIN_COOKIE_NAME, ApiErrorSchema } from '@infa/shared';

declare global {
  namespace Express {
    interface Request {
      admin?: { id: number; username: string };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'infa-dev-secret-change-me';

export function signToken(payload: { id: number; username: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[ADMIN_COOKIE_NAME];
  if (!token) {
    return res.status(401).json({
      ok: false,
      error: { code: 'UNAUTHORIZED', message: '未登录' },
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string };
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({
      ok: false,
      error: { code: 'UNAUTHORIZED', message: '登录已过期' },
    });
  }
}
