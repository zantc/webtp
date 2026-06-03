<template>
    <div class="section-heading">
        <h3>Sự kiện</h3>
        <p class="description">Những sự kiện diễn ra ở Đại Mỗ</p>
    </div>
    <div class="pattern">
      <div class="event-list">
          <div class="event-item" v-for="event in paginatedEvents" :key="event.key">
            <NuxtLink :to="`/events/${event.slug}/`" class="link-item">
              <img :src="event.image" :alt="event.name" class="event-image" />
              <h4 class="event-title">{{ event.name }}</h4>
              <p class="event-date">{{ event.date }}</p>
              <button class="see-more-btn">
                Xem thêm
              </button>
            </NuxtLink>
          </div>
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
      >
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const eventsPerPage = 6
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(events.length / eventsPerPage))
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage
  return events.slice(start, start + eventsPerPage)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const events = [
  {
    key: 1,
    slug: "phuong-dai-mo-to-chuc-cong-bo-va-trao-cac-quyet-dinh-cua-ub-mttq-viet-nam-va-cac-to-chuc-chinh-tri-xa-hoi",
    name: "Phường Đại Mỗ tổ chức công bố và trao các Quyết định của UB.MTTQ Việt Nam và các tổ chức chính trị - xã hội",
    date: "16/7/2025",
    image: '/images/events/phuong-dai-mo.jpg'
  },
  {
    key: 2,
    slug: "tuoi-tre-phuong-dai-mo-ra-quan-tong-ve-sinh-moi-truong-huong-ung-ngay-chu-nhat-xanh-va-thuc-hien-cong-trinh-den-on-dap-nghia",
    name: "TUỔI TRẺ PHƯỜNG ĐẠI MỖ RA QUÂN TỔNG VỆ SINH MÔI TRƯỜNG HƯỞNG ỨNG NGÀY “CHỦ NHẬT XANH” VÀ THỰC HIỆN CÔNG TRÌNH “ĐỀN ƠN ĐÁP NGHĨA”",
    date: "24/07/2025",
    image: '/images/events/chu-nhat-xanh.jpg'
  },
  {
    key: 3,
    slug: "phuong-dai-mo-tri-an-cac-anh-hung-liet-sy-tai-nghia-trang-liet-sy-dai-mo-tay-mo",
    name: "Phường Đại Mỗ tri ân các anh hùng liệt sỹ tại Nghĩa trang Liệt sỹ Đại Mỗ - Tây Mỗ",
    date: "24/07/2025",
    image: '/images/events/tri-an-anh-hung.jpg',
  },
  {
    key: 4,
    slug: "chuong-trinh-nghe-thuat-nhung-buoc-chan-lang-le",
    name: "CHƯƠNG TRÌNH NGHỆ THUẬT \"NHỮNG BƯỚC CHÂN LẶNG LẼ\"",
    date: "12/08/2023",
    image: '/images/events/buoc-chan-lang-le.jpg'
  },
  {
    key: 5,
    slug: "ky-niem-75-nam-ngay-truyen-thong-luc-luong-tnxp-viet-nam-doan-thanh-nien-phuong-dai-mo-tham-hoi-tang-qua-cuu-thanh-nien-xung-phong-tieu-bieu-tren-dia-ban-phuong",
    name: "KỶ NIỆM 75 NĂM NGÀY TRUYỀN THỐNG LỰC LƯỢNG TNXP VIỆT NAM: ĐOÀN THANH NIÊN PHƯỜNG ĐẠI MỖ THĂM HỎI, TẶNG QUÀ CỰU THANH NIÊN XUNG PHONG TIÊU BIỂU TRÊN ĐỊA BÀN PHƯỜNG",
    date: "15/7/2025",
    image: '/images/events/doan-thanh-nien.jpg'
  },
  {
    key: 6,
    slug: "huong-toi-ky-niem-78-nam-ngay-thuong-binh-liet-si-27-7-1947-27-7-2025",
    name: "Hướng tới kỷ niệm 78 năm Ngày Thương binh – Liệt sĩ (27/7/1947 – 27/7/2025)",
    date: "21/07/2025",
    image: '/images/events/ky-niem.jpg',
  },
  {
    key: 7,
    slug: "chuong-trinh-nghe-thuat-dac-biet-vu-dieu-ket-doan",
    name: "CHƯƠNG TRÌNH NGHỆ THUẬT ĐẶC BIỆT \"VŨ ĐIỆU KẾT ĐOÀN\"",
    date: "19/11/2023",
    image: '/images/events/vu-dieu.png'
  },
  {
    key: 8,
    slug: "huong-toi-ky-niem-78-nam-ngay-thuong-binh-liet-si",
    name: "Hướng tới kỷ niệm 78 năm Ngày Thương binh – Liệt sĩ (27/7/1947 – 27/7/2025)",
    date: "21/07/2025",
    image: "https://sqhx-hanoi.mediacdn.vn/thumb_w/740/91579363132710912/2025/7/21/1-1753088285783198392915.jpg"
  },
  {
    key: 9,
    slug: "chuong-trinh-nghe-thuat-dac-biet-vu-dieu-ket-doan",
    name: "CHƯƠNG TRÌNH NGHỆ THUẬT ĐẶC BIỆT \"VŨ ĐIỆU KẾT ĐOÀN\"",
    date: "19/11/2023",
    image: "https://images.baophunuthudo.vn/zoom/1000/uploaded/anhnq/2025_02_11/ruoc_xoi_1_qlgj.jpg"
  }
];

const router = useRouter()
const goToDetailPage = (event) => {
  router.push(`/events/${event.slug}`)
};

</script>

<style scoped>
.section-heading h3 {
    font-weight: 400;
    font-size: 36px;
    line-height: 2px;
    text-align: center;
    text-transform: uppercase;
    color: #000;
    font-weight: bold;
    margin-top: 80px;
}

.section-heading p {
    font-weight: 400;
    font-size: 28px;
    color: #000;
    margin-bottom: 40px;
    text-align: center;
}

.event-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto 40px auto;
    justify-content: center;
}

.event-item {
    width: 420px;
    margin-bottom: 40px;
}

.link-item {
  text-decoration: none;
  color: inherit;
}

.event-image {
    width: 100%;
    height: 280px;
    object-fit: cover;
}

.event-title {
    font-size: 25px;
    margin: 12px 0 8px 0;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.event-date {
    color: #666;
    font-size: 20px;
}

.see-more-btn {
    color: #000;
    background-color: transparent;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    text-decoration: underline;
}

.see-more-btn:hover {
    background-color: #878edb;
    color: #fff;
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

.pagination {
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

@media (max-width: 600px) {
  .event-list {
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .event-item {
    width: 90%;
  }
}
</style>