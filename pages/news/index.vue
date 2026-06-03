<template>
    <div class="slider-container">
    <div v-for="(slide, key) in slides" :key="key"
         class="slide"
         :class="{ active: currentIndex === key }">
      <img :src="slide.image" alt="">
    </div>

    <div class="banner-content-overlay">
      <div class="content">
        <h1 class="aside-title">{{ truncatedTitle }}</h1>
        <p class="aside-description">{{ truncatedDescription }}</p>
        <NuxtLink :to="`/news/${slides[currentIndex].slug}/`" class="see-more-btn">
          Xem thêm
        </NuxtLink>
      </div>
    </div>
  </div>
  <div class="pattern">

    <div class="section-heading">
        <h3>Tin tức</h3>
        <p>Những tin tức ở Đại Mỗ</p>
    </div>
    <div class="event-list">
      <div class="event-item" 
           v-for="event in paginatedPlaces" 
           :key="event.key">
       <NuxtLink :to="`/news/${event.slug}/`" class="link-item">
        <img :src="event.image" :alt="event.name" class="event-image" />
        <h4 class="event-title">{{ event.name }}</h4>
        <p class="event-date">{{ event.date }}</p>
        <button class="see-more-btn">
          Xem thêm
        </button>
       </NuxtLink>
      </div>
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
        >   </div>
        </div>
</template>

<script setup >
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
const events = ref([
    {
        key: 1,
        slug: "chuyen-doi-so-huong-dan-chi-tiet-cach-tra-cuu-ho-so-dich-vu-cong",
        name: "[ CHUYỂN ĐỔI SỐ ] Hướng dẫn chi tiết cách tra cứu hồ sơ dịch vụ công",
        date: "16/7/2025",
        image: "/images/news/maxresdefault(6).jpg"
    },
    {
        key: 2,
        slug: "chuyen-doi-so-cac-cach-chuan-hoa-thong-tin-thue-bao-viettel",
        name: "[ CHUYỂN ĐỔI SỐ ] Các cách chuẩn hóa thông tin thuê bao Viettel",
        date: "24/07/2025",
        image: "/images/news/5866bed4301db7fb7cf8ab555413c5f9ab14f223.png"
    },
    {
        key: 3,
        slug: "chuyen-doi-so-huong-dan-dat-lich-dang-kiem-truc-tuyen",
        name: "[ CHUYỂN ĐỔI SỐ ] Hướng dẫn đặt lịch đăng kiểm trực tuyến",
        date: "24/07/2025",
        image: "/images/news/kd-17138442821361721880032.jpeg"
    },
    {
        key: 4,
        slug: "chuyen-doi-so-cach-dang-ky-lam-giay-khai-sinh-online-tren-dien-thoai-don-gian",
        name: "[ CHUYỂN ĐỔI SỐ ] Cách đăng ký làm giấy khai sinh online trên điện thoại đơn giản",
        date: "12/08/2023",
        image: "/images/news/lam-giay-khai-sinh-online-1.jpg"
    },
    {
        key: 5,
        slug: "chuyen-doi-so-huong-dan-dang-ky-nhan-luong-huu-qua-the-atm-tren-ung-dung-vssid",
        name: "[ CHUYỂN ĐỔI SỐ ] Hướng dẫn đăng ký nhận lương hưu qua thẻ ATM trên ứng dụng VssID",
        date: "15/7/2025",
        image: "/images/news/HDan nhan luong huu bang tai khoan qua VSSID.jpg"
    },
    {
        key: 6,
        slug: "chuyen-doi-so-ly-do-giup-viettel-agile-gianh-giai-quoc-te-ve-chuyen-doi-so",
        name: "[ CHUYỂN ĐỔI SỐ ] Lý do giúp Viettel AGILE giành giải quốc tế về chuyển đổi số",
        date: "21/07/2025",
        image: "/images/news/471201156_584954557614752_6695968001605677247_n.jpg"
    },
    {
        key: 7,
        slug: "chuyen-doi-so-du-lieu-mo-mo-du-lieu",
        name: "[ CHUYỂN ĐỔI SỐ ] DỮ LIỆU MỞ, MỞ DỮ LIỆU",
        date: "19/11/2023",
        image: "/images/news/chuyen-doi-so-du-lieu-mo-mo-du-lieu.jpg"
    },
    {
        key: 8,
        slug: "chuyen-doi-so-ket-noi-chia-se-du-lieu-ve-dan-cu-tren-quy-mo-quoc-gia",
        name: "[ CHUYỂN ĐỔI SỐ ] Kết nối, chia sẻ dữ liệu về dân cư trên quy mô quốc gia",
        date: "21/07/2025",
        image: "/images/news/471383739_584912150952326_5454606101210890951_n.jpg"
    },
    {
        key: 9,
        slug: "chuyen-doi-so-ket-noi-chia-se-du-lieu-ve-dan-cu-tren-quy-mo-quoc-gia",
        name: "CHƯƠNG TRÌNH NGHỆ THUẬT ĐẶC BIỆT \"VŨ ĐIỆU KẾT ĐOÀN\"",
        date: "19/11/2023",
        image: "/images/news/471227233_584911144285760_6255928176124598175_n.jpg"
    },
    {
        key: 10,
        slug: "chuyen-doi-so-can-chu-trong-phat-trien-cac-nen-tang-so",
        name: "[ CHUYỂN ĐỔI SỐ ] Cần chú trọng phát triển các nền tảng số",
        date: "24/12/2024",
        image: "/images/news/471316540_584909587619249_5501939241938060355_n.jpg"
    }
]);

const router = useRouter()
const goToDetailPage = (event) => {
  router.push(`/news/${event.slug}`)
};
const slides = ref([
    {
    key: 1,
    slug: "chuyen-doi-so-huong-dan-chi-tiet-cach-tra-cuu-ho-so-dich-vu-cong",
    name: "[ CHUYỂN ĐỔI SỐ ] Hướng dẫn chi tiết cách tra cứu hồ sơ dịch vụ công",
    date: "16/7/2025",
    image: "/images/news/maxresdefault(6).jpg",
    description: "Hướng về ngày tháng 10 lịch sử đó. Chương trình nghệ thuật “Hà Nội – một trái tim hồng” là một trong những hoạt động văn "
  },
  {
    key: 2,
    slug: "chuyen-doi-so-cac-cach-chuan-hoa-thong-tin-thue-bao-viettel",
    name: "[ CHUYỂN ĐỔI SỐ ] Các cách chuẩn hóa thông tin thuê bao Viettel",
    date: "24/07/2025",
    image: "/images/news/5866bed4301db7fb7cf8ab555413c5f9ab14f223.png",
    description: "Hướng về ngày tháng 10 lịch sử đó. Chương trình nghệ thuật “Hà Nội – một trái tim hồng” là một trong những hoạt động văn "

  },
  {
    key: 3,
    slug: "chuyen-doi-so-huong-dan-dat-lich-dang-kiem-truc-tuyen",
    name: "[ CHUYỂN ĐỔI SỐ ] Hướng dẫn đặt lịch đăng kiểm trực tuyến",
    date: "24/07/2025",
    image: "/images/news/kd-17138442821361721880032.jpeg",
    description: "Hướng về ngày tháng 10 lịch sử đó. Chương trình nghệ thuật “Hà Nội – một trái tim hồng” là một trong những hoạt động văn "
  }
])

const currentIndex = ref(0)
let interval = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

onMounted(() => {
  interval = setInterval(nextSlide, 5000) 
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
const maxTitleLength = 70
const truncatedTitle = computed(() => {
  const title = slides.value[currentIndex.value].name
  return title.length > maxTitleLength ? title.slice(0, maxTitleLength) + '...' : title
})
const maxDescriptionLength = 200
const truncatedDescription = computed(() => {
  const description = slides.value[currentIndex.value].description
  return description.length > maxDescriptionLength ? description.slice(0, maxDescriptionLength) + '...' : description
})
const searchTerm = ref("");

const currentPage = ref(1)
const itemsPerPage = ref(9);

const filteredPlaces = computed(() => {
  if (!searchTerm.value.trim()) {
    return events.value;
  }
  const lowerCaseSearch = searchTerm.value.toLowerCase();
  return events.value.filter((place) =>
    place.name.toLowerCase().includes(lowerCaseSearch)
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredPlaces.value.length / itemsPerPage.value);
});

const paginatedPlaces = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredPlaces.value.slice(startIndex, endIndex);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

watch(searchTerm, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  height: 50vh;
  max-height: 500px;
  min-height: 250px;
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.slide.active { opacity: 1; }

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-content-overlay {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  width: 90%;
  max-width: 800px;
  border-radius: 8px;
}
@media (min-width: 1024px) {
  .banner-content-overlay {
    left: auto;
    right: 20px;
    transform: none;
    width: 40%; 
  }
}
.banner-content-overlay .content {
  background-color: white;
  padding: 1rem;
  text-align: center;
}

.aside-title {
  font-size: clamp(18px, 4vw, 30px);
  text-transform: uppercase;
}

.aside-description {
  font-size: clamp(14px, 2.5vw, 20px);
}

.section-heading h3 {
  font-size: clamp(20px, 4vw, 36px);
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 40px;
}

.section-heading p {
  font-size: clamp(14px, 2.5vw, 28px);
  text-align: center;
  margin-bottom: 40px;
}

.event-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto 40px;
  padding: 0 10px;
}

.event-item {
  width: 100%;
  margin-bottom: 20px;
}

.link-item {
  text-decoration: none;
  color: inherit;
}

.event-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.event-title {
  font-size: 25px;
  font-weight: bold;
  margin: 12px 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-date {
  color: #666;
  font-size: 20px;
}

.event-description {
  text-align: justify;
}

.see-more-btn {
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  background-color: transparent;
  text-decoration: underline;
}
.see-more-btn:hover {
  background-color: #878edb;
  color: #fff;
}

.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.pagination span {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
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

@media (max-width: 900px) {
  .event-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}
@media (max-width: 600px) {
  .event-list {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .event-image { height: 180px; }
  .aside-title { font-size: 20px; }
  .aside-description { font-size: 14px; }
  .pagination span {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
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
  background-image: url("/images/pattern.jpg");
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
</style>
