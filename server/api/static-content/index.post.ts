import {
  buildCategoryList,
  ensureCategorySlug,
  ensureUniqueSlug,
  normalizePlacePayload,
  readStaticContent,
  requireAdmin,
  upsertPlaceToDatabase,
  writeStaticContent,
} from '../../utils/staticContentStore';

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const body = await readBody<Record<string, unknown>>(event);
  const categorySlug = ensureCategorySlug(body.categorySlug);
  const data = await readStaticContent();
  data[categorySlug] ||= [];

  const place = normalizePlacePayload(body, categorySlug, undefined, data);
  ensureUniqueSlug(data, categorySlug, place.slug);

  data[categorySlug].push(place);
  await writeStaticContent(data);
  const dbSynced = await upsertPlaceToDatabase(categorySlug, place);

  return {
    categorySlug,
    categories: buildCategoryList(data),
    dbSynced,
    item: place,
  };
});
