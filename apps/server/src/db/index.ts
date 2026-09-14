import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let db: Database.Database;

export function initDb() {
  const dbPath = process.env.DB_PATH || path.join(__dirname, '../../data/app.db');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Admins
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Categories
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_zh_cn TEXT NOT NULL DEFAULT '',
      name_zh_tw TEXT NOT NULL DEFAULT '',
      name_en TEXT NOT NULL DEFAULT '',
      sort INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Products
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sku TEXT NOT NULL DEFAULT '',
      name_zh_cn TEXT NOT NULL DEFAULT '',
      name_zh_tw TEXT NOT NULL DEFAULT '',
      name_en TEXT NOT NULL DEFAULT '',
      desc_zh_cn TEXT NOT NULL DEFAULT '',
      desc_zh_tw TEXT NOT NULL DEFAULT '',
      desc_en TEXT NOT NULL DEFAULT '',
      price REAL NOT NULL DEFAULT 0,
      category_id INTEGER,
      images_json TEXT NOT NULL DEFAULT '[]',
      status TEXT NOT NULL DEFAULT 'active',
      sort INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    )
  `);

  // Seed default admin
  const defaultUser = process.env.ADMIN_USERNAME || 'admin';
  const defaultPass = process.env.ADMIN_PASSWORD || 'admin123456';
  const existing = db.prepare('SELECT id FROM admins WHERE username = ?').get(defaultUser);
  if (!existing) {
    const hash = bcrypt.hashSync(defaultPass, 10);
    db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(defaultUser, hash);
    console.log(`[db] seeded default admin: ${defaultUser}`);
  }

  return db;
}

export function getDb() {
  if (!db) initDb();
  return db;
}
