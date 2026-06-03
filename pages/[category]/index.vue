<template>
  <div class="banner-image">
    <img
      src="/images/news/chua_ngoc_truc.jpg"
      alt="Hình ảnh Hồ Tây"
    />
  </div>

  <div class="search-wrapper">
    <div class="search-box">
      <table class="search-table">
        <tbody>
          <tr>
            <td class="label-cell">Danh mục</td>
            <td class="input-cell">
              <div class="custom-dropdown">
                <div
                  class="dropdown-selected"
                  @click="isDropdownOpen = !isDropdownOpen"
                >
                  <span style="margin-right: 18px">{{ selectedCategory }}</span>

                  <i
                    class="fa-solid fa-chevron-down dropdown-arrow"
                    :class="{ rotate: isDropdownOpen }"
                  ></i>
                </div>

                <div v-if="isDropdownOpen" class="dropdown-list">
                  <div
                    v-for="category in categories"
                    :key="category.slug"
                    class="dropdown-item"
                    @click="selectCategory(category)"
                  >
                    {{ category.name }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="input-cell">
              <div class="search-input-container">
                <i
                  class="fa-solid fa-magnifying-glass"
                  style="color: #3f04f1"
                ></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  class="search-input"
                  v-model="searchTerm"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="pattern">
    <div class="main-list">
      <h2>{{ categoryInfo.title }}</h2>
      <p class="main-list-subtitle">
        {{ categoryInfo.subtitle }}
      </p>

      <div class="grid-container">
        <NuxtLink
          v-for="(place, index) in paginatedPlaces"
          :key="index"
          class="grid-item"
          :to="`/${categorySlug}/${place.slug}/`"
        >
          <img :src="place.imageUrl" :alt="place.name" />
          <div class="item-overlay">
            <p class="item-title">{{ place.name }}</p>
          </div>
        </NuxtLink>
      </div>

      <div class="pagination">
        <span
          @click="goToPage(currentPage - 1)"
          :class="{ disabled: currentPage === 1 }"
          >&lt;</span
        >
        <span
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </span>

        <span
          @click="goToPage(currentPage + 1)"
          :class="{ disabled: currentPage === totalPages }"
          >&gt;</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import allMockData from '~/public/allMockData.json';

// --- PHẦN SCRIPT SETUP ĐÃ CẬP NHẬT ---
const route = useRoute();
const router = useRouter();
const categorySlug = route.params.category as string;
const places = computed(() => {
  // @ts-ignore
  return allMockData[categorySlug] || [];
});

// Tạo tiêu đề động (giữ nguyên)
const categoryInfo = computed(() => {
  switch (categorySlug) {
    case "di-tich":
      return {
        title: "DI TÍCH VĂN HÓA LỊCH SỬ",
        subtitle:
          "Khám phá những dấu ấn thời gian và giá trị văn hóa tại Đại Mỗ",
      };
    case "nha-hang":
      return {
        title: "NHÀ HÀNG & QUÁN ĂN",
        subtitle: "Thưởng thức tinh hoa ẩm thực tại các nhà hàng nổi tiếng",
      };
        case "danh-lam":
      return {
        title: "DANH LAM THẮNG CẢNH",
        subtitle: "Hãy khám phá những điểm đến Danh lam thắng cảnh ở Đại Mỗ",
      };
    case "khach-san":
      return {
        title: "KHÁCH SẠN & LƯU TRÚ",
        subtitle:
          "Tìm nơi nghỉ ngơi lý tưởng và tiện nghi cho chuyến đi của bạn",
      };
    case "le-hoi":
      return {
        title: "LỄ HỘI TRUYỀN THỐNG",
        subtitle:
          "Hòa mình vào không khí sôi động và bản sắc văn hóa địa phương",
      };
    case "lang-nghe":
      return {
        title: "LÀNG NGHỀ TRUYỀN THỐNG",
        subtitle:
          "Tìm về cội nguồn và chiêm ngưỡng sự khéo léo của các nghệ nhân",
      };
    case "co-quan-hanh-chinh":
      return {
        title: "CƠ QUAN HÀNH CHÍNH",
        subtitle: "Thông tin liên hệ các cơ quan, đơn vị hành chính quan trọng",
      };
    case "trung-tam-hoi-nghi-su-kien":
      return {
        title: "TRUNG TÂM HỘI NGHỊ & SỰ KIỆN",
        subtitle:
          "Địa điểm lý tưởng để tổ chức các sự kiện và hội thảo chuyên nghiệp",
      };
    case "dich-vu-ho-tro-du-lich":
      return {
        title: "DỊCH VỤ HỖ TRỢ DU LỊCH",
        subtitle: "Tìm kiếm sự hỗ trợ cần thiết để chuyến đi thêm trọn vẹn",
      };
    default:
      return {
        title: "KHÁM PHÁ ĐIỂM ĐẾN",
        subtitle: "Các địa điểm thú vị và hấp dẫn đang chờ bạn khám phá",
      };
  }
});

const goToDetailPage = (place: { slug: any }) => {
  router.push(`/${categorySlug}/${place.slug}`);
};

const searchTerm = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(9);

const filteredPlaces = computed(() => {
  if (!places.value) return [];
  if (!searchTerm.value.trim()) {
    return places.value;
  }
  const lowerCaseSearch = searchTerm.value.toLowerCase();
  return places.value.filter((place: { name: string }) =>
    place.name.toLowerCase().includes(lowerCaseSearch)
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredPlaces.value.length / itemsPerPage.value)
);

const paginatedPlaces = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredPlaces.value.slice(startIndex, endIndex);
});

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

watch(searchTerm, () => {
  currentPage.value = 1;
});

const isDropdownOpen = ref(false);
const categories = ref([
  { name: "Di tích và danh lam", slug: "di-tich" },
  { name: "Lễ hội", slug: "le-hoi" },
  { name: "Làng nghề", slug: "lang-nghe" },
  { name: "Cơ quan hành chính", slug: "co-quan-hanh-chinh" },
  { name: "Trung tâm hội nghị sự kiện", slug: "trung-tam-hoi-nghi-su-kien" },
  { name: "Khách sạn", slug: "khach-san" },
  { name: "Nhà hàng quán ăn", slug: "nha-hang" },
    { name: "Danh lam", slug: "danh-lam" },
  { name: "Dịch vụ hỗ trợ du lịch", slug: "dich-vu-ho-tro-du-lich" },
]);

const selectedCategory = computed(() => {
  return (
    categories.value.find((c) => c.slug === categorySlug)?.name ||
    "Danh mục điểm đến"
  );
});

function selectCategory(category: { slug: string }) {
  isDropdownOpen.value = false;
  router.push(`/${category.slug}/`);
}
</script>
<style scoped>
.banner-image {
  width: 100vw;
  height: 80vh;
  overflow: hidden;
  position: relative;
}

.banner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.search-wrapper {
  display: flex;
  justify-content: center;
  margin-top: -70px;
  position: relative;
  z-index: 10;
}

.search-box {
  background-color: white;
  border-radius: 35px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  width: 70%;
  max-width: 1200px;
}

.search-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  border: 0px;
}

.search-table td {
  border: none;
  padding: 30px;
}
.search-table tr:first-child td:first-child {
  border-right: 1px solid #e0e0e0;
}

.search-table tr:last-child td {
  border-top: 1px solid #e0e0e0;
}

.label-cell {
  font-size: 28px;
  padding: 15px;
  width: 25%;
  font-weight: 600;
  color: #333;
}

.input-cell {
}

.custom-dropdown {
  position: relative;
  width: 100%;
  font-size: 16px;
  color: #074946;
}

.dropdown-selected {
      background:  #d9daf9 100%;

  border-radius: 25px;
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid #d0dada;
  transition: background-color 0.3s;
}



.dropdown-arrow {
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotate {
  transform: rotate(180deg);
}

.dropdown-list {
  position: absolute;
  top: 110%;
      background:  #d9daf9 100%;

  border-radius: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
  border: 1px solid #d0dada;
  width: 100%;
}

.dropdown-item {
  padding: 15px 20px;
  cursor: pointer;
  border-bottom: 1px solid #ffffff;
  transition: background-color 0.2s;
  text-align: right;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: #8690d3;
  color: white;
}

.search-input-container {
  display: flex;
  align-items: center;
    background:  #d9daf9 100%;
  border-radius: 15px;
  padding: 10px 15px;
  margin: 5px;
}

.search-input-container > input::placeholder {
  color: #074946;
  opacity: 1;
}

.fa-magnifying-glass {
  margin-right: 10px;
  font-size: 18px;
  color: #3f04f1;
}

.search-input {
  border: none;
  background: transparent;
  width: 100%;
  font-size: 16px;
  outline: none;
  color: #333;
}
.pattern {
  position: relative;
  overflow: hidden;
}

.pattern::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/public/images/pattern.jpg");
  background-size: 1100px 700px;
  background-position: center;
  background-repeat: repeat;
  filter: blur(0px);
  z-index: 0;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}

.pattern > * {
  position: relative;
  z-index: 1;
}
.main-list {
  padding: 120px 5% 60px 5%;
  margin-top: -100px;
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 1200px;
  margin: -100px auto 0 auto;
}

.main-list h2 {
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: 600;
}

.main-list-subtitle {
  color: #777;
  margin-bottom: 40px;
  font-size: 25px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.grid-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.grid-item img {
  width: 100%;
  height: 280px;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.grid-item:hover img {
  transform: scale(1.05);
}

.item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: 40px 15px 15px 15px;
  text-align: left;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;
}

.pagination {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.pagination span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  color: #555;
  font-weight: 500;
  transition: all 0.3s ease;
}

.pagination span.active,
.pagination span:hover {
  background-color: #8690d3;
  color: white;
  border-color: #8690d3;
}
.pagination span.disabled {
  pointer-events: none;
  opacity: 0.5;
  background-color: #f0f0f0;
  color: #aaa;
  border-color: #ddd;
}

/* --- RESPONSIVE CSS --- */

/* Tablet (cho màn hình nhỏ hơn 1024px) */
@media (max-width: 1024px) {
  .search-box {
    width: 85%;
  }
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .label-cell {
    font-size: 24px;
  }
}

/* Mobile (cho màn hình nhỏ hơn 768px) */
@media (max-width: 768px) {
  .banner-image {
    height: 60vh; /* Giảm chiều cao banner */
  }

  .search-wrapper {
    margin-top: -50px; /* Điều chỉnh vị trí search box */
  }

  .search-box {
    width: 90%;
    border-radius: 20px;
  }

  /* Stack các ô trong table theo chiều dọc */
  .search-table td {
    display: block;
    width: 100%;
    padding: 15px;
    box-sizing: border-box; /* Quan trọng để padding không làm tăng width */
  }

  /* Bỏ đường kẻ dọc, thay bằng đường kẻ ngang */
  .search-table tr:first-child td:first-child {
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
  }

  /* Bỏ đường kẻ ngang ở hàng thứ 2 vì đã có ở trên */
  .search-table tr:last-child td {
    border-top: none;
  }

  .label-cell {
    width: 100%;
    font-size: 22px;
  }

  /* Căn đều chữ và icon trong dropdown */
  .dropdown-selected {
    justify-content: space-between;
  }

  .main-list {
    padding: 100px 5% 40px 5%;
    margin-top: -80px;
  }

  .main-list h2 {
    font-size: 26px;
  }

  .grid-container {
    grid-template-columns: 1fr; /* 1 cột trên mobile */
  }
}

/* Small Mobile (cho màn hình nhỏ hơn 480px) */
@media (max-width: 480px) {
  .banner-image {
    height: 50vh;
  }
  .search-box {
    width: 95%;
  }
  .main-list h2 {
    font-size: 22px;
  }
  .item-title {
    font-size: 16px;
  }
  .pagination span {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }
}
</style>
