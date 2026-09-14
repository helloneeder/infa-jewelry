import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('[error]', err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      ok: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '参数验证失败',
        details: err.flatten().fieldErrors,
      },
    });
  }

  res.status(500).json({
    ok: false,
    error: { code: 'INTERNAL_ERROR', message: '服务器内部错误' },
  });
}

export function ok<T>(data: T) {
  return { ok: true as const, data };
}

export function fail(code: string, message: string, details?: Record<string, unknown>) {
  return { ok: false as const, error: { code, message, details } };
}
