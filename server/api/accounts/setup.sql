-- Database setup for the current Nuxt codebase.
-- Main login API reads `tai_khoan`; static places are synced from
-- `public/allMockData.json` with: npm run db:sync

CREATE DATABASE IF NOT EXISTS `webtp`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `webtp`;

CREATE TABLE IF NOT EXISTS `tai_khoan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ten_dang_nhap` VARCHAR(100) NOT NULL,
  `mat_khau` VARCHAR(255) NOT NULL,
  `ho_ten` VARCHAR(255) NOT NULL,
  `vai_tro` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  `trang_thai` TINYINT(1) NOT NULL DEFAULT 1,
  `avatar_url` VARCHAR(500) NULL,
  `email` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_tai_khoan_ten_dang_nhap` (`ten_dang_nhap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `danh_muc` (
  `id` INT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL,
  `ten_danh_muc` VARCHAR(255) NOT NULL,
  `mo_ta` TEXT NULL,
  `thu_tu` INT NOT NULL DEFAULT 0,
  `trang_thai` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_danh_muc_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `dia_diem` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `static_key` INT NULL,
  `category_slug` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(180) NOT NULL,
  `ten` VARCHAR(255) NOT NULL,
  `anh_dai_dien` VARCHAR(500) NULL,
  `anh_banner` VARCHAR(500) NULL,
  `dia_chi` TEXT NULL,
  `so_dien_thoai` VARCHAR(80) NULL,
  `email` VARCHAR(255) NULL,
  `website` VARCHAR(500) NULL,
  `noi_dung` LONGTEXT NULL,
  `tien_nghi` JSON NULL,
  `lat` DECIMAL(12, 9) NULL,
  `lng` DECIMAL(12, 9) NULL,
  `map_url` TEXT NULL,
  `icon_url` VARCHAR(500) NULL,
  `path360` VARCHAR(500) NULL,
  `type_id` INT NULL,
  `trang_thai` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_dia_diem_category_slug` (`category_slug`, `slug`),
  INDEX `idx_dia_diem_category` (`category_slug`),
  INDEX `idx_dia_diem_type` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `menus` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ten_menu` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(120) NOT NULL,
  `link` VARCHAR(500) NULL,
  `url` VARCHAR(500) NOT NULL,
  `parent_id` INT NULL,
  `thu_tu` INT NOT NULL DEFAULT 0,
  `trang_thai` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_menus_slug` (`slug`),
  INDEX `idx_menus_parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `luu_dia_diem` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `tai_khoan_id` INT NOT NULL,
  `dia_diem_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_luu_dia_diem_user_place` (`tai_khoan_id`, `dia_diem_id`),
  INDEX `idx_luu_dia_diem_place` (`dia_diem_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `danh_gia` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `tai_khoan_id` INT NULL,
  `dia_diem_id` INT NOT NULL,
  `ho_ten` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `so_sao` TINYINT NULL,
  `noi_dung` TEXT NOT NULL,
  `trang_thai` ENUM('cho_duyet', 'da_duyet', 'tu_choi') NOT NULL DEFAULT 'cho_duyet',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_danh_gia_place` (`dia_diem_id`),
  INDEX `idx_danh_gia_status` (`trang_thai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `thong_bao` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `tai_khoan_id` INT NULL,
  `tieu_de` VARCHAR(255) NOT NULL,
  `noi_dung` TEXT NULL,
  `da_doc` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_thong_bao_user` (`tai_khoan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tai_khoan`
  (`ten_dang_nhap`, `mat_khau`, `ho_ten`, `vai_tro`, `trang_thai`, `email`)
VALUES
  ('admin', 'admin123', 'Quản trị viên Hệ thống', 'admin', 1, 'admin@daimo360.local'),
  ('user', 'user123', 'Người dùng Demo', 'user', 1, 'user@daimo360.local')
ON DUPLICATE KEY UPDATE
  `ho_ten` = VALUES(`ho_ten`),
  `vai_tro` = VALUES(`vai_tro`),
  `trang_thai` = 1,
  `email` = VALUES(`email`);

INSERT INTO `danh_muc`
  (`id`, `slug`, `ten_danh_muc`, `thu_tu`, `trang_thai`)
VALUES
  (1, 'di-tich', 'Di tích văn hóa lịch sử', 1, 1),
  (2, 'danh-lam', 'Danh lam', 2, 1),
  (3, 'le-hoi', 'Lễ hội', 3, 1),
  (4, 'lang-nghe', 'Làng nghề', 4, 1),
  (5, 'co-quan-hanh-chinh', 'Cơ quan hành chính', 5, 1),
  (6, 'trung-tam-hoi-nghi-su-kien', 'Trung tâm hội nghị sự kiện', 6, 1),
  (7, 'khach-san', 'Khách sạn', 7, 1),
  (8, 'nha-hang', 'Nhà hàng quán ăn', 8, 1),
  (9, 'dich-vu-ho-tro-du-lich', 'Dịch vụ hỗ trợ du lịch', 9, 1)
ON DUPLICATE KEY UPDATE
  `slug` = VALUES(`slug`),
  `ten_danh_muc` = VALUES(`ten_danh_muc`),
  `thu_tu` = VALUES(`thu_tu`),
  `trang_thai` = 1;
