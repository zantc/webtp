<template>
  <div v-if="isAllowed" class="admin-dashboard">
    <header class="admin-topbar">
      <div class="admin-brand" aria-hidden="true"></div>

      <h1>BẢNG ĐIỀU KHIỂN</h1>

      <div class="admin-top-actions">
        <button type="button" aria-label="Cài đặt">
          <span aria-hidden="true">⚙</span>
        </button>
        <button type="button" aria-label="Ứng dụng">
          <span aria-hidden="true">▦</span>
        </button>
        <div class="admin-account">
          <button
            type="button"
            class="admin-user"
            :aria-expanded="adminAccountOpen"
            @click.stop="adminAccountOpen = !adminAccountOpen"
          >
            <span class="admin-avatar">{{ avatarInitial }}</span>
            <span class="admin-user-text">
              <strong>{{ currentUser?.ho_ten || 'Quản trị viên' }}</strong>
              <span>{{ currentUser?.ten_dang_nhap || 'admin' }}</span>
            </span>
            <span class="admin-caret">▾</span>
          </button>
          <div v-if="adminAccountOpen" class="admin-account-dropdown">
            <button type="button" @click="goToAccountPage('/ho-so')">Thông tin cá nhân</button>
            <button type="button" @click="goToAccountPage('/ho-so?tab=security')">Đổi mật khẩu</button>
            <button type="button" @click="handleAdminLogout">Đăng xuất</button>
          </div>
        </div>
      </div>
    </header>

    <div class="admin-shell">
      <aside class="admin-sidebar">
        <nav class="admin-menu" aria-label="Admin">
          <button
            v-for="item in menuItems"
            :key="item.key"
            type="button"
            :class="{ active: activeSection === item.key }"
            @click="selectSection(item.key)"
          >
            <span>{{ item.label }}</span>
            <span class="menu-caret" aria-hidden="true">▾</span>
          </button>
        </nav>
      </aside>

      <section class="admin-main">
        <nav class="admin-tabs" aria-label="Điều hướng nhanh">
          <button
            v-for="tab in topTabs"
            :key="tab.label"
            type="button"
            :class="{ active: activeSection === tab.section }"
            @click="selectSection(tab.section)"
          >
            {{ tab.label }}
          </button>
          <NuxtLink href="/" class="visit-site">Xem website</NuxtLink>
        </nav>

        <div class="admin-content">
          <div class="content-heading">
            <p class="admin-eyebrow">{{ activeMenu.eyebrow }}</p>
            <h2>{{ activeMenu.label }}</h2>
          </div>

          <div v-if="statusMessage" class="status-message">
            {{ statusMessage }}
            <button type="button" @click="statusMessage = ''">Đóng</button>
          </div>

          <template v-if="activeSection === 'overview'">
            <section class="metric-grid" aria-label="Thống kê">
              <button
                v-for="(metric, index) in metrics"
                :key="metric.label"
                type="button"
                class="metric-card"
                @click="selectSection(metric.target)"
              >
                <span class="metric-visual" :class="`visual-${index + 1}`" aria-hidden="true"></span>
                <span class="metric-copy">
                  <span>{{ metric.label }}</span>
                  <strong>{{ metric.value }}</strong>
                  <small>{{ metric.note }}</small>
                </span>
              </button>
            </section>

            <section class="admin-panels">
              <article class="admin-panel">
                <div class="panel-header">
                  <h2>Việc cần xử lý</h2>
                  <button type="button" class="text-button" @click="selectSection('tasks')">
                    Xem tất cả
                  </button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Hạng mục</th>
                      <th>Trạng thái</th>
                      <th>Ưu tiên</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="task in tasks" :key="task.name">
                      <td>{{ task.name }}</td>
                      <td>{{ task.status }}</td>
                      <td>{{ task.priority }}</td>
                      <td>
                        <button type="button" class="row-action" @click="openTask(task)">
                          Xử lý
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </article>

              <article class="admin-panel">
                <div class="panel-header">
                  <h2>Phân hệ quản lý</h2>
                </div>
                <div class="module-list">
                  <button
                    v-for="module in modules"
                    :key="module.title"
                    type="button"
                    class="module-row"
                    @click="selectSection(module.target)"
                  >
                    <strong>{{ module.title }}</strong>
                    <span>{{ module.description }}</span>
                  </button>
                </div>
              </article>
            </section>
          </template>

          <section v-else-if="activeSection === 'tasks'" class="admin-panel">
            <div class="panel-header">
              <h2>Danh sách công việc</h2>
              <button type="button" class="text-button" @click="selectSection('overview')">
                Về tổng quan
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Hạng mục</th>
                  <th>Trạng thái</th>
                  <th>Ưu tiên</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in tasks" :key="task.name">
                  <td>{{ task.name }}</td>
                  <td>{{ task.status }}</td>
                  <td>{{ task.priority }}</td>
                  <td>
                    <button type="button" class="row-action" @click="openTask(task)">
                      Cập nhật
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section v-else-if="activeSection === 'content'" class="content-manager-frame">
            <iframe
              title="Quản lý nội dung tĩnh"
              src="/admin-content?embedded=1"
              loading="lazy"
            ></iframe>
          </section>

          <section v-else class="section-grid">
            <article
              v-for="row in activeRows"
              :key="row.title"
              class="section-card"
            >
              <span>{{ row.meta }}</span>
              <h2>{{ row.title }}</h2>
              <p>{{ row.description }}</p>
              <button type="button" @click="handleSectionAction(row.action)">
                {{ row.actionLabel }}
              </button>
            </article>
          </section>
        </div>
      </section>
    </div>

    <div v-if="activeModal" class="modal-backdrop" @click.self="closeModal">
      <form class="modal-card" @submit.prevent="submitModal">
        <div class="modal-header">
          <div>
            <p>{{ modalCopy.eyebrow }}</p>
            <h2>{{ modalCopy.title }}</h2>
          </div>
          <button type="button" class="modal-close" @click="closeModal">x</button>
        </div>

        <label v-if="activeModal !== 'task'">
          {{ modalCopy.primaryLabel }}
          <input v-model="modalForm.name" type="text" required />
        </label>

        <label v-if="activeModal !== 'task'">
          {{ modalCopy.secondaryLabel }}
          <input v-model="modalForm.secondary" type="text" required />
        </label>

        <label v-if="activeModal === 'task'">
          Trạng thái
          <select v-model="modalForm.status">
            <option>Đang chờ</option>
            <option>Đang làm</option>
            <option>Đã xử lý</option>
          </select>
        </label>

        <label>
          Ghi chú
          <textarea v-model="modalForm.note" rows="4" />
        </label>

        <div class="modal-actions">
          <button type="button" class="ghost-button" @click="closeModal">Hủy</button>
          <button type="submit">Lưu</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
type UserInfo = {
  id?: number;
  ten_dang_nhap?: string;
  ho_ten?: string;
  vai_tro?: string;
}

type AdminSection = 'overview' | 'content' | 'vr' | 'places' | 'hotels' | 'comments' | 'users' | 'settings' | 'tasks';
type ModalMode = 'place' | 'hotel' | 'menu' | 'task' | null;

type TaskItem = {
  name: string;
  status: string;
  priority: string;
}

type SectionRow = {
  title: string;
  meta: string;
  description: string;
  action: 'content' | 'place' | 'hotel' | 'menu' | 'task' | 'notify';
  actionLabel: string;
}

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
const isAllowed = computed(() => Boolean(tokenCookie.value && currentUser.value?.vai_tro === 'admin'));
const avatarInitial = computed(() => currentUser.value?.ho_ten?.charAt(0).toUpperCase() || 'A');
const activeSection = ref<AdminSection>('overview');
const activeModal = ref<ModalMode>(null);
const selectedTask = ref<TaskItem | null>(null);
const statusMessage = ref('');
const adminAccountOpen = ref(false);
const modalForm = reactive({
  name: '',
  secondary: '',
  status: 'Đang làm',
  note: '',
});

if (!tokenCookie.value) {
  await navigateTo('/login');
} else if (currentUser.value?.vai_tro !== 'admin') {
  await navigateTo('/ho-so');
}

useHead({
  title: 'Trang quản trị - Đại Mỗ 360',
});

const menuItems: { key: AdminSection; label: string; eyebrow: string }[] = [
  { key: 'overview', label: 'Tổng quan hệ thống', eyebrow: 'Trang quản trị' },
  { key: 'content', label: 'Nội dung tĩnh', eyebrow: 'Chỉnh sửa dữ liệu' },
  { key: 'vr', label: 'Không gian VR', eyebrow: 'Quản lý lõi' },
  { key: 'places', label: 'Điểm đến', eyebrow: 'Nội dung du lịch' },
  { key: 'hotels', label: 'Khách sạn', eyebrow: 'Dịch vụ lưu trú' },
  { key: 'comments', label: 'Bình luận', eyebrow: 'Tương tác' },
  { key: 'users', label: 'Tài khoản', eyebrow: 'Người dùng' },
  { key: 'settings', label: 'Cấu hình menu', eyebrow: 'Cài đặt' },
];

const topTabs: { label: string; section: AdminSection }[] = [
  { label: 'Trang chủ', section: 'overview' },
  { label: 'Quản lý', section: 'content' },
  { label: 'Giao diện', section: 'settings' },
  { label: 'Hệ thống', section: 'tasks' },
  { label: 'Thông tin cá nhân', section: 'users' },
];

const activeMenu = computed(() => {
  return menuItems.find((item) => item.key === activeSection.value)
    || { label: 'Danh sách công việc', eyebrow: 'Theo dõi xử lý' };
});

const metrics: { label: string; value: string; note: string; target: AdminSection }[] = [
  { label: 'Địa điểm', value: '24', note: 'Di tích, danh lam, dịch vụ', target: 'places' },
  { label: 'Ảnh 360', value: '08', note: 'Panorama đang hoạt động', target: 'vr' },
  { label: 'Bình luận chờ duyệt', value: '12', note: 'Cần phản hồi trong ngày', target: 'comments' },
  { label: 'Tài khoản', value: '156', note: 'User và quản trị viên', target: 'users' },
];

const tasks = ref<TaskItem[]>([
  { name: 'Duyệt bình luận mới', status: 'Đang chờ', priority: 'Cao' },
  { name: 'Cập nhật bản đồ Chùa Phùng Khoang', status: 'Đang làm', priority: 'Cao' },
  { name: 'Kiểm tra ảnh panorama mới', status: 'Đang chờ', priority: 'Trung bình' },
  { name: 'Rà soát danh sách khách sạn', status: 'Mới', priority: 'Trung bình' },
]);

const modules: { title: string; description: string; target: AdminSection }[] = [
  {
    title: 'Biên tập nội dung tĩnh',
    description: 'Sửa dữ liệu địa điểm, khách sạn, nhà hàng và dịch vụ trong app.',
    target: 'content',
  },
  {
    title: 'Quản lý không gian VR',
    description: 'Thư viện panorama, tour builder và hotspot.',
    target: 'vr',
  },
  {
    title: 'Quản lý điểm đến',
    description: 'Bài viết, tọa độ bản đồ, hình ảnh và trạng thái hiển thị.',
    target: 'places',
  },
  {
    title: 'Quản lý tương tác',
    description: 'Duyệt bình luận, đánh giá và phản hồi từ khách tham quan.',
    target: 'comments',
  },
  {
    title: 'Cài đặt hệ thống',
    description: 'Tài khoản quản trị, phân quyền và cấu hình menu.',
    target: 'settings',
  },
];

const sectionRows: Record<Exclude<AdminSection, 'overview' | 'tasks'>, SectionRow[]> = {
  content: [
    {
      title: 'Trình chỉnh sửa nội dung',
      meta: 'allMockData.json',
      description: 'Cập nhật tên, ảnh, địa chỉ, tọa độ, nội dung bài viết và link 360.',
      action: 'content',
      actionLabel: 'Mở trình chỉnh sửa',
    },
    {
      title: 'Đồng bộ database',
      meta: 'Bảng dia_diem',
      description: 'Khi lưu nội dung, hệ thống cập nhật file tĩnh và đồng bộ bản ghi tương ứng.',
      action: 'content',
      actionLabel: 'Sửa nội dung',
    },
  ],
  vr: [
    {
      title: 'Thư viện panorama',
      meta: '8 ảnh đang hoạt động',
      description: 'Tải và kiểm tra các ảnh 360 trước khi gắn vào tour.',
      action: 'notify',
      actionLabel: 'Mở thư viện',
    },
    {
      title: 'Tour builder',
      meta: 'Hotspot và điều hướng',
      description: 'Nối các cảnh 360 và kiểm tra luồng tham quan.',
      action: 'notify',
      actionLabel: 'Mở trình dựng',
    },
  ],
  places: [
    {
      title: 'Di tích & danh lam',
      meta: '24 bản ghi',
      description: 'Quản lý bài viết, ảnh đại diện, tọa độ và trạng thái hiển thị.',
      action: 'place',
      actionLabel: 'Thêm địa điểm',
    },
    {
      title: 'Bản đồ địa điểm',
      meta: 'Tọa độ lat/lng',
      description: 'Rà soát ghim bản đồ và các liên kết xem đường đi.',
      action: 'notify',
      actionLabel: 'Mở bản đồ',
    },
  ],
  hotels: [
    {
      title: 'Danh bạ khách sạn',
      meta: 'Dịch vụ lưu trú',
      description: 'Cập nhật tiện nghi, số điện thoại và link đặt phòng.',
      action: 'hotel',
      actionLabel: 'Thêm khách sạn',
    },
    {
      title: 'Dịch vụ liên quan',
      meta: 'Nhà hàng, hỗ trợ',
      description: 'Kiểm tra các dịch vụ hỗ trợ du lịch quanh điểm đến.',
      action: 'notify',
      actionLabel: 'Kiểm tra dịch vụ',
    },
  ],
  comments: [
    {
      title: 'Bình luận chờ duyệt',
      meta: '12 mục',
      description: 'Duyệt, ẩn hoặc phản hồi các đánh giá mới từ user.',
      action: 'task',
      actionLabel: 'Xem việc cần xử lý',
    },
    {
      title: 'Báo cáo vi phạm',
      meta: 'Kiểm duyệt',
      description: 'Theo dõi nội dung bị báo cáo trong trang chi tiết.',
      action: 'notify',
      actionLabel: 'Mở báo cáo',
    },
  ],
  users: [
    {
      title: 'Danh sách tài khoản',
      meta: '156 tài khoản',
      description: 'Xem user, khóa tài khoản và kiểm tra quyền quản trị.',
      action: 'notify',
      actionLabel: 'Mở danh sách',
    },
    {
      title: 'Phân quyền admin',
      meta: 'Vai trò hệ thống',
      description: 'Cấp quyền hoặc thu hồi quyền quản trị khi cần.',
      action: 'notify',
      actionLabel: 'Cấu hình quyền',
    },
  ],
  settings: [
    {
      title: 'Thanh điều hướng',
      meta: 'Menu ngoài trang chủ',
      description: 'Tạo mới, sắp xếp và bật tắt các mục điều hướng.',
      action: 'menu',
      actionLabel: 'Tạo menu mới',
    },
    {
      title: 'Cấu hình hiển thị',
      meta: 'Website chính',
      description: 'Kiểm tra các nhãn, liên kết và shortcut trên admin bar.',
      action: 'notify',
      actionLabel: 'Kiểm tra cấu hình',
    },
  ],
};

const activeRows = computed(() => {
  if (activeSection.value === 'overview' || activeSection.value === 'tasks') {
    return [];
  }

  return sectionRows[activeSection.value];
});

const modalCopy = computed(() => {
  if (activeModal.value === 'hotel') {
    return {
      eyebrow: 'Dịch vụ lưu trú',
      title: 'Thêm khách sạn',
      primaryLabel: 'Tên khách sạn',
      secondaryLabel: 'Tiện nghi chính',
    };
  }

  if (activeModal.value === 'menu') {
    return {
      eyebrow: 'Cấu hình menu',
      title: 'Tạo menu mới',
      primaryLabel: 'Tên menu',
      secondaryLabel: 'Đường dẫn',
    };
  }

  if (activeModal.value === 'task') {
    return {
      eyebrow: 'Cập nhật công việc',
      title: selectedTask.value?.name || 'Xử lý công việc',
      primaryLabel: '',
      secondaryLabel: '',
    };
  }

  return {
    eyebrow: 'Nội dung điểm đến',
    title: 'Thêm địa điểm',
    primaryLabel: 'Tên địa điểm',
    secondaryLabel: 'Danh mục',
  };
});

const selectSection = (section: AdminSection) => {
  activeSection.value = section;
  statusMessage.value = '';
  adminAccountOpen.value = false;
};

const goToAccountPage = (path: string) => {
  adminAccountOpen.value = false;
  navigateTo(path);
};

const handleAdminLogout = () => {
  tokenCookie.value = null;
  userCookie.value = null;
  adminAccountOpen.value = false;
  navigateTo('/login');
};

const handleAdminAccountClickOutside = (event: MouseEvent) => {
  const accountMenu = document.querySelector('.admin-account');
  if (accountMenu && !accountMenu.contains(event.target as Node)) {
    adminAccountOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleAdminAccountClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleAdminAccountClickOutside));

const resetModalForm = () => {
  modalForm.name = '';
  modalForm.secondary = '';
  modalForm.status = selectedTask.value?.status || 'Đang làm';
  modalForm.note = '';
};

const openModal = (mode: Exclude<ModalMode, null>) => {
  selectedTask.value = null;
  activeModal.value = mode;
  resetModalForm();
};

const openTask = (task: TaskItem) => {
  selectedTask.value = task;
  activeModal.value = 'task';
  resetModalForm();
};

const closeModal = () => {
  activeModal.value = null;
  selectedTask.value = null;
};

const submitModal = () => {
  if (activeModal.value === 'task' && selectedTask.value) {
    selectedTask.value.status = modalForm.status;
    statusMessage.value = `Đã cập nhật "${selectedTask.value.name}" thành "${modalForm.status}".`;
    closeModal();
    return;
  }

  statusMessage.value = `Đã tạo bản nháp: ${modalForm.name}.`;
  closeModal();
};

const handleSectionAction = (action: SectionRow['action']) => {
  if (action === 'content') {
    navigateTo('/admin-content');
    return;
  }

  if (action === 'place' || action === 'hotel' || action === 'menu') {
    openModal(action);
    return;
  }

  if (action === 'task') {
    selectSection('tasks');
    return;
  }

  statusMessage.value = `Đã mở khu vực "${activeMenu.value.label}".`;
};
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  background: #f4f6f2;
  color: #182523;
}

.admin-sidebar {
  background: #101817;
  color: #fff;
  padding: 20px 16px;
}

.admin-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  margin-bottom: 28px;
}

.admin-brand img {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.admin-menu {
  display: grid;
  gap: 6px;
}

.admin-menu button {
  width: 100%;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #d9e5df;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  padding: 13px 14px;
  text-align: left;
}

.admin-menu button:hover,
.admin-menu button.active {
  background: #1f5f58;
  color: #fff;
}

.admin-main {
  padding: 28px;
  overflow: auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  margin-bottom: 20px;
}

.admin-eyebrow {
  margin: 0 0 6px;
  color: #8a5a13;
  font-weight: 800;
  text-transform: uppercase;
}

.admin-header h1 {
  margin: 0;
  font-size: 32px;
  color: #142c29;
}

.admin-account {
  position: relative;
}

.admin-user {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #dbe4df;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  padding: 10px 12px;
  text-align: left;
}

.admin-user:hover {
  border-color: #0f766e;
}

.admin-user-text {
  display: grid;
  gap: 2px;
}

.admin-user-text span {
  color: #66756f;
  font-size: 13px;
}

.admin-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #d69e2e;
  color: #111827;
  font-weight: 800;
}

.admin-caret {
  color: #52615b;
  font-size: 12px;
  font-weight: 800;
}

.admin-account-dropdown {
  position: absolute;
  top: calc(100% + 9px);
  right: 0;
  z-index: 1200;
  width: 190px;
  border: 1px solid #d8dee4;
  background: #fff;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.16);
}

.admin-account-dropdown::before {
  content: '';
  position: absolute;
  top: -7px;
  right: 18px;
  width: 12px;
  height: 12px;
  border-left: 1px solid #d8dee4;
  border-top: 1px solid #d8dee4;
  background: #fff;
  transform: rotate(45deg);
}

.admin-account-dropdown button {
  position: relative;
  width: 100%;
  min-height: 42px;
  border: 0;
  border-bottom: 1px solid #edf0f2;
  background: #fff;
  color: #1f2937;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 16px;
  text-align: left;
}

.admin-account-dropdown button:first-child {
  color: #0f4f8a;
  font-weight: 800;
}

.admin-account-dropdown button:last-child {
  border-bottom: 0;
}

.admin-account-dropdown button:hover {
  background: #f0f7ff;
  color: #0f4f8a;
}

.status-message {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  border: 1px solid #b7e0d4;
  border-radius: 8px;
  background: #e6f7f1;
  color: #0f4e48;
  font-weight: 700;
  margin-bottom: 16px;
  padding: 12px 14px;
}

.status-message button,
.text-button {
  border: 0;
  background: transparent;
  color: #0f766e;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
}

.section-card button,
.modal-actions button {
  border: 0;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  min-height: 42px;
  padding: 10px 14px;
}

.primary-action {
  background: #155e56;
}

.hotel-action {
  background: #7c4a13;
}

.menu-action {
  background: #374151;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.metric-card {
  border: 1px solid #dbe4df;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  display: grid;
  gap: 8px;
  padding: 16px;
  text-align: left;
}

.metric-card:hover {
  border-color: #0f766e;
  transform: translateY(-1px);
}

.metric-card span {
  color: #66756f;
  font-weight: 800;
}

.metric-card strong {
  font-size: 30px;
  color: #0f766e;
}

.metric-card small {
  color: #6b7280;
}

.admin-panels {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 16px;
}

.admin-panel,
.section-card {
  background: #fff;
  border: 1px solid #dbe4df;
  border-radius: 8px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e6ece8;
}

.panel-header h2 {
  margin: 0;
  font-size: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 13px 20px;
  border-bottom: 1px solid #eef2ef;
  text-align: left;
}

th {
  color: #52615b;
  font-size: 13px;
  text-transform: uppercase;
}

.row-action {
  border: 1px solid #b7d5ce;
  border-radius: 6px;
  background: #fff;
  color: #0f766e;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  padding: 7px 10px;
}

.row-action:hover {
  background: #e7f2ef;
}

.module-list {
  display: grid;
}

.module-row {
  display: grid;
  gap: 5px;
  border: 0;
  border-bottom: 1px solid #eef2ef;
  background: #fff;
  cursor: pointer;
  padding: 15px 20px;
  text-align: left;
}

.module-row:hover {
  background: #f4fbf8;
}

.module-row strong {
  color: #173f3a;
}

.module-row span {
  color: #60706a;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.section-card {
  display: grid;
  gap: 10px;
  padding: 20px;
}

.section-card span {
  color: #8a5a13;
  font-weight: 800;
  text-transform: uppercase;
}

.section-card h2 {
  margin: 0;
  color: #173f3a;
}

.section-card p {
  margin: 0;
  color: #60706a;
}

.section-card button {
  justify-self: start;
  background: #155e56;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgba(5, 13, 12, 0.52);
  padding: 20px;
}

.modal-card {
  width: min(520px, 100%);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
  display: grid;
  gap: 14px;
  padding: 22px;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.modal-header p {
  margin: 0 0 4px;
  color: #8a5a13;
  font-weight: 800;
  text-transform: uppercase;
}

.modal-header h2 {
  margin: 0;
  color: #173f3a;
}

.modal-close {
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #eef2f1;
  cursor: pointer;
  font-size: 18px;
  font-weight: 800;
}

.modal-card label {
  display: grid;
  gap: 7px;
  color: #394541;
  font-weight: 800;
}

.modal-card input,
.modal-card select,
.modal-card textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #111827;
  font: inherit;
  padding: 10px 12px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-actions button {
  background: #0f766e;
}

.modal-actions .ghost-button {
  background: #e5e7eb;
  color: #111827;
}

@media (max-width: 980px) {
  .admin-dashboard {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    position: static;
  }

  .admin-menu {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .metric-grid,
  .admin-panels,
  .section-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .admin-main {
    padding: 18px;
  }

  .admin-header,
  .status-message,
  .modal-actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .admin-menu {
    grid-template-columns: 1fr;
  }
}

/* Layout inspired by the requested dashboard reference. */
.admin-dashboard {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 58px minmax(0, 1fr);
  grid-template-columns: 1fr;
  background: #e9e9e9;
  color: #303b42;
  font-family: "Times New Roman", Times, serif;
}

.admin-topbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  background: #fff;
  min-height: 58px;
}

.admin-brand {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 9px;
  color: #1670a9;
  font-weight: 900;
  margin: 0;
  padding: 0 16px;
  justify-self: start;
}

.admin-brand img {
  width: 42px;
  height: 42px;
}

.admin-topbar h1 {
  justify-self: center;
  margin: 0;
  color: #3f474d;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
}

.admin-top-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 26px;
  justify-self: end;
}

.admin-top-actions > button {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  color: #687078;
  cursor: pointer;
  font-size: 21px;
}

.admin-shell {
  min-height: 0;
  display: grid;
  grid-template-columns: 225px minmax(0, 1fr);
}

.admin-sidebar {
  border-right: 1px solid #d0d0d0;
  background: #f5f5f5;
  color: #5a6269;
  overflow: auto;
  padding: 12px 0;
}

.admin-menu {
  display: grid;
  gap: 0;
}

.admin-menu button {
  width: 100%;
  min-height: 44px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #ececec;
  background: transparent;
  color: #5f666d;
  cursor: pointer;
  font: inherit;
  font-size: 20px;
  font-weight: 900;
  padding: 11px 18px;
  text-align: left;
  text-transform: uppercase;
}

.admin-menu button:hover,
.admin-menu button.active {
  background: #ebf4ff;
  color: #2768b7;
}

.menu-caret {
  color: #a2a8ad;
  font-size: 11px;
}

.admin-main {
  min-width: 0;
  overflow: auto;
  padding: 0;
}

.admin-tabs {
  min-height: 31px;
  display: flex;
  align-items: center;
  gap: 0;
  background: #2768b7;
  color: #fff;
  padding-left: 12px;
}

.admin-tabs button,
.visit-site {
  min-height: 31px;
  display: inline-flex;
  align-items: center;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  font-weight: 900;
  padding: 0 16px;
  text-decoration: none;
}

.admin-tabs button:hover,
.admin-tabs button.active,
.visit-site:hover {
  background: #1f5aa2;
}

.visit-site {
  margin-left: auto;
  margin-right: 12px;
}

.admin-content {
  max-width: none;
  margin: 0 auto;
  padding: 24px 52px 40px;
}

.content-heading {
  display: none;
}

.admin-account {
  position: relative;
}

.admin-user {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #d7f0da;
  cursor: pointer;
  padding: 0;
}

.admin-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #62bd72;
  color: #173b1f;
  font-size: 14px;
  font-weight: 900;
}

.admin-user-text,
.admin-caret {
  display: none;
}

.admin-account-dropdown {
  top: calc(100% + 8px);
  right: 0;
}

.section-card button,
.modal-actions button {
  border-radius: 3px;
  min-height: 34px;
  font-size: 13px;
  padding: 8px 12px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;
  margin: 0 0 28px;
}

.metric-card {
  min-height: 134px;
  display: grid;
  grid-template-columns: minmax(130px, 0.8fr) minmax(0, 1fr);
  align-items: center;
  gap: 24px;
  border: 0;
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.13);
  cursor: pointer;
  padding: 22px 26px;
  text-align: left;
}

.metric-card:hover {
  transform: translateY(-1px);
}

.metric-copy {
  display: grid;
  gap: 4px;
}

.metric-copy > span {
  color: #3c454b;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.25;
}

.metric-copy strong {
  color: #4b5563;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.1;
}

.metric-copy small {
  color: #6f7880;
  font-size: 16px;
  line-height: 1.3;
}

.metric-visual {
  height: 70px;
  display: block;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.visual-1 {
  background-image: linear-gradient(145deg, transparent 44%, #4388c7 45%, #4388c7 48%, transparent 49%),
    linear-gradient(25deg, transparent 48%, #4388c7 49%, #4388c7 52%, transparent 53%);
}

.visual-2 {
  background-image: repeating-linear-gradient(90deg, #f0c319 0 4px, transparent 4px 9px);
}

.visual-3 {
  background-image: repeating-linear-gradient(105deg, #43a46f 0 2px, transparent 2px 7px);
}

.visual-4 {
  background-image: linear-gradient(155deg, transparent 45%, #cf4148 46%, #cf4148 49%, transparent 50%),
    linear-gradient(25deg, transparent 48%, #cf4148 49%, #cf4148 52%, transparent 53%);
}

.admin-panels {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(520px, 0.95fr);
  gap: 36px;
}

.admin-panel,
.section-card {
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
}

.panel-header {
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d7d7d7;
  padding: 0 18px;
}

.panel-header h2 {
  margin: 0;
  color: #3d454b;
  font-size: 26px;
  font-weight: 900;
}

.text-button {
  color: #8c98a3;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border-right: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  padding: 18px 22px;
  text-align: left;
  vertical-align: middle;
  font-size: 18px;
}

th:last-child,
td:last-child {
  border-right: 0;
}

th {
  background: #f5f5f5;
  color: #2e343a;
  font-size: 16px;
  font-weight: 500;
  text-transform: none;
}

tbody tr:nth-child(odd) {
  background: #dff3fb;
}

tbody tr:nth-child(even) {
  background: #fff;
}

.row-action {
  border: 1px solid #b9c7d4;
  border-radius: 3px;
  background: #fff;
  color: #2768b7;
  cursor: pointer;
  font: inherit;
  font-weight: 900;
  padding: 8px 14px;
  font-size: 18px;
}

.module-row {
  display: grid;
  gap: 5px;
  border: 0;
  border-bottom: 1px solid #d7d7d7;
  background: #fff;
  cursor: pointer;
  min-height: 75px;
  padding: 18px 24px;
  text-align: left;
}

.module-row:nth-child(odd) {
  background: #dff3fb;
}

.module-row:hover {
  background: #edf8fc;
}

.module-row strong {
  color: #2f3a42;
  font-size: 18px;
}

.module-row span {
  color: #5f6f77;
  font-size: 17px;
  line-height: 1.35;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.content-manager-frame {
  min-height: calc(100vh - 160px);
  border: 1px solid #d7d7d7;
  background: #fff;
}

.content-manager-frame iframe {
  width: 100%;
  height: calc(100vh - 160px);
  min-height: 760px;
  display: block;
  border: 0;
}

.section-card {
  display: grid;
  gap: 10px;
  padding: 20px;
}

.section-card span {
  color: #2768b7;
  font-weight: 900;
  text-transform: uppercase;
}

.section-card h2 {
  margin: 0;
  color: #303b42;
}

.section-card p {
  margin: 0;
  color: #5f6f77;
}

.status-message {
  border-radius: 4px;
  margin: 0 0 16px;
}

@media (max-width: 1180px) {
  .admin-content {
    padding: 22px 28px 34px;
  }

  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .admin-panels {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .admin-topbar {
    grid-template-columns: 1fr auto;
  }

  .admin-topbar h1 {
    display: none;
  }

  .admin-shell {
    grid-template-columns: 1fr;
  }

  .admin-menu {
    grid-template-columns: 1fr 1fr;
  }

  .admin-tabs {
    overflow-x: auto;
  }

  .metric-grid,
  .section-grid {
    grid-template-columns: 1fr;
  }

  .metric-card {
    grid-template-columns: 88px minmax(0, 1fr);
  }

  .admin-content {
    padding: 18px;
  }
}
</style>
