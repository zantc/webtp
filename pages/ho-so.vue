<template>
  <div v-if="isLoggedIn" class="profile-page">
    <aside class="profile-sidebar">
      <div class="profile-summary">
        <div
          class="avatar-preview"
          :style="avatarStyle"
          aria-label="Ảnh đại diện"
        >
          <span v-if="!editableAvatar">{{ avatarInitial }}</span>
        </div>
        <h1>{{ displayName }}</h1>
        <p>{{ currentUser?.ten_dang_nhap || 'Tài khoản' }}</p>
        <span class="role-badge" :class="currentUser?.vai_tro">
          {{ currentUser?.vai_tro === 'admin' ? 'Quản trị viên' : 'Thành viên' }}
        </span>
      </div>

      <nav class="profile-tabs" aria-label="Hồ sơ">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </nav>
    </aside>

    <section class="profile-content">
      <header class="content-header">
        <div>
          <p class="content-kicker">Không gian cá nhân</p>
          <h2>Chào, {{ displayName }}</h2>
        </div>
        <NuxtLink
          v-if="currentUser?.vai_tro === 'admin'"
          href="/admin-dashboard"
          class="admin-link"
        >
          Vào trang quản trị
        </NuxtLink>
      </header>

      <section v-if="activeTab === 'info'" class="profile-panel">
        <div class="panel-title">
          <h3>Thông tin cá nhân</h3>
          <span v-if="statusMessage">{{ statusMessage }}</span>
        </div>

        <form class="profile-form" @submit.prevent="saveProfile">
          <label>
            Họ tên
            <input v-model="editableName" type="text" required />
          </label>
          <label>
            Link avatar
            <input v-model="editableAvatar" type="url" placeholder="/images/Logo.png" />
          </label>
          <label>
            Tên đăng nhập
            <input :value="currentUser?.ten_dang_nhap || ''" type="text" disabled />
          </label>
          <button type="submit">Lưu hồ sơ</button>
        </form>
      </section>

      <section v-else-if="activeTab === 'security'" class="profile-panel">
        <div class="panel-title">
          <h3>Bảo mật</h3>
          <span v-if="passwordMessage">{{ passwordMessage }}</span>
        </div>

        <form class="profile-form" @submit.prevent="handlePasswordForm">
          <label>
            Mật khẩu hiện tại
            <input v-model="passwordForm.current" type="password" required />
          </label>
          <label>
            Mật khẩu mới
            <input v-model="passwordForm.next" type="password" minlength="6" required />
          </label>
          <label>
            Nhập lại mật khẩu mới
            <input v-model="passwordForm.confirm" type="password" minlength="6" required />
          </label>
          <button type="submit">Kiểm tra mật khẩu</button>
        </form>
      </section>

      <section v-else class="profile-panel">
        <div class="panel-title">
          <h3>Địa điểm đã lưu</h3>
          <span>{{ savedPlaces.length }} mục</span>
        </div>

        <div class="saved-grid">
          <article v-for="place in savedPlaces" :key="place.name" class="saved-place">
            <img :src="place.image" :alt="place.name" />
            <div>
              <strong>{{ place.name }}</strong>
              <span>{{ place.category }}</span>
              <NuxtLink :href="place.href">Xem chi tiết</NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <div class="profile-actions">
        <button class="logout-button" type="button" @click="handleLogout">
          Đăng xuất
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
type UserInfo = {
  id?: number;
  ten_dang_nhap?: string;
  ho_ten?: string;
  vai_tro?: string;
  avatar?: string;
}

type TabKey = 'info' | 'security' | 'saved';

const router = useRouter();
const route = useRoute();
const tokenCookie = useCookie<string | null>('auth_token');
const userCookie = useCookie<UserInfo | string | null>('user_info');

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
const isLoggedIn = computed(() => Boolean(tokenCookie.value && currentUser.value));
const displayName = computed(() => currentUser.value?.ho_ten || 'Người dùng');
const avatarInitial = computed(() => displayName.value.charAt(0).toUpperCase());
const editableName = ref('');
const editableAvatar = ref('');
const statusMessage = ref('');
const passwordMessage = ref('');
const activeTab = ref<TabKey>('info');
const tabKeys: TabKey[] = ['info', 'security', 'saved'];
const passwordForm = reactive({
  current: '',
  next: '',
  confirm: '',
});

if (!tokenCookie.value) {
  await navigateTo('/login');
}

watch(
  () => route.query.tab,
  (tab) => {
    activeTab.value = tabKeys.includes(tab as TabKey) ? tab as TabKey : 'info';
  },
  { immediate: true }
);

watch(
  currentUser,
  (user) => {
    editableName.value = user?.ho_ten || '';
    editableAvatar.value = user?.avatar || '';
  },
  { immediate: true }
);

const avatarStyle = computed(() => {
  if (!editableAvatar.value) {
    return {};
  }

  return {
    backgroundImage: `url("${editableAvatar.value}")`,
  };
});

const tabs: { key: TabKey; label: string }[] = [
  { key: 'info', label: 'Thông tin cá nhân' },
  { key: 'security', label: 'Bảo mật' },
  { key: 'saved', label: 'Địa điểm đã lưu' },
];

const savedPlaces = [
  {
    name: 'Chùa Phùng Khoang',
    category: 'Di tích văn hóa',
    image: '/images/banner/banner-chua-phung-khoang.jpg',
    href: '/di-tich/chua-phung-khoang',
  },
  {
    name: 'Đình Đại Mỗ',
    category: 'Danh lam, lịch sử',
    image: '/images/banner/banner-dinh-dai-mo.jpg',
    href: '/di-tich/dinh-dai-mo',
  },
  {
    name: 'Royal Louis Hotel',
    category: 'Khách sạn',
    image: '/images/khach-san/Khach-san-royal-louis.jpeg',
    href: '/khach-san/khach-san-royal-louis',
  },
];

const saveProfile = () => {
  const nextUser = {
    ...currentUser.value,
    ho_ten: editableName.value.trim(),
    avatar: editableAvatar.value.trim(),
  };

  userCookie.value = nextUser;
  statusMessage.value = 'Đã lưu thông tin hồ sơ.';
};

const handlePasswordForm = () => {
  if (passwordForm.next !== passwordForm.confirm) {
    passwordMessage.value = 'Mật khẩu mới chưa khớp.';
    return;
  }

  passwordForm.current = '';
  passwordForm.next = '';
  passwordForm.confirm = '';
  passwordMessage.value = 'Mật khẩu hợp lệ, chờ API cập nhật.';
};

const handleLogout = () => {
  tokenCookie.value = null;
  userCookie.value = null;
  router.push('/login');
};
</script>

<style scoped>
.profile-page {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
  min-height: 78vh;
  padding: 28px;
  background: #f5f7fa;
}

.profile-sidebar,
.profile-panel,
.profile-content {
  border: 1px solid #dfe7e3;
  border-radius: 8px;
  background: #fff;
}

.profile-sidebar {
  align-self: start;
  overflow: hidden;
}

.profile-summary {
  padding: 24px;
  text-align: center;
  background: linear-gradient(135deg, #105650, #1f7a66);
  color: #fff;
}

.avatar-preview {
  width: 88px;
  height: 88px;
  margin: 0 auto 14px;
  border: 3px solid #fff;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #d69e2e center / cover;
  color: #111827;
  font-size: 36px;
  font-weight: 800;
}

.profile-summary h1 {
  margin: 0 0 6px;
  font-size: 24px;
}

.profile-summary p {
  margin: 0 0 12px;
  opacity: 0.85;
}

.role-badge {
  display: inline-block;
  border-radius: 999px;
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.18);
  font-weight: 700;
}

.role-badge.admin {
  background: #fef3c7;
  color: #7c2d12;
}

.profile-tabs {
  display: grid;
  padding: 10px;
  gap: 6px;
}

.profile-tabs button {
  border: 0;
  border-radius: 6px;
  padding: 12px 14px;
  background: transparent;
  color: #21312f;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  text-align: left;
}

.profile-tabs button:hover,
.profile-tabs button.active {
  background: #e7f2ef;
  color: #0f766e;
}

.profile-content {
  padding: 24px;
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.content-kicker {
  margin: 0 0 4px;
  color: #8a5a13;
  font-weight: 700;
  text-transform: uppercase;
}

.content-header h2 {
  margin: 0;
  color: #173f3a;
  font-size: 30px;
}

.admin-link {
  border-radius: 6px;
  background: #111827;
  color: #fff;
  padding: 10px 13px;
  text-decoration: none;
  font-weight: 700;
}

.profile-panel {
  padding: 20px;
}

.panel-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.panel-title h3 {
  margin: 0;
  color: #173f3a;
  font-size: 22px;
}

.panel-title span {
  color: #0f766e;
  font-weight: 700;
}

.profile-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.profile-form label {
  display: grid;
  gap: 7px;
  color: #394541;
  font-weight: 700;
}

.profile-form input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 11px 12px;
  color: #111827;
  font: inherit;
}

.profile-form input:disabled {
  background: #f1f5f9;
  color: #64748b;
}

.profile-form button,
.logout-button {
  align-self: end;
  min-height: 42px;
  border: 0;
  border-radius: 6px;
  padding: 10px 14px;
  background: #0f766e;
  color: #fff;
  cursor: pointer;
  font-weight: 800;
}

.saved-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.saved-place {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.saved-place img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
}

.saved-place div {
  display: grid;
  gap: 6px;
  padding: 12px;
}

.saved-place strong {
  color: #173f3a;
}

.saved-place span {
  color: #64748b;
}

.saved-place a {
  color: #0f766e;
  font-weight: 700;
  text-decoration: none;
}

.profile-actions {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
}

.logout-button {
  background: #b91c1c;
}

@media (max-width: 920px) {
  .profile-page {
    grid-template-columns: 1fr;
    padding: 18px;
  }

  .profile-form,
  .saved-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .content-header,
  .panel-title {
    align-items: flex-start;
    flex-direction: column;
  }

  .profile-content {
    padding: 18px;
  }
}
</style>
