<template>
  <div>
    <!-- <section class="banner">
      <h2>CHÀO MỪNG BẠN ĐẾN ĐẠI MỖ 360</h2>
      <div class="article-space"></div>
    </section> -->
   <section class="service-menu">
     <ParticlesBackground />
  <div class="service-content">
    <div class="title-block">
      <p class="main-title">CHÀO MỪNG BẠN ĐẾN</p>
      <p class="main-title">ĐẠI MỖ 360</p>
      <div class="divider"></div>
    </div>

    <div class="icon-grid">
      <a href="/di-tich/" class="icon-item">
        <div class="icon-circle">
          <img src="\public\icons\icondanhlam.png" alt="" />
        </div>
        <span class="icon-label">DI TÍCH VÀ DANH LAM</span>
      </a>
      <a href="/le-hoi/" class="icon-item">
        <div class="icon-circle">
          <img src="/public/icons/iconlehoi.png" alt="" />
        </div>
        <span class="icon-label">LỄ HỘI</span>
      </a>
      <a href="/lang-nghe/" class="icon-item">
        <div class="icon-circle">
          <img src="/public/icons/iconlangnghe.png" alt="" />
        </div>
        <span class="icon-label">LÀNG NGHỀ</span>
      </a>
      <a href="/co-quan-hanh-chinh/" class="icon-item">
        <div class="icon-circle">
          <img src="/public/icons/iconcoquan.png" alt="" />
        </div>
        <span class="icon-label">CƠ QUAN HÀNH CHÍNH</span>
      </a>
      <a href="/trung-tam-hoi-nghi-su-kien/" class="icon-item">
        <div class="icon-circle">
          <img src="/public/icons/icontrungtam.png" alt="" />
        </div>
        <span class="icon-label">TRUNG TÂM HỘI NGHỊ SỰ KIỆN</span>
      </a>
      <a href="/khach-san/" class="icon-item">
        <div class="icon-circle">
          <img src="/public/icons/iconkhachsan.png" alt="" />
        </div>
        <span class="icon-label">KHÁCH SẠN</span>
      </a>
      <a href="/nha-hang/" class="icon-item">
        <div class="icon-circle">
          <img src="/public/icons/iconnhahang.png" alt="" />
        </div>
        <span class="icon-label">NHÀ HÀNG QUÁN ĂN</span>
      </a>
      <a href="/dich-vu-ho-tro-du-lich/" class="icon-item">
        <div class="icon-circle">
          <img src="/public/icons/iconhotro.png" alt="" />
        </div>
        <span class="icon-label">DỊCH VỤ HỖ TRỢ DU LỊCH</span>
      </a>
    </div>
  </div>
 
</section>

    <section class="event-home">
      <div class="title-block">
        <p class="main-title">SỰ KIỆN</p>
        <div class="divider black"></div>
      </div>

      <div class="box-event-home"  >
        <div>
          <NuxtLink  :to="currentEvent ? `/events/${currentEvent.slug}/` : '#'" class="event-image-col">
            <img
              :src="
                currentEvent
                  ? currentEvent.imageUrl
                  : 'https://hoanhap.vn/data/article/upload/nghuyen1995@gmail.com/20190215/1fc1d827cb45291b7054.jpg'
              "
              alt="Hình ảnh sự kiện"
            />
          </NuxtLink>
          <NuxtLink :to="`/events/`" class="view_link">
            <button class="view_moreEvent">Xem thêm &raquo;</button>
          </NuxtLink>
        </div>
        <div class="event-content-col">
          <div class="month-swiper-container">
            <button class="swiper-button-prev"></button>
            <Swiper
              :modules="[Navigation]"
              :slides-per-view="3"
              :space-between="10"
              :centered-slides="true"
              :loop="true"
              :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }"
              class="month-swiper"
              @slideChange="onSlideChange"
              @swiper="onSwiperInit"
            >
              <SwiperSlide v-for="(month, idx) in months" :key="month">
                <a @click="goToMonth(idx)">Tháng {{ month }}</a>
              </SwiperSlide>
            </Swiper>
            <button class="swiper-button-next"></button>
          </div>

          <div class="event-display">
            <div v-if="currentEvent" class="event-details">
              <NuxtLink :to="currentEvent ? `/events/${currentEvent.slug}/` : '#'" class="event-title">
                <h3>{{ currentEvent.title }}</h3>
              </NuxtLink>
              <p class="intro-heading">Giới thiệu</p>
              <p class="event-description">{{ currentEvent.description }}</p>
            <div class="event-meta">
                <div class="meta-item"><i class="fa-solid fa-location-dot"></i> <span>{{ currentEvent.location }}</span></div>
                <div class="meta-item"><i class="fa-regular fa-calendar"></i> <span>{{ currentEvent.date }}</span></div>
                <div class="meta-item"><i class="fa-solid fa-phone"></i> <span>{{ currentEvent.phone }}</span></div>
              </div>
            </div>
            <p v-else class="no-events-message">
              CHƯA CÓ SỰ KIỆN NÀO ĐANG DIỄN RA.
            </p>
          </div>
        </div>
      </div>
  </section>
  </div>
</template>

<script setup>

// Import các thành phần cần thiết của Swiper
 
 
import ParticlesBackground from './ParticlesBackground.vue';
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from 'vue-router'

const router = useRouter();
const goToEvent = () => {
  router.push(`/events`);
};

const goToMonth = (idx) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideToLoop(idx);
    updateEventContent();
  }
};

// --- 1. TẠO DỮ LIỆU ĐỘNG ---
// Danh sách các tháng để hiển thị trong Swiper
const months = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];

// Danh sách các sự kiện. Mỗi object có một 'id' tương ứng với tháng.
const eventsData = [
     {
    id: 5, // Tháng 5
    slug: "phuong-dai-mo-to-chuc-cong-bo-va-trao-cac-quyet-dinh-cua-ub-mttq-viet-nam-va-cac-to-chuc-chinh-tri-xa-hoi",
    title: 'Phường Đại Mỗ tổ chức công bố và trao các Quyết định của UB.MTTQ Việt Nam và các tổ chức chính trị - xã hội',
    description:
      'Sáng ngày 16/7/2025, UB.MTTQ Việt Nam phường Đại Mỗ đã tổ chức hội nghị công bố và trao các Quyết định của UB.MTTQ Việt Nam và các tổ chức chính trị - Xã hội tại phường Đại Mỗ.',
    location: "Nghĩa trang Liệt sỹ Đại Mỗ - Tây Mỗ",
    date: "16/7/2025",
    phone: "024.7533306",
    imageUrl:
      "https://sqhx-hanoi.mediacdn.vn/thumb_w/740/91579363132710912/2025/7/17/1-17527245380111168482501.jpg",
  },
   {
    id: 6, // Tháng 6
    slug: "tuoi-tre-phuong-dai-mo-ra-quan-tong-ve-sinh-moi-truong-huong-ung-ngay-chu-nhat-xanh-va-thuc-hien-cong-trinh-den-on-dap-nghia",
    title: 'TUỔI TRẺ PHƯỜNG ĐẠI MỖ RA QUÂN TỔNG VỆ SINH MÔI TRƯỜNG HƯỞNG ỨNG NGÀY “CHỦ NHẬT XANH” VÀ THỰC HIỆN CÔNG TRÌNH “ĐỀN ƠN ĐÁP NGHĨA”',
    description:
      'Thiết thực kỷ niệm 78 năm Ngày Thương binh - Liệt sĩ (27/7/1947 - 27/7/2025), sáng ngày 20/7/2025, Đoàn Thanh niên phường Đại Mỗ phối hợp với Đoàn phường Tây Mỗ và Chi đoàn 9 - Đoàn cơ sở E31 - Bộ Tư lệnh Cảnh sát cơ động tổ chức ra quân tổng vệ sinh môi trường hưởng ứng Ngày “Chủ nhật xanh” và thực hiện công trình “Đền ơn đáp nghĩa”.',
    location: "Nghĩa trang Liệt sỹ Đại Mỗ - Tây Mỗ",
    date: "24/07/2025",
    phone: "024.7533306",
    imageUrl:
      "https://sqhx-hanoi.mediacdn.vn/thumb_w/740/91579363132710912/2025/7/24/1-1753365639181278667647.jpg",
  },
  {
    id: 7, // Tháng 7
    slug: "phuong-dai-mo-tri-an-cac-anh-hung-liet-sy-tai-nghia-trang-liet-sy-dai-mo-tay-mo",
    title: 'Phường Đại Mỗ tri ân các anh hùng liệt sỹ tại Nghĩa trang Liệt sỹ Đại Mỗ - Tây Mỗ',
    description:
      'Nhân kỷ niệm 78 năm Ngày Thương binh - Liệt sĩ (27/7/1947-27/7/2025), sáng ngày 24/7, đoàn đại biểu của Đảng ủy - HĐND - UBND - UB.MTTQ Việt Nam phường Đại Mỗ đã tổ chức dâng hương, dâng hoa tri ân, tưởng niệm các Anh hùng Liệt sĩ, Bà mẹ Việt Nam anh hùng tại Nghĩa trang Liệt sĩ Tây Mỗ - Đại Mỗ.',
    location: "Nghĩa trang Liệt sỹ Đại Mỗ - Tây Mỗ",
    date: "24/07/2025",
    phone: "024.7533306",
    imageUrl:
      "https://sqhx-hanoi.mediacdn.vn/thumb_w/740/91579363132710912/2025/7/24/1-1753365639181278667647.jpg",
  },

  {
    id: 8, // Tháng 8
    slug: "chuong-trinh-nghe-thuat-nhung-buoc-chan-lang-le",
    title: 'CHƯƠNG TRÌNH NGHỆ THUẬT "NHỮNG BƯỚC CHÂN LẶNG LẼ"',
    description:
      'Tối 12/8, tại Phố đi bộ Trịnh Công Sơn, quận Tây Hồ tổ chức chương trình nghệ thuật "Những bước chân lặng lẽ". Chương trình nhằm tôn vinh sự hy sinh, cống hiến của lực lượng Công an Nhân dân...',
    location: "Phố đi bộ Trịnh Công Sơn",
    date: "12/08/2023",
    phone: "024.7533306",
    imageUrl:
      "https://ditichlichsu-vanhoahanoi.com/wp-content/uploads/2017/10/Dinh-Dai-Mo-676x400.jpg",
  },
     {
    id: 9,  
    slug: "ky-niem-75-nam-ngay-truyen-thong-luc-luong-tnxp-viet-nam-doan-thanh-nien-phuong-dai-mo-tham-hoi-tang-qua-cuu-thanh-nien-xung-phong-tieu-bieu-tren-dia-ban-phuong",
    title: 'KỶ NIỆM 75 NĂM NGÀY TRUYỀN THỐNG LỰC LƯỢNG TNXP VIỆT NAM: ĐOÀN THANH NIÊN PHƯỜNG ĐẠI MỖ THĂM HỎI, TẶNG QUÀ CỰU THANH NIÊN XUNG PHONG TIÊU BIỂU TRÊN ĐỊA BÀN PHƯỜNG',
    description:
      'Nhân dịp kỷ niệm 75 năm Ngày truyền thống lực lượng Thanh niên xung phong Việt Nam (15/7/1950 - 15/7/2025), Đoàn Thanh niên phường Đại Mỗ đã tổ chức hoạt động thăm hỏi, tặng quà các cựu thanh niên xung phong đang sinh sống trên địa bàn, thể hiện đạo lý “Uống nước nhớ nguồn” và truyền thống tri ân sâu sắc đối với thế hệ đi trước.',
    location: "Nhà của các cựu thanh  niên xung phong tiêu biểu",
    date: "15/7/2025",
    phone: "024.7533306",
    imageUrl:
      "https://sqhx-hanoi.mediacdn.vn/thumb_w/740/91579363132710912/2025/7/15/2-1752587297930260600992.jpg",
  },
   {
    id: 10,  
    slug: "huong-toi-ky-niem-78-nam-ngay-thuong-binh-liet-si-27-7-1947-27-7-2025",
    title: 'Hướng tới kỷ niệm 78 năm Ngày Thương binh – Liệt sĩ (27/7/1947 – 27/7/2025)',
    description:
      'Kỷ niệm 78 năm Ngày Thương binh - Liệt sĩ (27/7/1947 – 27/7/2025) - một dấu mốc lịch sử nhắc nhở chúng ta về những hy sinh cao cả của các thế hệ cha anh vì độc lập, tự do của Tổ quốc.',
    location: "Phường Đại Mỗ",
    date: "21/07/2025",
    phone: "024.7533306",
    imageUrl:
      "https://sqhx-hanoi.mediacdn.vn/thumb_w/740/91579363132710912/2025/7/21/1-1753088285783198392915.jpg",
  },
  {
    id: 11, // Tháng 11
    slug: "chuong-trinh-nghe-thuat-dac-biet-vu-dieu-ket-doan",
    title: 'CHƯƠNG TRÌNH NGHỆ THUẬT ĐẶC BIỆT "VŨ ĐIỆU KẾT ĐOÀN"',
    description:
      'Tối 18/11, tại Không gian văn hóa sáng tạo Tây Hồ, trong chương trình Ngày hội Đại đoàn kết toàn dân tộc thành phố Hà Nội năm 2023 đã diễn ra màn múa "Vũ điệu kết đoàn".',
    location: "Quận Tây Hồ",
    date: "19/11/2023",
    phone: "000.0000000",
    imageUrl:
      "https://images.baophunuthudo.vn/zoom/1000/uploaded/anhnq/2025_02_11/ruoc_xoi_1_qlgj.jpg",
  },
];

// Biến reactive để lưu trữ sự kiện đang được hiển thị
const currentEvent = ref(null);
const swiperInstance = ref(null);

// --- 2. LOGIC XỬ LÝ SỰ KIỆN SWIPER ---
const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper;
  updateEventContent(); // Cập nhật nội dung cho slide đầu tiên
};

const onSlideChange = () => {
  updateEventContent();
};

const updateEventContent = () => {
  if (!swiperInstance.value) return;
  // Lấy tháng của slide đang active ở giữa
  const activeMonth = months[swiperInstance.value.realIndex];

  // Tìm sự kiện tương ứng với tháng đó trong mảng eventsData
  const foundEvent = eventsData.find((event) => event.id === activeMonth);

  // Cập nhật biến currentEvent
  currentEvent.value = foundEvent || null;
};
</script>
<style scoped>
@import url("https://fonts.cdnfonts.com/css/itc-korinna-std");
body {
 font-family: "Korinna", serif;
}

h1,
h2 {
 font-family: "Korinna", serif;
 font-weight: bold;
}
.service-menu {
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 min-height: 60vh;
 padding: 50px 20px;
 background-color: #1e3c4b;
 color: white;
 border-radius: 12px;
 font-family: sans-serif;
 margin-bottom: 24px;
 position: relative;
 overflow: hidden;
}
.service-content {
 position: relative;
 z-index: 10;
 display: flex;
 flex-direction: column;
 align-items: center;
 width: 100%;
}
.banner {
 background: #f5f7fa;
 padding: 32px;
 border-radius: 12px;
 text-align: center;
 margin-bottom: 24px;
}

.title-block {
 text-align: center;
 margin-bottom: 60px;
}

.subtitle {
 font-size: 1.1rem;
 letter-spacing: 2px;
 margin: 0;
}

.main-title {
 font-size: 1.8rem;
 font-weight: 700;
 margin: 10px 0;
 letter-spacing: 1px;
}

.divider {
 width: 270px;
 height: 2px;
 background-color: white;
 margin: 15px auto 0;
}

/* BỐ CỤC CHO MÀN HÌNH LỚN (DESKTOP) */
.icon-grid {
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 gap: 50px 40px;
 max-width: 1000px;
 width: 100%;
}

.icon-item {
 display: flex;
 flex-direction: column;
 align-items: center;
 text-decoration: none;
 color: white;
 transition: transform 0.3s ease;
}

.icon-circle {
 width: 100px;
 height: 100px;
 border-radius: 50%;
 background-color: rgba(111, 171, 161, 0.8);
 display: flex;
 justify-content: center;
 align-items: center;
 margin-bottom: 15px;
 transition: all 0.3s ease;
}
.icon-circle > img {
 width: 40px;
 height: auto;
}

.icon-label {
 font-size: 0.9rem;
 font-weight: 600;
 text-align: center;
 line-height: 1.4;
 width: 120px;
 height: 40px;
}

/* --- Thiết lập chung cho khu vực sự kiện --- */
.event-home {
 padding: 50px 0px;
 margin-bottom: 40px;
}

.box-event-home {
 display: flex;
 align-items: flex-start;
 background-color: #fff;
 position: relative;
 text-align: center;
}

.event-image-col {
 flex: 0 0 45%;
 position: relative;
}

.event-image-col img {
 object-fit: cover;
 display: block;
 height: 500px;
 width: 100%;
}

.event-content-col {
 flex: 1;
 display: flex;
 flex-direction: column;
 margin-left: -100px;
}

.event-display {
 flex-grow: 1;
 background-color: #6FABA1;
 color: white;
 justify-content: center;
 align-items: center;
 text-align: left;
 font-size: 18px;
 padding: 40px;
 min-height: 160px;
}

.event-details, .no-events-message {
 padding-left: 110px;
 text-align: left;
}

.event-home .divider.black {
 width: 270px;
 height: 2px;
 background-color: black;
 margin: 15px auto 0;
}
.event-title {
 font-size: 1.2rem;
 font-weight: bold;
 text-decoration: none;
 color: inherit;
}
.intro-heading {
 font-weight: bold;
 margin-top: 15px;
 margin-bottom: 5px;
}

.event-description {
 font-size: 0.95rem;
 line-height: 1.6;
}

.event-meta {
 margin-top: 20px;
 display: flex;
 flex-direction: column;
 gap: 10px;
 align-items: flex-start;
}

.meta-item {
 display: flex;
 align-items: center;
 gap: 10px;
 font-size: 0.9rem;
}

.view_moreEvent {
 width: 162px;
 height: 51px;
 border: 2px solid #126b66;
 margin: 40px auto 0;
 cursor: pointer;
 background-color: #126b66;
 color: #fff;
 text-transform: uppercase;
 text-decoration: none;
 font-size: 15px;
 position: relative;
 overflow: hidden;
 z-index: 1;
 transition: color 0.4s ease-in-out;
}

.view_moreEvent::before {
 content: '';
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-color: #fff;
 transform: scaleX(0);
 transform-origin: left;
 transition: transform 0.4s ease-in-out;
 z-index: -1;
}

.view_moreEvent:hover {
 color: #126b66;
}

.view_moreEvent:hover::before {
 transform: scaleX(1);
}

.month-swiper-container {
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 20px;
 padding: 10px 15px;
 border-bottom: 1px solid #eee;
 background-color: white;
}

.month-swiper {
 width: 70%;
 max-width: 300px;
 margin: 20px;
}

.swiper-slide {
 text-align: center;
 font-size: 16px;
 color: #555;
 cursor: pointer;
 padding: 5px 0;
 border-bottom: 2px solid transparent;
}

.swiper-slide-active a {
 color: #000;
 font-weight: bold;
}
.swiper-slide-active {
 border-bottom-color: #000;
}
.swiper-slide a {
 text-decoration: none;
 color: inherit;
}

.swiper-button-prev,
.swiper-button-next {
 background: none;
 border: none;
 padding: 0;
 margin: 0;
 cursor: pointer;
 position: relative;
 display: flex;
 align-items: center;
 justify-content: center;
 z-index: 10;
 width: 30px;
 height: 30px;
}

.swiper-button-prev::after,
.swiper-button-next::after {
 font-size: 18px;
 color: #333;
 font-weight: 700;
}

.swiper-button-disabled {
 opacity: 0.2;
 cursor: auto;
}



@media (max-width: 1200px) {
  .event-content-col {
    margin-left: -50px;
  }
  .event-details {
    padding-left: 70px;
  }
}


@media (max-width: 992px) {
 .icon-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  gap: 40px;
 }
  .icon-item {
    width: 160px;
  }

 .box-event-home {
  flex-direction: column;
  align-items: center;
 }

 .box-event-home > div,
 .event-content-col {
  display: contents;
 }

 .month-swiper-container {
  order: 1;
  width: 100%;
  max-width: 600px;
 }

 .event-image-col {
  order: 2;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
 }
 .event-image-col img {
  height: auto;
 }
 
 .event-display {
  order: 3;
  width: 100%;
  max-width: 600px;
 }
 .event-details {
  padding: 25px; 
 }
 .view_moreEvent {
  order: 4;
  margin-top: 25px;
 }

 .view_link {
  order: 5;
 }

.meta-item, .intro-heading, .event-title, .event-description {
  font-size: 20px;
  text-align: justify;
 }
}

@media (max-width: 600px) {
 .main-title {
  font-size: 1.5rem;
 }
 .divider {
  width: 200px;
 }
 
 .service-menu {
   padding: 40px 15px;
 }

 .icon-grid {
  gap: 30px 20px;
 }
 
 .icon-circle {
  width: 80px;
  height: 80px;
 }
 
 .icon-circle > img {
  width: 30px;
 }
 
 .icon-label {
  font-size: 0.8rem;
  width: 100px;
 }
 
  .icon-item {
    width: 130px;
  }
 
 .event-home {
   padding: 40px 10px;
 }
 
 .month-swiper-container {
   gap: 5px;
 }
 
 .month-swiper {
   margin: 15px 5px;
 }
 
 .swiper-button-prev::after,
 .swiper-button-next::after {
   font-size: 16px;
 }

 .event-details {
   padding: 20px;
 }
}
@media (min-width: 1201px) {
 .event-image-col img {
  height: 500px;
  width: 600px;
 }
}
</style>
