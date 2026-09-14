import { Router } from 'express';
import { getDb } from '../db/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { ok, fail } from '../middleware/error.js';
import {
  ProductCreateSchema,
  ProductUpdateSchema,
  ProductListQuerySchema,
  type Product,
  type ProductImage,
} from '@infa/shared';

export const productRoutes = Router();

function rowToProduct(row: any): Product {
  let images: ProductImage[] = [];
  try {
    images = JSON.parse(row.images_json || '[]');
  } catch { /* ignore */ }

  return {
    id: row.id,
    sku: row.sku,
    name: {
      'zh-CN': row.name_zh_cn,
      'zh-TW': row.name_zh_tw,
      'en': row.name_en,
    },
    description: {
      'zh-CN': row.desc_zh_cn,
      'zh-TW': row.desc_zh_tw,
      'en': row.desc_en,
    },
    price: row.price,
    categoryId: row.category_id,
    images,
    status: row.status,
    sort: row.sort,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// List (paginated)
productRoutes.get('/', (req, res) => {
  const query = ProductListQuerySchema.parse(req.query);
  const db = getDb();

  const conditions: string[] = [];
  const params: any[] = [];

  if (query.categoryId) {
    conditions.push('category_id = ?');
    params.push(query.categoryId);
  }
  if (query.status) {
    conditions.push('status = ?');
    params.push(query.status);
  }
  if (query.keyword) {
    conditions.push('(name_zh_cn LIKE ? OR name_en LIKE ? OR sku LIKE ?)');
    const kw = `%${query.keyword}%`;
    params.push(kw, kw, kw);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const orderBy = query.sortBy === 'price' ? 'price' : query.sortBy === 'sort' ? 'sort' : 'created_at';

  const totalRow = db.prepare(`SELECT COUNT(*) as count FROM products ${where}`).get(...params) as { count: number };
  const total = totalRow.count;

  const offset = (query.page - 1) * query.pageSize;
  const rows = db.prepare(
    `SELECT * FROM products ${where} ORDER BY ${orderBy} ${query.sortOrder} LIMIT ? OFFSET ?`
  ).all(...params, query.pageSize, offset);

  res.json(ok({
    items: rows.map(rowToProduct),
    total,
    page: query.page,
    pageSize: query.pageSize,
    totalPages: Math.ceil(total / query.pageSize),
  }));
});

// Get one
productRoutes.get('/:id', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(Number(req.params.id));
  if (!row) return res.status(404).json(fail('NOT_FOUND', '产品不存在'));
  res.json(ok(rowToProduct(row)));
});

// Create
productRoutes.post('/', authenticateToken, (req, res) => {
  const body = ProductCreateSchema.parse(req.body);
  const db = getDb();

  const result = db.prepare(`
    INSERT INTO products (sku, name_zh_cn, name_zh_tw, name_en, desc_zh_cn, desc_zh_tw, desc_en,
                          price, category_id, images_json, status, sort)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    body.sku,
    body.name['zh-CN'], body.name['zh-TW'], body.name['en'],
    body.description['zh-CN'], body.description['zh-TW'], body.description['en'],
    body.price,
    body.categoryId ?? null,
    JSON.stringify(body.images ?? []),
    body.status,
    body.sort,
  );

  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(ok(rowToProduct(row)));
});

// Update
productRoutes.put('/:id', authenticateToken, (req, res) => {
  const body = ProductUpdateSchema.parse(req.body);
  const db = getDb();
  const id = Number(req.params.id);

  const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(id);
  if (!existing) return res.status(404).json(fail('NOT_FOUND', '产品不存在'));

  const fields: string[] = [];
  const values: any[] = [];

  if (body.sku !== undefined) { fields.push('sku = ?'); values.push(body.sku); }
  if (body.name) {
    fields.push('name_zh_cn = ?', 'name_zh_tw = ?', 'name_en = ?');
    values.push(body.name['zh-CN'], body.name['zh-TW'], body.name['en']);
  }
  if (body.description) {
    fields.push('desc_zh_cn = ?', 'desc_zh_tw = ?', 'desc_en = ?');
    values.push(body.description['zh-CN'], body.description['zh-TW'], body.description['en']);
  }
  if (body.price !== undefined) { fields.push('price = ?'); values.push(body.price); }
  if (body.categoryId !== undefined) { fields.push('category_id = ?'); values.push(body.categoryId); }
  if (body.images !== undefined) { fields.push('images_json = ?'); values.push(JSON.stringify(body.images)); }
  if (body.status !== undefined) { fields.push('status = ?'); values.push(body.status); }
  if (body.sort !== undefined) { fields.push('sort = ?'); values.push(body.sort); }

  fields.push("updated_at = datetime('now')");
  values.push(id);

  db.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`).run(...values);
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  res.json(ok(rowToProduct(row)));
});

// Delete
productRoutes.delete('/:id', authenticateToken, (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM products WHERE id = ?').run(Number(req.params.id));
  res.json(ok({ success: true }));
});

// Toggle status
productRoutes.patch('/:id/toggle', authenticateToken, (req, res) => {
  const db = getDb();
  const id = Number(req.params.id);
  const row = db.prepare('SELECT status FROM products WHERE id = ?').get(id) as { status: string } | undefined;
  if (!row) return res.status(404).json(fail('NOT_FOUND', '产品不存在'));

  const newStatus = row.status === 'active' ? 'inactive' : 'active';
  db.prepare("UPDATE products SET status = ?, updated_at = datetime('now') WHERE id = ?").run(newStatus, id);
  res.json(ok({ id, status: newStatus }));
});
