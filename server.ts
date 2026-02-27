import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('grocery.db');

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    categoryId INTEGER,
    price REAL NOT NULL,
    originalPrice REAL,
    weight TEXT,
    image TEXT,
    deliveryTime TEXT DEFAULT '8 MINS',
    FOREIGN KEY(categoryId) REFERENCES categories(id)
  );
`);

// Seed Data if empty
const categoriesCount = db.prepare('SELECT count(*) as count FROM categories').get() as { count: number };
if (categoriesCount.count === 0) {
  const insertCategory = db.prepare('INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)');
  const insertProduct = db.prepare('INSERT INTO products (name, categoryId, price, originalPrice, weight, image, deliveryTime) VALUES (?, ?, ?, ?, ?, ?, ?)');

  const categories = [
    { name: 'Vegetables & Fruits', slug: 'veg-fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=100&q=80' },
    { name: 'Dairy & Breakfast', slug: 'dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=100&q=80' },
    { name: 'Munchies', slug: 'munchies', image: 'https://images.unsplash.com/photo-1621939514649-28b12e81658b?auto=format&fit=crop&w=100&q=80' },
    { name: 'Cold Drinks', slug: 'drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=100&q=80' },
    { name: 'Instant Food', slug: 'instant', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=100&q=80' },
  ];

  categories.forEach((cat) => {
    const info = insertCategory.run(cat.name, cat.slug, cat.image);
    const catId = info.lastInsertRowid;

    // Add dummy products for each category
    for (let i = 1; i <= 6; i++) {
      insertProduct.run(
        `${cat.name} Item ${i}`,
        catId,
        Math.floor(Math.random() * 200) + 20,
        Math.floor(Math.random() * 50) + 220,
        '500g',
        `https://picsum.photos/seed/${cat.slug}${i}/200/200`,
        '8 MINS'
      );
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/categories', (req, res) => {
    const stmt = db.prepare('SELECT * FROM categories');
    const categories = stmt.all();
    res.json(categories);
  });

  app.get('/api/products', (req, res) => {
    const { categoryId } = req.query;
    let stmt;
    if (categoryId) {
      stmt = db.prepare('SELECT * FROM products WHERE categoryId = ?');
      res.json(stmt.all(categoryId));
    } else {
      stmt = db.prepare('SELECT * FROM products');
      res.json(stmt.all());
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving (placeholder for now)
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
