import { Router } from 'express';
import { getDb } from '../db/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { ok, fail } from '../middleware/error.js';
import {
  CategoryCreateSchema,
  CategoryUpdateSchema,
  type Category,
} from '@infa/shared';

export const categoryRoutes = Router();

function rowToCategory(row: any): Category {
  return {
    id: row.id,
    name: {
      'zh-CN': row.name_zh_cn,
      'zh-TW': row.name_zh_tw,
      'en': row.name_en,
    },
    sort: row.sort,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// List all
categoryRoutes.get('/', (_req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM categories ORDER BY sort ASC, id DESC').all();
  res.json(ok(rows.map(rowToCategory)));
});

// Create
categoryRoutes.post('/', authenticateToken, (req, res) => {
  const body = CategoryCreateSchema.parse(req.body);
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO categories (name_zh_cn, name_zh_tw, name_en, sort)
    VALUES (?, ?, ?, ?)
  `).run(body.name['zh-CN'], body.name['zh-TW'], body.name['en'], body.sort);

  const row = db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(rowToCategory(row));
});

// Update
categoryRoutes.put('/:id', authenticateToken, (req, res) => {
  const body = CategoryUpdateSchema.parse(req.body);
  const db = getDb();
  const id = Number(req.params.id);

  const existing = db.prepare('SELECT id FROM categories WHERE id = ?').get(id);
  if (!existing) return res.status(404).json(fail('NOT_FOUND', '分类不存在'));

  const fields: string[] = [];
  const values: any[] = [];
  if (body.name) {
    fields.push('name_zh_cn = ?', 'name_zh_tw = ?', 'name_en = ?');
    values.push(body.name['zh-CN'], body.name['zh-TW'], body.name['en']);
  }
  if (body.sort !== undefined) {
    fields.push('sort = ?');
    values.push(body.sort);
  }
  fields.push("updated_at = datetime('now')");
  values.push(id);

  db.prepare(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`).run(...values);
  const row = db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
  res.json(ok(rowToCategory(row)));
});

// Delete
categoryRoutes.delete('/:id', authenticateToken, (req, res) => {
  const db = getDb();
  const id = Number(req.params.id);
  db.prepare('DELETE FROM categories WHERE id = ?').run(id);
  res.json(ok({ success: true }));
});
