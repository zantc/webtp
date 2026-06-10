import fs from 'node:fs/promises';
import path from 'node:path';
import { createError, getCookie, getHeader, type H3Event } from 'h3';
import jwt from 'jsonwebtoken';
import mysql, { type Connection } from 'mysql2/promise';

export type StaticPlace = {
  key?: number | null;
  slug: string;
  name: string;
  imageUrl?: string | null;
  imageBanner?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  website?: string | null;
  content?: string | null;
  lat?: number | null;
  lng?: number | null;
  map?: string | null;
  iconUrl?: string | null;
  path360?: string | null;
  type?: number | null;
  amenities?: string[];
  [key: string]: unknown;
};

export type StaticContentData = Record<string, StaticPlace[]>;

export const categoryCatalog = [
  { slug: 'di-tich', label: 'Di tích văn hóa lịch sử', typeId: 1 },
  { slug: 'danh-lam', label: 'Danh lam', typeId: 2 },
  { slug: 'le-hoi', label: 'Lễ hội', typeId: 3 },
  { slug: 'lang-nghe', label: 'Làng nghề', typeId: 4 },
  { slug: 'co-quan-hanh-chinh', label: 'Cơ quan hành chính', typeId: 5 },
  { slug: 'trung-tam-hoi-nghi-su-kien', label: 'Trung tâm hội nghị sự kiện', typeId: 6 },
  { slug: 'khach-san', label: 'Khách sạn', typeId: 7 },
  { slug: 'nha-hang', label: 'Nhà hàng quán ăn', typeId: 8 },
  { slug: 'dich-vu-ho-tro-du-lich', label: 'Dịch vụ hỗ trợ du lịch', typeId: 9 },
];

const categoryTypeMap = new Map(categoryCatalog.map((category) => [category.slug, category.typeId]));
const dataPath = path.join(process.cwd(), 'public', 'allMockData.json');

function readToken(event: H3Event) {
  const bearer = getHeader(event, 'authorization');
  if (bearer?.startsWith('Bearer ')) {
    return bearer.slice(7);
  }

  return getCookie(event, 'auth_token');
}

export function requireAdmin(event: H3Event) {
  const token = readToken(event);
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Bạn cần đăng nhập.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'dev_secret_key';
    const payload = jwt.verify(token, secret) as { role?: string };
    if (payload.role !== 'admin') {
      throw createError({ statusCode: 403, statusMessage: 'Bạn không có quyền quản trị.' });
    }
  } catch (error: any) {
    if (error?.statusCode) {
      throw error;
    }

    throw createError({ statusCode: 401, statusMessage: 'Phiên đăng nhập không hợp lệ.' });
  }
}

export async function readStaticContent(): Promise<StaticContentData> {
  const raw = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(raw) as StaticContentData;
}

export async function writeStaticContent(data: StaticContentData) {
  const tmpPath = `${dataPath}.tmp`;
  await fs.writeFile(tmpPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  await fs.rename(tmpPath, dataPath);
}

export function buildCategoryList(data: StaticContentData) {
  const knownSlugs = new Set(categoryCatalog.map((category) => category.slug));
  const extraCategories = Object.keys(data)
    .filter((slug) => !knownSlugs.has(slug))
    .map((slug) => ({ slug, label: slug, typeId: null }));

  return [...categoryCatalog, ...extraCategories].map((category) => ({
    ...category,
    count: data[category.slug]?.length || 0,
  }));
}

export function createSlug(input: string) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function toStringValue(value: unknown, fallback = '') {
  if (value === undefined || value === null) {
    return fallback;
  }

  return String(value).trim();
}

function toNullableString(value: unknown) {
  const normalized = toStringValue(value);
  return normalized || '';
}

function toNullableNumber(value: unknown) {
  if (value === '' || value === undefined || value === null) {
    return null;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function normalizeAmenities(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function nextStaticKey(data: StaticContentData) {
  return Object.values(data)
    .flat()
    .reduce((max, item) => Math.max(max, Number(item.key) || 0), 0) + 1;
}

export function normalizePlacePayload(
  body: Record<string, unknown>,
  categorySlug: string,
  existing?: StaticPlace,
  data?: StaticContentData,
): StaticPlace {
  const name = toStringValue(body.name ?? existing?.name);
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Tên nội dung là bắt buộc.' });
  }

  const slug = createSlug(toStringValue(body.slug ?? existing?.slug, name));
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug không hợp lệ.' });
  }

  const place: StaticPlace = {
    ...existing,
    key: toNullableNumber(body.key ?? existing?.key) ?? existing?.key ?? (data ? nextStaticKey(data) : null),
    slug,
    name,
    imageUrl: toNullableString(body.imageUrl ?? existing?.imageUrl),
    imageBanner: toNullableString(body.imageBanner ?? existing?.imageBanner),
    address: toNullableString(body.address ?? existing?.address),
    phoneNumber: toNullableString(body.phoneNumber ?? existing?.phoneNumber),
    email: toNullableString(body.email ?? existing?.email),
    website: toNullableString(body.website ?? existing?.website),
    content: toNullableString(body.content ?? existing?.content),
    lat: toNullableNumber(body.lat ?? existing?.lat),
    lng: toNullableNumber(body.lng ?? existing?.lng),
    map: toNullableString(body.map ?? existing?.map),
    iconUrl: toNullableString(body.iconUrl ?? existing?.iconUrl),
    path360: toNullableString(body.path360 ?? existing?.path360),
    type: toNullableNumber(body.type ?? existing?.type) ?? categoryTypeMap.get(categorySlug) ?? null,
  };

  const amenities = normalizeAmenities(body.amenities ?? body.amenitiesText ?? existing?.amenities);
  if (amenities.length) {
    place.amenities = amenities;
  } else {
    delete place.amenities;
  }

  return place;
}

export function ensureCategorySlug(value: unknown) {
  const slug = toStringValue(value);
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Danh mục không hợp lệ.' });
  }

  return slug;
}

export function ensureUniqueSlug(
  data: StaticContentData,
  categorySlug: string,
  slug: string,
  current?: { categorySlug: string; slug: string },
) {
  const exists = data[categorySlug]?.some((item) => {
    const isCurrent = current?.categorySlug === categorySlug && current?.slug === item.slug;
    return !isCurrent && item.slug === slug;
  });

  if (exists) {
    throw createError({ statusCode: 409, statusMessage: 'Slug đã tồn tại trong danh mục này.' });
  }
}

async function connectDatabase() {
  return mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'webtp',
  });
}

export async function upsertPlaceToDatabase(categorySlug: string, place: StaticPlace) {
  let connection: Connection | null = null;

  try {
    connection = await connectDatabase();
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
        place.key ?? null,
        categorySlug,
        place.slug,
        place.name,
        place.imageUrl || null,
        place.imageBanner || null,
        place.address || null,
        place.phoneNumber || null,
        place.email || null,
        place.website || null,
        place.content || null,
        Array.isArray(place.amenities) ? JSON.stringify(place.amenities) : null,
        place.lat ?? null,
        place.lng ?? null,
        place.map || null,
        place.iconUrl || null,
        place.path360 || null,
        place.type ?? categoryTypeMap.get(categorySlug) ?? null,
      ],
    );

    return true;
  } catch {
    return false;
  } finally {
    await connection?.end();
  }
}

export async function disablePlaceInDatabase(categorySlug: string, slug: string) {
  let connection: Connection | null = null;

  try {
    connection = await connectDatabase();
    await connection.execute(
      'UPDATE dia_diem SET trang_thai = 0 WHERE category_slug = ? AND slug = ?',
      [categorySlug, slug],
    );

    return true;
  } catch {
    return false;
  } finally {
    await connection?.end();
  }
}
