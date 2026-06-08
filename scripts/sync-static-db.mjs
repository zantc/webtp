import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const dataPath = path.join(rootDir, 'public', 'allMockData.json');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'webtp',
};

const categories = [
  { id: 1, slug: 'di-tich', name: 'Di tích văn hóa lịch sử', order: 1 },
  { id: 2, slug: 'danh-lam', name: 'Danh lam', order: 2 },
  { id: 3, slug: 'le-hoi', name: 'Lễ hội', order: 3 },
  { id: 4, slug: 'lang-nghe', name: 'Làng nghề', order: 4 },
  { id: 5, slug: 'co-quan-hanh-chinh', name: 'Cơ quan hành chính', order: 5 },
  { id: 6, slug: 'trung-tam-hoi-nghi-su-kien', name: 'Trung tâm hội nghị sự kiện', order: 6 },
  { id: 7, slug: 'khach-san', name: 'Khách sạn', order: 7 },
  { id: 8, slug: 'nha-hang', name: 'Nhà hàng quán ăn', order: 8 },
  { id: 9, slug: 'dich-vu-ho-tro-du-lich', name: 'Dịch vụ hỗ trợ du lịch', order: 9 },
];

const accounts = [
  {
    username: 'admin',
    password: 'admin123',
    fullName: 'Quản trị viên Hệ thống',
    role: 'admin',
    email: 'admin@daimo360.local',
  },
  {
    username: 'user',
    password: 'user123',
    fullName: 'Người dùng Demo',
    role: 'user',
    email: 'user@daimo360.local',
  },
];

function quoteId(identifier) {
  if (!/^[A-Za-z0-9_]+$/.test(identifier)) {
    throw new Error(`Invalid identifier: ${identifier}`);
  }

  return `\`${identifier}\``;
}

function normalizeString(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function normalizeNumber(value) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

async function ensureColumn(connection, table, column, definition) {
  const [rows] = await connection.execute(
    `SELECT COUNT(*) AS total
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?
       AND COLUMN_NAME = ?`,
    [table, column],
  );

  if (rows[0].total === 0) {
    await connection.query(
      `ALTER TABLE ${quoteId(table)} ADD COLUMN ${quoteId(column)} ${definition}`,
    );
  }
}

async function ensureIndex(connection, table, indexName, createSql) {
  const [rows] = await connection.query(
    `SHOW INDEX FROM ${quoteId(table)} WHERE Key_name = ?`,
    [indexName],
  );

  if (rows.length === 0) {
    await connection.query(createSql);
  }
}

async function createSchema(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS tai_khoan (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ten_dang_nhap VARCHAR(100) NOT NULL,
      mat_khau VARCHAR(255) NOT NULL,
      ho_ten VARCHAR(255) NOT NULL,
      vai_tro ENUM('admin', 'user') NOT NULL DEFAULT 'user',
      trang_thai TINYINT(1) NOT NULL DEFAULT 1,
      avatar_url VARCHAR(500) NULL,
      email VARCHAR(255) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await ensureColumn(connection, 'tai_khoan', 'ten_dang_nhap', 'VARCHAR(100) NULL');
  await ensureColumn(connection, 'tai_khoan', 'mat_khau', 'VARCHAR(255) NULL');
  await ensureColumn(connection, 'tai_khoan', 'ho_ten', 'VARCHAR(255) NULL');
  await ensureColumn(connection, 'tai_khoan', 'vai_tro', "ENUM('admin', 'user') NOT NULL DEFAULT 'user'");
  await ensureColumn(connection, 'tai_khoan', 'trang_thai', 'TINYINT(1) NOT NULL DEFAULT 1');
  await ensureColumn(connection, 'tai_khoan', 'avatar_url', 'VARCHAR(500) NULL');
  await ensureColumn(connection, 'tai_khoan', 'email', 'VARCHAR(255) NULL');
  await ensureColumn(connection, 'tai_khoan', 'created_at', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP');
  await ensureColumn(
    connection,
    'tai_khoan',
    'updated_at',
    'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  );
  await ensureIndex(
    connection,
    'tai_khoan',
    'uq_tai_khoan_ten_dang_nhap',
    'ALTER TABLE `tai_khoan` ADD UNIQUE KEY `uq_tai_khoan_ten_dang_nhap` (`ten_dang_nhap`)',
  );

  await connection.query(`
    CREATE TABLE IF NOT EXISTS danh_muc (
      id INT PRIMARY KEY,
      slug VARCHAR(100) NOT NULL,
      ten_danh_muc VARCHAR(255) NOT NULL,
      mo_ta TEXT NULL,
      thu_tu INT NOT NULL DEFAULT 0,
      trang_thai TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await ensureIndex(
    connection,
    'danh_muc',
    'uq_danh_muc_slug',
    'ALTER TABLE `danh_muc` ADD UNIQUE KEY `uq_danh_muc_slug` (`slug`)',
  );

  await connection.query(`
    CREATE TABLE IF NOT EXISTS dia_diem (
      id INT AUTO_INCREMENT PRIMARY KEY,
      static_key INT NULL,
      category_slug VARCHAR(100) NOT NULL,
      slug VARCHAR(180) NOT NULL,
      ten VARCHAR(255) NOT NULL,
      anh_dai_dien VARCHAR(500) NULL,
      anh_banner VARCHAR(500) NULL,
      dia_chi TEXT NULL,
      so_dien_thoai VARCHAR(80) NULL,
      email VARCHAR(255) NULL,
      website VARCHAR(500) NULL,
      noi_dung LONGTEXT NULL,
      tien_nghi JSON NULL,
      lat DECIMAL(12, 9) NULL,
      lng DECIMAL(12, 9) NULL,
      map_url TEXT NULL,
      icon_url VARCHAR(500) NULL,
      path360 VARCHAR(500) NULL,
      type_id INT NULL,
      trang_thai TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_dia_diem_category (category_slug),
      INDEX idx_dia_diem_type (type_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const placeColumns = [
    ['static_key', 'INT NULL'],
    ['category_slug', 'VARCHAR(100) NULL'],
    ['slug', 'VARCHAR(180) NULL'],
    ['ten', 'VARCHAR(255) NULL'],
    ['anh_dai_dien', 'VARCHAR(500) NULL'],
    ['anh_banner', 'VARCHAR(500) NULL'],
    ['dia_chi', 'TEXT NULL'],
    ['so_dien_thoai', 'VARCHAR(80) NULL'],
    ['email', 'VARCHAR(255) NULL'],
    ['website', 'VARCHAR(500) NULL'],
    ['noi_dung', 'LONGTEXT NULL'],
    ['tien_nghi', 'JSON NULL'],
    ['lat', 'DECIMAL(12, 9) NULL'],
    ['lng', 'DECIMAL(12, 9) NULL'],
    ['map_url', 'TEXT NULL'],
    ['icon_url', 'VARCHAR(500) NULL'],
    ['path360', 'VARCHAR(500) NULL'],
    ['type_id', 'INT NULL'],
    ['trang_thai', 'TINYINT(1) NOT NULL DEFAULT 1'],
    ['created_at', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'],
    ['updated_at', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'],
  ];
  for (const [column, definition] of placeColumns) {
    await ensureColumn(connection, 'dia_diem', column, definition);
  }
  await ensureIndex(
    connection,
    'dia_diem',
    'uq_dia_diem_category_slug',
    'ALTER TABLE `dia_diem` ADD UNIQUE KEY `uq_dia_diem_category_slug` (`category_slug`, `slug`)',
  );
  await ensureIndex(
    connection,
    'dia_diem',
    'idx_dia_diem_category',
    'ALTER TABLE `dia_diem` ADD INDEX `idx_dia_diem_category` (`category_slug`)',
  );
  await ensureIndex(
    connection,
    'dia_diem',
    'idx_dia_diem_type',
    'ALTER TABLE `dia_diem` ADD INDEX `idx_dia_diem_type` (`type_id`)',
  );

  await connection.query(`
    CREATE TABLE IF NOT EXISTS menus (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ten_menu VARCHAR(255) NOT NULL,
      slug VARCHAR(120) NOT NULL,
      link VARCHAR(500) NULL,
      url VARCHAR(500) NOT NULL,
      parent_id INT NULL,
      thu_tu INT NOT NULL DEFAULT 0,
      trang_thai TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_menus_parent (parent_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  const menuColumns = [
    ['ten_menu', 'VARCHAR(255) NULL'],
    ['slug', 'VARCHAR(120) NULL'],
    ['link', 'VARCHAR(500) NULL'],
    ['url', 'VARCHAR(500) NULL'],
    ['parent_id', 'INT NULL'],
    ['thu_tu', 'INT NOT NULL DEFAULT 0'],
    ['trang_thai', 'TINYINT(1) NOT NULL DEFAULT 1'],
    ['created_at', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'],
    ['updated_at', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'],
  ];
  for (const [column, definition] of menuColumns) {
    await ensureColumn(connection, 'menus', column, definition);
  }
  await ensureIndex(
    connection,
    'menus',
    'uq_menus_slug',
    'ALTER TABLE `menus` ADD UNIQUE KEY `uq_menus_slug` (`slug`)',
  );

  await connection.query(`
    CREATE TABLE IF NOT EXISTS luu_dia_diem (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tai_khoan_id INT NOT NULL,
      dia_diem_id INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_luu_dia_diem_user_place (tai_khoan_id, dia_diem_id),
      INDEX idx_luu_dia_diem_place (dia_diem_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS danh_gia (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tai_khoan_id INT NULL,
      dia_diem_id INT NOT NULL,
      ho_ten VARCHAR(255) NULL,
      email VARCHAR(255) NULL,
      so_sao TINYINT NULL,
      noi_dung TEXT NOT NULL,
      trang_thai ENUM('cho_duyet', 'da_duyet', 'tu_choi') NOT NULL DEFAULT 'cho_duyet',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_danh_gia_place (dia_diem_id),
      INDEX idx_danh_gia_status (trang_thai)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS thong_bao (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tai_khoan_id INT NULL,
      tieu_de VARCHAR(255) NOT NULL,
      noi_dung TEXT NULL,
      da_doc TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_thong_bao_user (tai_khoan_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function seedAccounts(connection) {
  for (const account of accounts) {
    await connection.execute(
      `INSERT INTO tai_khoan
        (ten_dang_nhap, mat_khau, ho_ten, vai_tro, trang_thai, email)
       VALUES (?, ?, ?, ?, 1, ?)
       ON DUPLICATE KEY UPDATE
        ho_ten = VALUES(ho_ten),
        vai_tro = VALUES(vai_tro),
        trang_thai = 1,
        email = VALUES(email),
        mat_khau = IF(mat_khau IS NULL OR mat_khau = '', VALUES(mat_khau), mat_khau)`,
      [account.username, account.password, account.fullName, account.role, account.email],
    );
  }
}

async function seedCategories(connection) {
  for (const category of categories) {
    await connection.execute(
      `INSERT INTO danh_muc
        (id, slug, ten_danh_muc, mo_ta, thu_tu, trang_thai)
       VALUES (?, ?, ?, ?, ?, 1)
       ON DUPLICATE KEY UPDATE
        slug = VALUES(slug),
        ten_danh_muc = VALUES(ten_danh_muc),
        mo_ta = VALUES(mo_ta),
        thu_tu = VALUES(thu_tu),
        trang_thai = 1`,
      [
        category.id,
        category.slug,
        category.name,
        `Danh mục ${category.name.toLowerCase()} hiển thị trong bản đồ và trang danh sách.`,
        category.order,
      ],
    );
  }
}

async function seedMenus(connection) {
  const menuTree = [
    { name: 'Trang chủ', slug: 'trang-chu', url: '/' },
    {
      name: 'Điểm đến',
      slug: 'diem-den',
      url: '#',
      children: categories.map((category) => ({
        name: category.name,
        slug: category.slug,
        url: `/${category.slug}/`,
      })),
    },
    { name: 'Sự kiện', slug: 'su-kien', url: '/events/' },
    {
      name: 'Cẩm nang du lịch',
      slug: 'cam-nang-du-lich',
      url: '#',
      children: [
        { name: 'Ở đâu?', slug: 'o-dau', url: '/khach-san/' },
        { name: 'Ăn gì?', slug: 'an-gi', url: '/nha-hang/' },
        { name: 'Chơi gì?', slug: 'choi-gi', url: '/danh-lam/' },
        { name: 'Địa điểm nổi bật', slug: 'dia-diem-noi-bat', url: '/di-tich/' },
      ],
    },
    { name: 'Tin tức', slug: 'tin-tuc', url: '/news/' },
    { name: 'Tour du lịch', slug: 'tour-du-lich', url: '/travel-tour/' },
    { name: 'Bản đồ', slug: 'ban-do', url: '/map/' },
    {
      name: 'Triển lãm',
      slug: 'trien-lam',
      url: '#',
      children: [
        { name: 'Đại lộ Thăng Long', slug: 'dai-lo-thang-long', url: '#' },
        { name: 'Hồ Mễ Trì', slug: 'ho-me-tri', url: '#' },
      ],
    },
  ];

  await connection.query("UPDATE menus SET trang_thai = 0 WHERE slug IS NULL OR slug = ''");

  async function upsertMenu(menu, parentId, order) {
    await connection.execute(
      `INSERT INTO menus
        (ten_menu, slug, link, url, parent_id, thu_tu, trang_thai)
       VALUES (?, ?, ?, ?, ?, ?, 1)
       ON DUPLICATE KEY UPDATE
        ten_menu = VALUES(ten_menu),
        link = VALUES(link),
        url = VALUES(url),
        parent_id = VALUES(parent_id),
        thu_tu = VALUES(thu_tu),
        trang_thai = 1`,
      [menu.name, menu.slug, menu.url, menu.url, parentId, order],
    );

    const [rows] = await connection.execute('SELECT id FROM menus WHERE slug = ? LIMIT 1', [
      menu.slug,
    ]);
    return rows[0].id;
  }

  for (let index = 0; index < menuTree.length; index += 1) {
    const menu = menuTree[index];
    const menuId = await upsertMenu(menu, null, index + 1);

    if (Array.isArray(menu.children)) {
      for (let childIndex = 0; childIndex < menu.children.length; childIndex += 1) {
        await upsertMenu(menu.children[childIndex], menuId, childIndex + 1);
      }
    }
  }
}

async function seedPlaces(connection, allMockData) {
  let inputCount = 0;
  const uniqueKeys = new Set();

  for (const [categorySlug, items] of Object.entries(allMockData)) {
    for (const item of items) {
      inputCount += 1;
      uniqueKeys.add(`${categorySlug}|${item.slug}`);

      await connection.execute(
        `INSERT INTO dia_diem
          (
            static_key,
            category_slug,
            slug,
            ten,
            anh_dai_dien,
            anh_banner,
            dia_chi,
            so_dien_thoai,
            email,
            website,
            noi_dung,
            tien_nghi,
            lat,
            lng,
            map_url,
            icon_url,
            path360,
            type_id,
            trang_thai
          )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
          static_key = VALUES(static_key),
          ten = VALUES(ten),
          anh_dai_dien = VALUES(anh_dai_dien),
          anh_banner = VALUES(anh_banner),
          dia_chi = VALUES(dia_chi),
          so_dien_thoai = VALUES(so_dien_thoai),
          email = VALUES(email),
          website = VALUES(website),
          noi_dung = VALUES(noi_dung),
          tien_nghi = VALUES(tien_nghi),
          lat = VALUES(lat),
          lng = VALUES(lng),
          map_url = VALUES(map_url),
          icon_url = VALUES(icon_url),
          path360 = VALUES(path360),
          type_id = VALUES(type_id),
          trang_thai = 1`,
        [
          normalizeNumber(item.key),
          categorySlug,
          item.slug,
          item.name,
          normalizeString(item.imageUrl),
          normalizeString(item.imageBanner),
          normalizeString(item.address),
          normalizeString(item.phoneNumber),
          normalizeString(item.email),
          normalizeString(item.website),
          normalizeString(item.content),
          Array.isArray(item.amenities) ? JSON.stringify(item.amenities) : null,
          normalizeNumber(item.lat),
          normalizeNumber(item.lng),
          normalizeString(item.map),
          normalizeString(item.iconUrl),
          normalizeString(item.path360),
          normalizeNumber(item.type),
        ],
      );
    }
  }

  return {
    inputCount,
    uniqueCount: uniqueKeys.size,
  };
}

async function createCompatibilityViews(connection) {
  const views = [
    ['view_khach_san', "SELECT * FROM `dia_diem` WHERE `category_slug` = 'khach-san'"],
    ['view_nha_hang', "SELECT * FROM `dia_diem` WHERE `category_slug` = 'nha-hang'"],
    ['view_di_tich', "SELECT * FROM `dia_diem` WHERE `category_slug` = 'di-tich'"],
    ['view_danh_lam', "SELECT * FROM `dia_diem` WHERE `category_slug` = 'danh-lam'"],
  ];

  for (const [viewName, selectSql] of views) {
    await connection.query(`CREATE OR REPLACE VIEW ${quoteId(viewName)} AS ${selectSql}`);
  }
}

async function main() {
  const allMockData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    multipleStatements: false,
  });

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${quoteId(dbConfig.database)}
       CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await connection.query(`USE ${quoteId(dbConfig.database)}`);

    await createSchema(connection);
    await seedAccounts(connection);
    await seedCategories(connection);
    await seedMenus(connection);
    const placeStats = await seedPlaces(connection, allMockData);
    await createCompatibilityViews(connection);

    const [accountRows] = await connection.query('SELECT COUNT(*) AS total FROM tai_khoan');
    const [categoryRows] = await connection.query('SELECT COUNT(*) AS total FROM danh_muc');
    const [menuRows] = await connection.query(
      'SELECT COUNT(*) AS total, SUM(trang_thai = 1) AS active_total FROM menus',
    );
    const [placeRows] = await connection.query('SELECT COUNT(*) AS total FROM dia_diem');

    console.log(`Database: ${dbConfig.database}`);
    console.log(`Tai khoan: ${accountRows[0].total}`);
    console.log(`Danh muc: ${categoryRows[0].total}`);
    console.log(`Menu: ${menuRows[0].active_total}/${menuRows[0].total} dang hoat dong`);
    console.log(
      `Dia diem trong allMockData.json: ${placeStats.inputCount} dong, ${placeStats.uniqueCount} slug duy nhat`,
    );
    console.log(`Dia diem trong DB: ${placeRows[0].total}`);
    console.log('Hoan tat dong bo database theo code tinh.');
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
