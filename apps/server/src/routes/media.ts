import { Router } from 'express';
import multer, { MulterError } from 'multer';
import { getDb } from '../db/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { ok, fail } from '../middleware/error.js';
import {
  MediaUpdateSchema,
  PaginationQuerySchema,
  type MediaAsset,
} from '@infa/shared';
import {
  ensureUploadDir,
  saveUploadedFile,
  deleteUploadedFile,
  UploadError,
} from '../utils/upload.js';

export const mediaRoutes = Router();
export const uploadRoutes = Router();

// 内存存储，我们自己写磁盘
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

function rowToMedia(row: any): MediaAsset {
  return {
    id: row.id,
    url: row.url,
    filename: row.filename,
    size: row.size,
    mimeType: row.mime_type,
    alt: row.alt || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * 检查图片是否被产品引用
 */
function isMediaReferenced(mediaId: number): boolean {
  const db = getDb();
  const products = db.prepare('SELECT images_json FROM products').all() as any[];
  for (const p of products) {
    try {
      const images = JSON.parse(p.images_json || '[]');
      if (images.some((img: any) => img.id === mediaId)) return true;
    } catch { /* ignore */ }
  }
  return false;
}

// 包装 multer 中间件，捕获其错误（如文件超限）返回正确 HTTP 状态
function multerWrap(multerMiddleware: any) {
  return (req: any, res: any, next: any) => {
    multerMiddleware(req, res, (err: any) => {
      if (err instanceof MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json(fail('FILE_TOO_LARGE', '文件超过 5MB 限制'));
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json(fail('TOO_MANY_FILES', '文件数量超限'));
        }
        return res.status(400).json(fail('UPLOAD_ERROR', err.message));
      }
      if (err) return next(err);
      next();
    });
  };
}

// ========== 上传：单图 ==========
uploadRoutes.post('/', authenticateToken, multerWrap(upload.single('file')), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(fail('NO_FILE', '请上传文件'));
    }
    ensureUploadDir();
    const saved = await saveUploadedFile(req.file.buffer, req.file.originalname);

    const db = getDb();
    const result = db.prepare(`
      INSERT INTO media (url, filename, size, mime_type, alt)
      VALUES (?, ?, ?, ?, ?)
    `).run(saved.url, saved.filename, saved.size, saved.mimeType, '');

    const row = db.prepare('SELECT * FROM media WHERE id = ?').get(result.lastInsertRowid);
    res.json(ok(rowToMedia(row)));
  } catch (err) {
    if (err instanceof UploadError) {
      return res.status(400).json(fail(err.code, err.message));
    }
    if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json(fail('FILE_TOO_LARGE', '文件超过 5MB 限制'));
    }
    next(err);
  }
});

// ========== 上传：批量（原子） ==========
uploadRoutes.post('/many', authenticateToken, multerWrap(upload.array('files', 20)), async (req, res, next) => {
  const savedUrls: string[] = [];
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json(fail('NO_FILE', '请上传文件'));
    }
    ensureUploadDir();

    const db = getDb();
    const results: MediaAsset[] = [];

    // 事务：要么全成功要么全回滚，文件也对应清理
    const insertStmt = db.prepare(`
      INSERT INTO media (url, filename, size, mime_type, alt)
      VALUES (?, ?, ?, ?, ?)
    `);

    db.exec('BEGIN');
    try {
      for (const file of files) {
        const saved = await saveUploadedFile(file.buffer, file.originalname);
        savedUrls.push(saved.url);
        const result = insertStmt.run(saved.url, saved.filename, saved.size, saved.mimeType, '');
        const row = db.prepare('SELECT * FROM media WHERE id = ?').get(result.lastInsertRowid);
        results.push(rowToMedia(row));
      }
      db.exec('COMMIT');
    } catch (err) {
      db.exec('ROLLBACK');
      // 回滚时清理已保存的文件
      for (const url of savedUrls) {
        deleteUploadedFile(url);
      }
      if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json(fail('FILE_TOO_LARGE', '文件超过 5MB 限制'));
      }
      throw err;
    }

    res.json(ok({ items: results, count: results.length }));
  } catch (err) {
    if (err instanceof UploadError) {
      return res.status(400).json(fail(err.code, err.message));
    }
    if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json(fail('FILE_TOO_LARGE', '文件超过 5MB 限制'));
    }
    next(err);
  }
});

// ========== 媒体列表（分页） ==========
mediaRoutes.get('/', authenticateToken, (req, res) => {
  const query = PaginationQuerySchema.parse(req.query);
  const db = getDb();

  const totalRow = db.prepare('SELECT COUNT(*) as count FROM media').get() as any;
  const total = totalRow.count;
  const totalPages = Math.ceil(total / query.pageSize);
  const offset = (query.page - 1) * query.pageSize;

  const rows = db.prepare(`
    SELECT * FROM media
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `).all(query.pageSize, offset);

  res.json(ok({
    items: rows.map(rowToMedia),
    total,
    page: query.page,
    pageSize: query.pageSize,
    totalPages,
  }));
});

// ========== 更新 alt ==========
mediaRoutes.put('/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const body = MediaUpdateSchema.parse(req.body);
  const db = getDb();

  const existing = db.prepare('SELECT * FROM media WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json(fail('NOT_FOUND', '媒体不存在'));
  }

  db.prepare(`
    UPDATE media SET alt = ?, updated_at = datetime('now') WHERE id = ?
  `).run(body.alt, id);

  const row = db.prepare('SELECT * FROM media WHERE id = ?').get(id);
  res.json(ok(rowToMedia(row)));
});

// ========== 删除（无引用才删） ==========
mediaRoutes.delete('/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const db = getDb();

  const existing = db.prepare('SELECT * FROM media WHERE id = ?').get(id) as any;
  if (!existing) {
    return res.status(404).json(fail('NOT_FOUND', '媒体不存在'));
  }

  if (isMediaReferenced(id)) {
    return res.status(409).json(fail('IN_USE', '该图片仍被产品引用，无法删除'));
  }

  // 删文件 + 删记录
  deleteUploadedFile(existing.url);
  db.prepare('DELETE FROM media WHERE id = ?').run(id);

  res.json(ok({ success: true }));
});
