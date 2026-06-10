import {
  buildCategoryList,
  disablePlaceInDatabase,
  ensureCategorySlug,
  readStaticContent,
  requireAdmin,
  writeStaticContent,
} from '../../../utils/staticContentStore';

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const categorySlug = ensureCategorySlug(getRouterParam(event, 'category'));
  const slug = ensureCategorySlug(getRouterParam(event, 'slug'));
  const data = await readStaticContent();
  const items = data[categorySlug] || [];
  const index = items.findIndex((item) => item.slug === slug);

  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Không tìm thấy nội dung cần xóa.' });
  }

  const [removed] = items.splice(index, 1);
  await writeStaticContent(data);
  const dbSynced = await disablePlaceInDatabase(categorySlug, slug);

  return {
    categories: buildCategoryList(data),
    dbSynced,
    item: removed,
  };
});
