import {
  buildCategoryList,
  disablePlaceInDatabase,
  ensureCategorySlug,
  ensureUniqueSlug,
  normalizePlacePayload,
  readStaticContent,
  requireAdmin,
  upsertPlaceToDatabase,
  writeStaticContent,
} from '../../../utils/staticContentStore';

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const oldCategorySlug = ensureCategorySlug(getRouterParam(event, 'category'));
  const oldSlug = ensureCategorySlug(getRouterParam(event, 'slug'));
  const body = await readBody<Record<string, unknown>>(event);
  const categorySlug = ensureCategorySlug(body.categorySlug || oldCategorySlug);
  const data = await readStaticContent();
  const oldItems = data[oldCategorySlug] || [];
  const oldIndex = oldItems.findIndex((item) => item.slug === oldSlug);

  if (oldIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Không tìm thấy nội dung cần sửa.' });
  }

  data[categorySlug] ||= [];

  const existing = oldItems[oldIndex];
  const place = normalizePlacePayload(body, categorySlug, existing, data);
  ensureUniqueSlug(data, categorySlug, place.slug, {
    categorySlug: oldCategorySlug,
    slug: oldSlug,
  });

  if (categorySlug === oldCategorySlug) {
    oldItems.splice(oldIndex, 1, place);
  } else {
    oldItems.splice(oldIndex, 1);
    data[categorySlug].push(place);
  }

  await writeStaticContent(data);

  let dbSynced = true;
  if (categorySlug !== oldCategorySlug || place.slug !== oldSlug) {
    dbSynced = await disablePlaceInDatabase(oldCategorySlug, oldSlug);
  }
  dbSynced = (await upsertPlaceToDatabase(categorySlug, place)) && dbSynced;

  return {
    categorySlug,
    categories: buildCategoryList(data),
    dbSynced,
    item: place,
  };
});
