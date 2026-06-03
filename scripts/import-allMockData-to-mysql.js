/*
  Import public/allMockData.json into MySQL (database: webtp)
  - Creates one table per category
  - Table name mapping: '-' -> '_'
  - Writes amenities as JSON

  Usage:
    1) npm i mysql2
    2) export MYSQL_HOST=localhost MYSQL_PORT=3306 MYSQL_USER=root MYSQL_PASSWORD=...
    3) node scripts/import-allMockData-to-mysql.js
*/

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DB_NAME = 'webtp';

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_PORT = Number(process.env.MYSQL_PORT || 3306);
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';

const jsonPath = path.join(process.cwd(), 'public', 'allMockData.json');

function tableNameFromCategory(category) {
  return String(category).replace(/-/g, '_');
}

function safeString(v) {
  if (v === undefined || v === null) return null;
  return String(v);
}

function amenitiesToJson(amenities) {
  if (!amenities) return null;
  return JSON.stringify(amenities);
}

function createInsertRow(place) {
  return {
    item_key: place.key ?? null,
    slug: safeString(place.slug),
    name: safeString(place.name),
    imageUrl: safeString(place.imageUrl),
    imageBanner: safeString(place.imageBanner),
    address: safeString(place.address),
    phoneNumber: safeString(place.phoneNumber),
    email: safeString(place.email),
    website: safeString(place.website),
    content: place.content ?? null,
    lat: place.lat ?? null,
    lng: place.lng ?? null,
    map: safeString(place.map),
    iconUrl: safeString(place.iconUrl),
    path360: safeString(place.path360),
    type: place.type ?? null,
    amenities: amenitiesToJson(place.amenities),
  };
}

function getCreateTableSQL(table) {
  return `CREATE TABLE IF NOT EXISTS \`${table}\` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_key INT NULL,
    slug VARCHAR(255) NOT NULL,
    name VARCHAR(500) NOT NULL,
    imageUrl VARCHAR(1000) NULL,
    imageBanner VARCHAR(1000) NULL,
    address VARCHAR(1000) NULL,
    phoneNumber VARCHAR(200) NULL,
    email VARCHAR(200) NULL,
    website VARCHAR(500) NULL,
    content MEDIUMTEXT NULL,
    lat DOUBLE NULL,
    lng DOUBLE NULL,
    map VARCHAR(2000) NULL,
    iconUrl VARCHAR(1000) NULL,
    path360 VARCHAR(1000) NULL,
    type INT NULL,
    amenities JSON NULL,
    INDEX idx_slug (slug),
    UNIQUE KEY uniq_slug (slug)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
}

async function main() {
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Not found: ${jsonPath}`);
  }

  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(raw);

  const categories = Object.keys(data);
  console.log(`Found categories: ${categories.length}`);

  const conn = await mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: DB_NAME,
  });

  for (const category of categories) {
    const table = tableNameFromCategory(category);
    const places = data[category] || [];

    console.log(`\n==> Import category '${category}' -> table '${table}' (${places.length} rows)`);

    await conn.query(getCreateTableSQL(table));

    const rows = places.map((p) => createInsertRow(p));
    if (!rows.length) continue;

    const batchSize = 500;
    // Ensure columns match table schema (item_key is not in DB schema)
    const keys = Object.keys(rows[0]).filter((k) => k !== 'item_key');
    // Ensure we insert only columns that exist on the table.
    // If a previous run created tables with an old schema, drop & recreate the table.
    await conn.query(`DROP TABLE IF EXISTS \`${table}\``);
    await conn.query(getCreateTableSQL(table));

    for (let i = 0; i < rows.length; i += batchSize) {

      const batch = rows.slice(i, i + batchSize);


      const placeholders = batch.map(() => `(${keys.map(() => '?').join(',')})`).join(',');

      const values = [];
      for (const r of batch) {
        for (const k of keys) values.push(r[k]);
      }

      const updateAssignments = keys
        .filter((k) => k !== 'slug')
        .map((k) => `\`${k}\`=VALUES(\`${k}\`)`)
        .join(',');

      const sql = `INSERT INTO \`${table}\` (${keys.map((k) => `\`${k}\``).join(',')})
        VALUES ${placeholders}
        ON DUPLICATE KEY UPDATE
        ${updateAssignments};`;

      await conn.query(sql, values);

      process.stdout.write(`Imported ${Math.min(i + batchSize, rows.length)}/${rows.length}...\r`);
    }

    console.log(`Imported '${category}' done.`);
  }

  await conn.end();
  console.log('\nAll done.');
}

main().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});

