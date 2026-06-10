<template>
  <div v-if="isAllowed" class="content-admin">
    <aside class="content-sidebar">
      <NuxtLink href="/admin-dashboard" class="back-link">Quay lại quản trị</NuxtLink>
      <div class="sidebar-heading">
        <p>Nội dung tĩnh</p>
        <h1>Danh sách hiển thị</h1>
      </div>

      <div ref="categoryPickerRef" class="sidebar-category" @keydown.escape="activeSidebarMenu = null">
        <span class="sidebar-category-label">Nhóm nội dung</span>

        <div class="sidebar-nav-stack">
          <div v-for="group in sidebarNavGroups" :key="group.key" class="sidebar-nav-group">
            <button
              type="button"
              class="sidebar-category-trigger"
              :class="{ active: isSidebarGroupActive(group) }"
              :aria-expanded="group.items ? activeSidebarMenu === group.key : undefined"
              @click.stop="handleSidebarGroupClick(group)"
            >
              <span>{{ group.label }}</span>
              <small v-if="group.count !== undefined">{{ group.count }}</small>
              <span v-if="group.items" class="sidebar-caret" aria-hidden="true">▾</span>
            </button>

            <div v-if="group.items && activeSidebarMenu === group.key" class="sidebar-category-dropdown">
              <button
                v-for="item in group.items"
                :key="item.key"
                type="button"
                :class="{ active: item.slug === selectedCategory }"
                @click="handleSidebarItemClick(item)"
              >
                <span>{{ item.label }}</span>
                <small v-if="item.count !== undefined">{{ item.count }}</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <main class="content-main">
      <header class="content-header">
        <div>
          <p>{{ currentCategoryLabel }}</p>
          <h2>{{ selectedItemLabel }}</h2>
        </div>
        <div class="header-actions">
          <button type="button" class="ghost-button" @click="loadContent">Tải lại</button>
          <button type="button" @click="startCreate">Thêm mới</button>
        </div>
      </header>

      <div v-if="statusMessage" class="status-message" :class="{ warning: statusIsWarning }">
        <span>{{ statusMessage }}</span>
        <button type="button" @click="statusMessage = ''">Đóng</button>
      </div>

      <section class="workspace" :class="{ 'has-published': publishedItem }">
        <form class="editor-panel" @submit.prevent="saveItem">
          <div class="editor-toolbar">
            <label class="item-selector">
              <span>Nội dung trong {{ currentCategoryLabel }}</span>
              <select :value="selectedItemValue" @change="selectItemByValue">
                <option value="">Tạo nội dung mới</option>
                <option
                  v-for="item in filteredItems"
                  :key="`${selectedCategory}:${item.slug}`"
                  :value="`${selectedCategory}::${item.slug}`"
                >
                  {{ item.name }}
                </option>
              </select>
            </label>
            <strong>{{ filteredItems.length }} mục</strong>
          </div>

          <div v-if="loading" class="empty-state compact-state">Đang tải</div>

          <div class="editor-grid">
            <label>
              Danh mục
              <select v-model="form.categorySlug">
                <option v-for="category in categories" :key="category.slug" :value="category.slug">
                  {{ category.label }}
                </option>
              </select>
            </label>

            <label>
              Slug
              <input v-model="form.slug" type="text" required />
            </label>

            <label class="wide-field">
              <span class="field-label">Tên hiển thị <span class="required-mark">*</span></span>
              <input v-model="form.name" type="text" required @blur="fillSlugFromName" />
            </label>

            <label class="wide-field">
              <span class="field-label">Địa chỉ <span class="required-mark">*</span></span>
              <input v-model="form.address" type="text" required />
            </label>

            <label>
              Điện thoại
              <input v-model="form.phoneNumber" type="text" />
            </label>

            <label>
              Email
              <input v-model="form.email" type="email" />
            </label>

            <label class="wide-field">
              Website
              <input v-model="form.website" type="url" />
            </label>

            <label>
              Lat
              <input v-model="form.lat" type="number" step="any" />
            </label>

            <label>
              Lng
              <input v-model="form.lng" type="number" step="any" />
            </label>

            <div class="wide-field form-field">
              <label for="image-url">Ảnh đại diện</label>
              <div class="image-upload-control">
                <input id="image-url" v-model="form.imageUrl" type="text" />
                <label class="upload-button" :class="{ disabled: saving || isUploadingImage }">
                  {{ uploadButtonLabel('imageUrl') }}
                  <input
                    type="file"
                    accept="image/*"
                    :disabled="saving || isUploadingImage"
                    @change="uploadImage($event, 'imageUrl')"
                  />
                </label>
              </div>
            </div>

            <div class="wide-field form-field">
              <label for="image-banner">Ảnh banner</label>
              <div class="image-upload-control">
                <input id="image-banner" v-model="form.imageBanner" type="text" />
                <label class="upload-button" :class="{ disabled: saving || isUploadingImage }">
                  {{ uploadButtonLabel('imageBanner') }}
                  <input
                    type="file"
                    accept="image/*"
                    :disabled="saving || isUploadingImage"
                    @change="uploadImage($event, 'imageBanner')"
                  />
                </label>
              </div>
            </div>

            <div class="wide-field form-field">
              <label for="icon-url">Icon bản đồ</label>
              <div class="image-upload-control">
                <input id="icon-url" v-model="form.iconUrl" type="text" />
                <label class="upload-button" :class="{ disabled: saving || isUploadingImage }">
                  {{ uploadButtonLabel('iconUrl') }}
                  <input
                    type="file"
                    accept="image/*"
                    :disabled="saving || isUploadingImage"
                    @change="uploadImage($event, 'iconUrl')"
                  />
                </label>
              </div>
            </div>

            <label class="wide-field">
              Link 360
              <input v-model="form.path360" type="text" />
            </label>

            <label class="wide-field">
              Google Maps
              <input v-model="form.map" type="text" />
            </label>

            <label>
              Type ID
              <input v-model="form.type" type="number" min="1" max="99" />
            </label>

            <label>
              Key
              <input v-model="form.key" type="number" min="1" />
            </label>

            <label class="wide-field">
              Tiện nghi
              <textarea v-model="form.amenitiesText" rows="3" />
            </label>

            <label class="wide-field">
              Nội dung
              <textarea v-model="form.content" rows="10" />
            </label>
          </div>

          <div class="editor-actions">
            <button type="button" class="danger-button" :disabled="!selectedIdentity || saving" @click="deleteItem">
              Xóa
            </button>
            <button type="button" class="ghost-button" :disabled="saving" @click="resetCurrentForm">
              Hoàn tác
            </button>
            <button type="submit" :disabled="saving">
              {{ saving ? 'Đang lưu' : 'Lưu nội dung' }}
            </button>
          </div>
        </form>

        <aside v-if="publishedItem" class="published-panel" aria-label="Nội dung đã đăng">
          <div class="preview-badge">Nội dung đã đăng</div>
          <div class="preview-head">
            <div class="preview-intro">
              <h3>{{ publishedItem.name || publishedItem.slug }}</h3>
              <p v-if="publishedItem.address" class="preview-info">
                <span aria-hidden="true">⌖</span>
                {{ publishedItem.address }}
              </p>
              <p v-if="publishedItem.phoneNumber" class="preview-info">
                <span aria-hidden="true">☎</span>
                {{ publishedItem.phoneNumber }}
              </p>
              <p v-if="publishedItem.email" class="preview-info">
                <span aria-hidden="true">✉</span>
                {{ publishedItem.email }}
              </p>

              <div class="preview-actions" aria-hidden="true">
                <span class="preview-action favorite">♡ Yêu thích</span>
                <span class="preview-action share">↗ Share</span>
              </div>
            </div>

            <img
              v-if="publishedPreviewImage"
              class="preview-image"
              :src="publishedPreviewImage"
              :alt="publishedItem.name || publishedItem.slug"
              loading="lazy"
            />
            <div v-else class="preview-image placeholder-image">Chưa có ảnh</div>
          </div>

          <section v-if="publishedAmenities.length" class="preview-section">
            <h4>TIỆN NGHI DỊCH VỤ</h4>
            <div class="preview-amenities">
              <span v-for="amenity in publishedAmenities" :key="amenity">{{ amenity }}</span>
            </div>
          </section>

          <section class="preview-section">
            <h4>GIỚI THIỆU</h4>
            <p v-if="publishedItem.content" class="preview-content">{{ publishedItem.content }}</p>
            <p v-else class="preview-content muted-text">Chưa có nội dung.</p>
          </section>

          <section
            v-if="publishedItem.address || publishedItem.phoneNumber || publishedItem.email || publishedItem.website"
            class="preview-section preview-contact"
          >
            <h4>THÔNG TIN LIÊN HỆ</h4>
            <p v-if="publishedItem.address">Địa chỉ: {{ publishedItem.address }}</p>
            <p v-if="publishedItem.phoneNumber">Điện thoại: {{ publishedItem.phoneNumber }}</p>
            <p v-if="publishedItem.email">Email: {{ publishedItem.email }}</p>
            <p v-if="publishedItem.website">Website: {{ publishedItem.website }}</p>
          </section>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
type UserInfo = {
  id?: number;
  ten_dang_nhap?: string;
  ho_ten?: string;
  vai_tro?: string;
};

type CategoryOption = {
  slug: string;
  label: string;
  typeId: number | null;
  count: number;
};

type SidebarNavItem = {
  key: string;
  label: string;
  slug?: string;
  count?: number;
  unavailable?: boolean;
};

type SidebarNavGroup = SidebarNavItem & {
  items?: SidebarNavItem[];
};

type StaticPlace = {
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
};

type StaticContentResponse = {
  categories: CategoryOption[];
  data: Record<string, StaticPlace[]>;
};

type SaveResponse = {
  categorySlug: string;
  dbSynced: boolean;
  item: StaticPlace;
};

type UploadImageResponse = {
  url: string;
  size: number;
  type: string;
};

type ImageField = 'imageUrl' | 'imageBanner' | 'iconUrl';

const tokenCookie = useCookie<string | null>('auth_token');
const userCookie = useCookie<UserInfo | string | null>('user_info');
const maxUploadImageSize = 8 * 1024 * 1024;
const allowedUploadMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/x-icon',
  'image/vnd.microsoft.icon',
]);
const allowedUploadExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.ico']);

const parseUserInfo = (value: UserInfo | string | null | undefined): UserInfo | null => {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as UserInfo;
    } catch {
      return null;
    }
  }

  return value;
};

const currentUser = computed(() => parseUserInfo(userCookie.value));
const isAllowed = computed(() => Boolean(tokenCookie.value && currentUser.value?.vai_tro === 'admin'));

if (!tokenCookie.value) {
  await navigateTo('/login');
} else if (currentUser.value?.vai_tro !== 'admin') {
  await navigateTo('/ho-so');
}

useHead({
  title: 'Quản lý nội dung tĩnh - Đại Mỗ 360',
});

const contentData = ref<Record<string, StaticPlace[]>>({});
const categories = ref<CategoryOption[]>([]);
const selectedCategory = ref('di-tich');
const selectedIdentity = ref<{ categorySlug: string; slug: string } | null>(null);
const selectedSnapshot = ref<StaticPlace | null>(null);
const loading = ref(false);
const saving = ref(false);
const searchQuery = ref('');
const statusMessage = ref('');
const statusIsWarning = ref(false);
const activeSidebarMenu = ref<string | null>(null);
const categoryPickerRef = ref<HTMLElement | null>(null);
const uploadingImageField = ref<ImageField | null>(null);

const form = reactive({
  key: '',
  categorySlug: 'di-tich',
  slug: '',
  name: '',
  imageUrl: '',
  imageBanner: '',
  address: '',
  phoneNumber: '',
  email: '',
  website: '',
  lat: '',
  lng: '',
  map: '',
  iconUrl: '',
  path360: '',
  type: '',
  amenitiesText: '',
  content: '',
});

const currentCategoryLabel = computed(() => {
  return categories.value.find((category) => category.slug === selectedCategory.value)?.label || selectedCategory.value;
});

const currentCategoryCount = computed(() => {
  return categories.value.find((category) => category.slug === selectedCategory.value)?.count || 0;
});

const destinationCategorySlugs = [
  'di-tich',
  'danh-lam',
  'lang-nghe',
  'co-quan-hanh-chinh',
  'trung-tam-hoi-nghi-su-kien',
];
const guideCategorySlugs = ['khach-san', 'nha-hang', 'dich-vu-ho-tro-du-lich'];

const sidebarNavGroups = computed<SidebarNavGroup[]>(() => {
  const destinationItems = destinationCategorySlugs.map((slug) => categoryNavItem(slug));
  const guideItems = guideCategorySlugs.map((slug) => categoryNavItem(slug));
  const eventItem = categoryNavItem('le-hoi', 'Sự kiện');

  return [
    {
      key: 'destinations',
      label: 'Điểm đến',
      count: sumNavCount(destinationItems),
      items: destinationItems,
    },
    {
      key: 'events',
      label: 'Sự kiện',
      slug: eventItem.slug,
      count: eventItem.count,
    },
    {
      key: 'guide',
      label: 'Cẩm nang du lịch',
      count: sumNavCount(guideItems),
      items: guideItems,
    },
    { key: 'news', label: 'Tin tức', unavailable: true },
    { key: 'travel-tour', label: 'Tour du lịch', unavailable: true },
    { key: 'map', label: 'Bản đồ', unavailable: true },
    {
      key: 'exhibition',
      label: 'Triển lãm',
      items: [
        { key: 'exhibition-thang-long', label: 'Đại lộ Thăng Long', unavailable: true },
        { key: 'exhibition-me-tri', label: 'Hồ Mễ Trì', unavailable: true },
      ],
    },
  ];
});

const selectedItemLabel = computed(() => {
  if (!selectedIdentity.value) {
    return 'Tạo nội dung mới';
  }

  return form.name || selectedIdentity.value.slug;
});

const selectedItemValue = computed(() => {
  if (!selectedIdentity.value) {
    return '';
  }

  return `${selectedIdentity.value.categorySlug}::${selectedIdentity.value.slug}`;
});

const publishedItem = computed(() => {
  if (selectedSnapshot.value) {
    return selectedSnapshot.value;
  }

  if (!selectedIdentity.value) {
    return null;
  }

  return contentData.value[selectedIdentity.value.categorySlug]?.find(
    (item) => item.slug === selectedIdentity.value?.slug,
  ) || null;
});

const publishedPreviewImage = computed(() => {
  return publishedItem.value?.imageUrl || publishedItem.value?.imageBanner || '';
});

const publishedAmenities = computed(() => {
  return publishedItem.value?.amenities?.filter(Boolean) || [];
});

const isUploadingImage = computed(() => Boolean(uploadingImageField.value));

const filteredItems = computed(() => {
  const items = contentData.value[selectedCategory.value] || [];
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return items;
  }

  return items.filter((item) => {
    return [item.name, item.slug, item.address]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  });
});

function slugify(input: string) {
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

function getTypeForCategory(categorySlug: string) {
  return categories.value.find((category) => category.slug === categorySlug)?.typeId || '';
}

function categoryNavItem(slug: string, fallbackLabel?: string): SidebarNavItem {
  const category = categories.value.find((item) => item.slug === slug);

  return {
    key: slug,
    label: category?.label || fallbackLabel || slug,
    slug,
    count: category?.count || 0,
  };
}

function sumNavCount(items: SidebarNavItem[]) {
  return items.reduce((total, item) => total + (item.count || 0), 0);
}

function isSidebarGroupActive(group: SidebarNavGroup) {
  if (group.slug) {
    return selectedCategory.value === group.slug;
  }

  return Boolean(group.items?.some((item) => item.slug === selectedCategory.value));
}

function showUnavailableNav(label: string) {
  activeSidebarMenu.value = null;
  statusIsWarning.value = true;
  statusMessage.value = `Nhóm "${label}" chưa có dữ liệu chỉnh sửa trong allMockData.json.`;
}

function handleSidebarGroupClick(group: SidebarNavGroup) {
  if (group.items?.length) {
    activeSidebarMenu.value = activeSidebarMenu.value === group.key ? null : group.key;
    return;
  }

  if (group.slug) {
    selectCategory(group.slug);
    return;
  }

  showUnavailableNav(group.label);
}

function handleSidebarItemClick(item: SidebarNavItem) {
  if (item.slug) {
    selectCategory(item.slug);
    return;
  }

  showUnavailableNav(item.label);
}

function cloneStaticPlace(item: StaticPlace): StaticPlace {
  return {
    ...item,
    amenities: Array.isArray(item.amenities) ? [...item.amenities] : undefined,
  };
}

function assignForm(item: StaticPlace, categorySlug: string) {
  form.key = item.key ? String(item.key) : '';
  form.categorySlug = categorySlug;
  form.slug = item.slug || '';
  form.name = item.name || '';
  form.imageUrl = item.imageUrl || '';
  form.imageBanner = item.imageBanner || '';
  form.address = item.address || '';
  form.phoneNumber = item.phoneNumber || '';
  form.email = item.email || '';
  form.website = item.website || '';
  form.lat = item.lat === null || item.lat === undefined ? '' : String(item.lat);
  form.lng = item.lng === null || item.lng === undefined ? '' : String(item.lng);
  form.map = item.map || '';
  form.iconUrl = item.iconUrl || '';
  form.path360 = item.path360 || '';
  form.type = item.type === null || item.type === undefined ? String(getTypeForCategory(categorySlug)) : String(item.type);
  form.amenitiesText = Array.isArray(item.amenities) ? item.amenities.join('\n') : '';
  form.content = item.content || '';
}

function openItem(categorySlug: string, item: StaticPlace) {
  selectedCategory.value = categorySlug;
  selectedIdentity.value = { categorySlug, slug: item.slug };
  selectedSnapshot.value = cloneStaticPlace(item);
  assignForm(item, categorySlug);
}

function clearForm(categorySlug = selectedCategory.value) {
  selectedIdentity.value = null;
  selectedSnapshot.value = null;
  form.key = '';
  form.categorySlug = categorySlug;
  form.slug = '';
  form.name = '';
  form.imageUrl = '';
  form.imageBanner = '';
  form.address = '';
  form.phoneNumber = '';
  form.email = '';
  form.website = '';
  form.lat = '';
  form.lng = '';
  form.map = '';
  form.iconUrl = '';
  form.path360 = '';
  form.type = String(getTypeForCategory(categorySlug));
  form.amenitiesText = '';
  form.content = '';
}

function selectCategory(categorySlug: string) {
  selectedCategory.value = categorySlug;
  const firstItem = contentData.value[categorySlug]?.[0];

  if (firstItem) {
    openItem(categorySlug, firstItem);
  } else {
    clearForm(categorySlug);
  }
}

function selectItemByValue(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  if (!value) {
    startCreate();
    return;
  }

  const [categorySlug, slug] = value.split('::');
  const item = contentData.value[categorySlug]?.find((entry) => entry.slug === slug);
  if (item) {
    openItem(categorySlug, item);
  }
}

function startCreate() {
  clearForm(selectedCategory.value);
}

function fillSlugFromName() {
  if (!form.slug && form.name) {
    form.slug = slugify(form.name);
  }
}

function uploadButtonLabel(field: ImageField) {
  return uploadingImageField.value === field ? 'Đang tải' : 'Thêm ảnh';
}

function validateImageFile(file: File) {
  const extension = file.name.includes('.') ? `.${file.name.split('.').pop()?.toLowerCase()}` : '';

  if (file.size > maxUploadImageSize) {
    return 'Ảnh không được vượt quá 8MB.';
  }

  if (!allowedUploadMimeTypes.has(file.type) && !allowedUploadExtensions.has(extension)) {
    return 'Chỉ hỗ trợ ảnh JPG, PNG, WEBP, GIF hoặc ICO.';
  }

  return '';
}

async function uploadImage(event: Event, field: ImageField) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) {
    return;
  }

  const validationError = validateImageFile(file);
  if (validationError) {
    statusIsWarning.value = true;
    statusMessage.value = validationError;
    input.value = '';
    return;
  }

  uploadingImageField.value = field;
  statusMessage.value = '';
  statusIsWarning.value = false;

  try {
    const body = new FormData();
    const uploadSlug = form.slug || slugify(form.name || selectedIdentity.value?.slug || 'hinh-anh');

    body.append('file', file);
    body.append('categorySlug', form.categorySlug || selectedCategory.value);
    body.append('slug', uploadSlug);

    const response = await $fetch<UploadImageResponse>('/api/static-content/upload', {
      method: 'POST',
      body,
    });

    form[field] = response.url;

    if (selectedIdentity.value && form.name) {
      await saveItem();
      return;
    }

    statusMessage.value = 'Đã tải ảnh lên. Bấm Lưu nội dung để ghi đường dẫn vào database.';
  } catch (error: any) {
    statusIsWarning.value = true;
    statusMessage.value = error?.data?.statusMessage || 'Không tải được ảnh lên.';
  } finally {
    uploadingImageField.value = null;
    input.value = '';
  }
}

function resetCurrentForm() {
  if (selectedIdentity.value && selectedSnapshot.value) {
    assignForm(selectedSnapshot.value, selectedIdentity.value.categorySlug);
    return;
  }

  clearForm(form.categorySlug);
}

function buildPayload() {
  return {
    key: form.key,
    categorySlug: form.categorySlug,
    slug: form.slug || slugify(form.name),
    name: form.name,
    imageUrl: form.imageUrl,
    imageBanner: form.imageBanner,
    address: form.address,
    phoneNumber: form.phoneNumber,
    email: form.email,
    website: form.website,
    lat: form.lat,
    lng: form.lng,
    map: form.map,
    iconUrl: form.iconUrl,
    path360: form.path360,
    type: form.type,
    amenitiesText: form.amenitiesText,
    content: form.content,
  };
}

async function loadContent() {
  loading.value = true;
  statusMessage.value = '';
  statusIsWarning.value = false;

  try {
    const response = await $fetch<StaticContentResponse>('/api/static-content');
    contentData.value = response.data;
    categories.value = response.categories;

    if (!categories.value.some((category) => category.slug === selectedCategory.value)) {
      selectedCategory.value = categories.value[0]?.slug || 'di-tich';
    }

    if (selectedIdentity.value) {
      const current = contentData.value[selectedIdentity.value.categorySlug]?.find(
        (item) => item.slug === selectedIdentity.value?.slug,
      );
      if (current) {
        openItem(selectedIdentity.value.categorySlug, current);
        return;
      }
    }

    const firstItem = contentData.value[selectedCategory.value]?.[0];
    if (firstItem) {
      openItem(selectedCategory.value, firstItem);
    } else {
      clearForm(selectedCategory.value);
    }
  } catch (error: any) {
    statusIsWarning.value = true;
    statusMessage.value = error?.data?.statusMessage || 'Không tải được nội dung tĩnh.';
  } finally {
    loading.value = false;
  }
}

async function saveItem() {
  saving.value = true;
  statusMessage.value = '';
  statusIsWarning.value = false;

  try {
    const payload = buildPayload();
    const response = selectedIdentity.value
      ? await $fetch<SaveResponse>(
        `/api/static-content/${selectedIdentity.value.categorySlug}/${selectedIdentity.value.slug}`,
        { method: 'PUT', body: payload },
      )
      : await $fetch<SaveResponse>('/api/static-content', { method: 'POST', body: payload });

    selectedCategory.value = response.categorySlug;
    selectedIdentity.value = { categorySlug: response.categorySlug, slug: response.item.slug };
    statusIsWarning.value = !response.dbSynced;
    statusMessage.value = response.dbSynced
      ? 'Đã lưu nội dung và đồng bộ database.'
      : 'Đã lưu nội dung tĩnh, nhưng database chưa đồng bộ được.';

    await loadContent();
  } catch (error: any) {
    statusIsWarning.value = true;
    statusMessage.value = error?.data?.statusMessage || 'Không lưu được nội dung.';
  } finally {
    saving.value = false;
  }
}

async function deleteItem() {
  if (!selectedIdentity.value || saving.value) {
    return;
  }

  const accepted = window.confirm(`Xóa "${form.name || selectedIdentity.value.slug}"?`);
  if (!accepted) {
    return;
  }

  saving.value = true;
  statusMessage.value = '';
  statusIsWarning.value = false;

  try {
    const current = selectedIdentity.value;
    const response = await $fetch<{ dbSynced: boolean }>(
      `/api/static-content/${current.categorySlug}/${current.slug}`,
      { method: 'DELETE' },
    );
    statusIsWarning.value = !response.dbSynced;
    statusMessage.value = response.dbSynced
      ? 'Đã xóa nội dung và cập nhật database.'
      : 'Đã xóa nội dung tĩnh, nhưng database chưa cập nhật được.';
    selectedIdentity.value = null;
    await loadContent();
  } catch (error: any) {
    statusIsWarning.value = true;
    statusMessage.value = error?.data?.statusMessage || 'Không xóa được nội dung.';
  } finally {
    saving.value = false;
  }
}

function closeNavOutside(event: MouseEvent) {
  if (categoryPickerRef.value && !categoryPickerRef.value.contains(event.target as Node)) {
    activeSidebarMenu.value = null;
  }
}

onMounted(() => {
  loadContent();
  document.addEventListener('click', closeNavOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeNavOutside);
});
</script>

<style scoped>
.content-admin {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  background: #f5f7f4;
  color: #172523;
}

.content-sidebar {
  background: #0f1716;
  color: #fff;
  padding: 22px 18px;
  overflow: auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  color: #dce8e2;
  font-weight: 800;
  text-decoration: none;
  margin-bottom: 22px;
}

.back-link:hover {
  color: #f3c46d;
}

.sidebar-heading p,
.content-header p {
  margin: 0 0 6px;
  color: #b77a20;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
}

.sidebar-heading h1,
.content-header h2 {
  margin: 0;
}

.sidebar-heading h1 {
  font-size: 25px;
}

.editor-panel input,
.editor-panel select,
.editor-panel textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cad7d2;
  border-radius: 6px;
  background: #fff;
  color: #111827;
  font: inherit;
  padding: 10px 11px;
}

.sidebar-category {
  position: relative;
}

.sidebar-nav-stack {
  display: grid;
  gap: 8px;
}

.sidebar-nav-group {
  position: relative;
}

.sidebar-category-label {
  display: block;
  color: #dce8e2;
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 8px;
}

.sidebar-category-trigger {
  width: 100%;
  min-height: 48px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 9px;
  align-items: center;
  border: 0;
  border-radius: 6px;
  background: #1f5f58;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  padding: 10px 12px;
  text-align: left;
}

.sidebar-category-trigger:hover,
.sidebar-category-trigger.active,
.sidebar-category-trigger[aria-expanded='true'] {
  background: #247169;
}

.sidebar-category-trigger span:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar-category-trigger small,
.sidebar-category-dropdown small {
  display: grid;
  place-items: center;
  min-width: 28px;
  height: 24px;
  border-radius: 999px;
  font-size: 13px;
}

.sidebar-category-trigger small {
  background: rgba(255, 255, 255, 0.17);
}

.sidebar-caret {
  color: #dce8e2;
  font-size: 12px;
  line-height: 1;
}

.sidebar-category-dropdown {
  position: static;
  display: grid;
  gap: 2px;
  margin: 6px 0 4px;
  padding-left: 10px;
  overflow: visible;
}

.sidebar-category-dropdown::before {
  display: none;
}

.sidebar-category-dropdown button {
  position: relative;
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #dce8e2;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  padding: 9px 10px 9px 14px;
  text-align: left;
}

.sidebar-category-dropdown button:first-child {
  color: #dce8e2;
}

.sidebar-category-dropdown button:last-child {
  border-bottom: 0;
}

.sidebar-category-dropdown button:hover,
.sidebar-category-dropdown button.active {
  background: rgba(36, 113, 105, 0.42);
  color: #fff;
}

.sidebar-category-dropdown small {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.content-main {
  min-width: 0;
  padding: 26px;
  overflow: auto;
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.content-header h2 {
  color: #142c29;
  font-size: 30px;
}

.header-actions,
.editor-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.header-actions button,
.editor-actions button {
  border: 0;
  border-radius: 6px;
  background: #0f766e;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 900;
  min-height: 40px;
  padding: 9px 13px;
}

.header-actions .ghost-button,
.editor-actions .ghost-button {
  background: #e5ece8;
  color: #172523;
}

.editor-actions .danger-button {
  background: #b42318;
}

.editor-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.status-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid #b8dfd5;
  border-radius: 8px;
  background: #e6f7f1;
  color: #0f4e48;
  font-weight: 800;
  margin-bottom: 16px;
  padding: 12px 14px;
}

.status-message.warning {
  border-color: #f1c27d;
  background: #fff5e3;
  color: #7c4a13;
}

.status-message button {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-weight: 900;
}

.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.workspace.has-published {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.editor-panel,
.published-panel {
  border: 1px solid #d8e3de;
  border-radius: 8px;
  background: #fff;
}

.empty-state {
  display: grid;
  place-items: center;
  min-height: 180px;
  color: #65756f;
  font-weight: 800;
}

.editor-panel {
  padding: 18px;
}

.published-panel {
  position: sticky;
  top: 18px;
  max-height: calc(100vh - 52px);
  overflow: auto;
  padding: 18px;
  background-color: #fff;
  background-image: url('/images/pattern.jpg');
  background-position: center;
  background-repeat: repeat;
  background-size: 680px 430px;
}

.preview-badge {
  width: fit-content;
  border: 1px solid #d8e3de;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #0f766e;
  font-size: 12px;
  font-weight: 900;
  margin-bottom: 14px;
  padding: 6px 10px;
  text-transform: uppercase;
}

.preview-head {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(190px, 1.05fr);
  gap: 18px;
  align-items: start;
  margin-bottom: 24px;
}

.preview-intro {
  min-width: 0;
}

.preview-intro h3 {
  color: #171717;
  font-size: 22px;
  line-height: 1.25;
  margin: 0 0 10px;
}

.preview-info {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  color: #4b5563;
  font-size: 13px;
  line-height: 1.45;
  margin: 0 0 8px;
}

.preview-info span {
  color: #6b7280;
  flex: 0 0 auto;
}

.preview-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.preview-action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
  min-height: 32px;
  padding: 0 11px;
}

.preview-action.favorite {
  border: 1px solid #0d6efd;
  background: #fff;
  color: #0d6efd;
}

.preview-action.share {
  border: 1px solid #0d6efd;
  background: #0d6efd;
  color: #fff;
}

.preview-image {
  width: 100%;
  aspect-ratio: 16 / 10;
  border: 1px solid #d8e3de;
  border-radius: 6px;
  background: #edf3f0;
  object-fit: cover;
}

.placeholder-image {
  display: grid;
  place-items: center;
  color: #708079;
  font-weight: 900;
}

.preview-section {
  margin-top: 22px;
}

.preview-section h4 {
  color: #171717;
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 0;
  margin: 0 0 10px;
}

.preview-content {
  color: #111827;
  font-size: 15px;
  line-height: 1.72;
  margin: 0;
  overflow-wrap: anywhere;
  text-align: justify;
  white-space: pre-wrap;
}

.preview-contact {
  border-top: 1px solid rgba(216, 227, 222, 0.9);
  padding-top: 16px;
}

.preview-contact p {
  color: #34423e;
  font-size: 14px;
  line-height: 1.55;
  margin: 0 0 6px;
  overflow-wrap: anywhere;
}

.preview-amenities {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.preview-amenities span {
  color: #34423e;
  font-size: 14px;
  line-height: 1.45;
  padding-left: 18px;
  position: relative;
}

.preview-amenities span::before {
  content: '✓';
  color: #0f766e;
  font-weight: 900;
  left: 0;
  position: absolute;
  top: 0;
}

.muted-text {
  color: #708079;
}

.editor-toolbar {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) auto;
  gap: 14px;
  align-items: end;
  border-bottom: 1px solid #e4ebe7;
  margin-bottom: 16px;
  padding-bottom: 16px;
}

.editor-toolbar strong {
  display: inline-grid;
  place-items: center;
  min-height: 40px;
  border-radius: 999px;
  background: #e8f4f1;
  color: #0f766e;
  padding: 0 14px;
  white-space: nowrap;
}

.item-selector {
  min-width: 0;
}

.compact-state {
  min-height: 56px;
  margin-bottom: 14px;
}

.editor-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.editor-panel label {
  display: grid;
  gap: 7px;
  color: #34423e;
  font-weight: 900;
}

.form-field {
  display: grid;
  gap: 7px;
  color: #34423e;
  font-weight: 900;
}

.form-field > label {
  display: block;
}

.field-label {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
}

.required-mark {
  color: #b42318;
  font-weight: 900;
}

.image-upload-control {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  align-items: stretch;
}

.upload-button {
  min-width: 112px;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  border: 1px solid #0f766e;
  border-radius: 6px;
  background: #0f766e;
  color: #fff !important;
  cursor: pointer;
  font: inherit;
  font-weight: 900;
  padding: 0 12px;
  text-align: center;
  white-space: nowrap;
}

.upload-button:hover {
  background: #115e59;
}

.upload-button.disabled {
  cursor: not-allowed;
  opacity: 0.55;
  pointer-events: none;
}

.upload-button input {
  display: none;
}

.wide-field {
  grid-column: 1 / -1;
}

.editor-panel textarea {
  resize: vertical;
}

.editor-actions {
  justify-content: flex-end;
  margin-top: 16px;
}

@media (max-width: 1120px) {
  .content-admin {
    grid-template-columns: 1fr;
  }

  .content-sidebar {
    max-height: none;
  }

  .workspace.has-published {
    grid-template-columns: 1fr;
  }

  .published-panel {
    position: static;
    max-height: none;
  }
}

@media (max-width: 680px) {
  .content-main {
    padding: 18px;
  }

  .content-header,
  .status-message {
    align-items: flex-start;
    flex-direction: column;
  }

  .editor-toolbar {
    grid-template-columns: 1fr;
  }

  .editor-grid {
    grid-template-columns: 1fr;
  }

  .image-upload-control {
    grid-template-columns: 1fr;
  }

  .upload-button {
    min-height: 40px;
  }

  .preview-head,
  .preview-amenities {
    grid-template-columns: 1fr;
  }
}
</style>
