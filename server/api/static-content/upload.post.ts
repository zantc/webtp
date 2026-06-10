import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createError, readMultipartFormData } from 'h3';
import {
  ensureCategorySlug,
  requireAdmin,
} from '../../utils/staticContentStore';

const maxFileSize = 8 * 1024 * 1024;
const mimeExtensions: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/x-icon': '.ico',
  'image/vnd.microsoft.icon': '.ico',
};
const extensionMimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
};

function cleanSegment(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
}

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const parts = await readMultipartFormData(event);
  if (!parts?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Không nhận được file ảnh.' });
  }

  const file = parts.find((part) => part.name === 'file' && part.filename);
  if (!file?.data?.length) {
    throw createError({ statusCode: 400, statusMessage: 'File ảnh không hợp lệ.' });
  }

  if (file.data.length > maxFileSize) {
    throw createError({ statusCode: 400, statusMessage: 'Ảnh không được vượt quá 8MB.' });
  }

  const originalExtension = path.extname(file.filename || '').toLowerCase();
  const rawMimeType = file.type || '';
  const mimeType = mimeExtensions[rawMimeType] ? rawMimeType : extensionMimeTypes[originalExtension] || rawMimeType;
  const extension = mimeExtensions[mimeType] || (extensionMimeTypes[originalExtension] ? originalExtension : '');
  if (!extension) {
    throw createError({ statusCode: 400, statusMessage: 'Chỉ hỗ trợ ảnh JPG, PNG, WEBP, GIF hoặc ICO.' });
  }

  const getField = (name: string) => {
    return parts.find((part) => part.name === name && !part.filename)?.data.toString('utf8').trim() || '';
  };

  const categorySlug = ensureCategorySlug(getField('categorySlug') || 'uploads');
  const baseSlug = cleanSegment(getField('slug')) || 'hinh-anh';
  const originalName = cleanSegment(path.parse(file.filename || '').name) || baseSlug;
  const fileName = `${baseSlug}-${Date.now()}-${randomUUID().slice(0, 8)}-${originalName}${extension}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'static-content', categorySlug);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), file.data);

  return {
    url: `/uploads/static-content/${categorySlug}/${fileName}`,
    size: file.data.length,
    type: mimeType,
  };
});
