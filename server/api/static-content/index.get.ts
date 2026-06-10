import {
  buildCategoryList,
  readStaticContent,
  requireAdmin,
} from '../../utils/staticContentStore';

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const data = await readStaticContent();
  return {
    categories: buildCategoryList(data),
    data,
  };
});
