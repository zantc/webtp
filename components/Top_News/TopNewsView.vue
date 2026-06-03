<template>
  <section
    class="featured-news grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-6xl mx-auto p-4"
  >
    <!-- Left: Image block -->
    <h2 class="text-2xl font-semibold text-center pb-2 mb-4">
      TIN TỨC NỔI BẬT
    </h2>
    <div class="article-space"></div>
    <div
      class="container flex flex-col lg:flex-row gap-4 items-center lg:items-start"
    >
      <!-- Right: News list -->
      <div class="d-flex flex-col lg:flex-row gap-4 content-center">
        <div class="image-container w-full lg:w-1/2">
          <img
          :src="selectedNews.img"
          :alt="selectedNews.title"
          class="rounded-md w-full object-cover shadow-md"
          @click="goToDetail"
          style="cursor: pointer"
        />
        </div>
        <div class="list-container">
          <ul class="space-y-4 text-sm">
            <li
              v-for="news in newsList"
              :key="news.title"
              @click="selectedNews = news"
              :class="{ active: news === selectedNews }"
            >
              <span class="text-green-800 font-semibold"
                >[ {{ news.category }} ] {{ news.title }}</span
              >
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { navigateTo } from '#app'
const newsList = [
  {
    category: "CHUYỂN ĐỔI SỐ",
        slug: "chuyen-doi-so-huong-dan-chi-tiet-cach-tra-cuu-ho-so-dich-vu-cong",
    title: "Hướng dẫn chi tiết cách tra cứu hồ sơ dịch vụ công",
    img: "/images/news/maxresdefault(6).jpg",
  },
  {
    category: "CHUYỂN ĐỔI SỐ",
    slug: "chuyen-doi-so-cac-cach-chuan-hoa-thong-tin-thue-bao-viettel",
    title: "Các cách chuẩn hóa thông tin thuê bao Viettel",
    img: "/images/news/5866bed4301db7fb7cf8ab555413c5f9ab14f223.png",
  },
  {
    category: "CHUYỂN ĐỔI SỐ",
    slug: "chuyen-doi-so-huong-dan-dat-lich-dang-kiem-truc-tuyen",
    title: "Hướng dẫn đặt lịch đăng kiểm trực tuyến",
    img: "/images/news/kd-17138442821361721880032.jpeg",
  },
  {
    category: "CHUYỂN ĐỔI SỐ",
    slug: "chuyen-doi-so-cach-dang-ky-lam-giay-khai-sinh-online-tren-dien-thoai-don-gian",
    title: "Cách đăng ký làm giấy khai sinh online trên điện thoại đơn giản",
    img: "/images/news/lam-giay-khai-sinh-online-1.jpg",
  },
  {
    category: "CHUYỂN ĐỔI SỐ",
    slug: "chuyen-doi-so-huong-dan-dang-ky-nhan-luong-huu-qua-the-atm-tren-ung-dung-vssid",
    title:
      "Hướng dẫn đăng ký nhận lương hưu qua thẻ ATM trên ứng dụng VssID",
    img: "/images/news/HDan nhan luong huu bang tai khoan qua VSSID.jpg",
  },
  {
    category: "CHUYỂN ĐỔI SỐ",
    slug: "chuyen-doi-so-ly-do-giup-viettel-agile-gianh-giai-quoc-te-ve-chuyen-doi-so",
    title:
      "Lý do giúp Viettel AGILE giành giải quốc tế về chuyển đổi số",
    img: "/images/news/471201156_584954557614752_6695968001605677247_n.jpg",
  },
];
const selectedNews = ref(newsList[0]);
const goToDetail = () => {
  if (selectedNews.value?.slug) {
    navigateTo(`/news/${selectedNews.value.slug}`)
  }
}
</script>

<style scoped lang="scss">
/* Nếu không dùng Tailwind, thay bằng CSS thường: */
.featured-news {
  display: inline;
  max-width: 100%;
  gap: 1.5rem;
}

.list-container {
  padding-right: 1rem;
}

.container {
  margin-top: 30px;
  min-height: auto !important;
  align-items: center;
  max-width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;

  .image-container {
    width: 60%;
    height: 60%;
  }
  .content-center {
    max-width: 1300px;
    
    // Mobile: Stack vertically
    @media (max-width: 1023px) {
      flex-direction: column;
      width: 100%;
      max-width: 100%;
    }
    
    // Desktop: Side by side
    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }
  
  .content-center .image-container {
    width: 50rem;
    height: 23rem;

    object-fit: cover;
    overflow: hidden;
    
    // Mobile responsive
    @media (max-width: 1023px) {
      width: auto;
      height: 220px;
      margin-bottom: 1rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }

  .text-sm{
    margin-top: 0px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
}

.featured-news h2 {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding-bottom: 0.3rem;
  margin-bottom: 0.3rem;
}

.featured-news ul li {
  padding-left: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 60px;
  display: flex;
  align-items: center;
}

.featured-news ul li >a {
text-decoration: none;
}

.featured-news ul li:not(:last-child) {
  border-bottom: 2px solid teal;
}

.featured-news ul li:hover {
  color: #007bff;
}
.featured-news ul li.active {
  background-color: #f0f8ff; /* Một màu nền nhạt */
  color: #007bff;
}

.space-y-4 {
  margin-top: 1rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  list-style: none;
  
  // Mobile: Full width
  @media (max-width: 1023px) {
    width: 100%;
    margin-top: 0;

  }
}

// Additional mobile responsiveness
@media (max-width: 768px) {
  .featured-news {
    padding: 1rem;
  }
  
  .container {
    margin-top: 20px;
    gap: 0.5rem;
  }
  
  .featured-news h2 {
    font-size: 1.25rem;
  }
  
  .space-y-4 {
    font-size: 1rem;
    
  }
    .featured-news ul   {
    min-height: 50px;
    padding-left: 0.5rem;
  }
  
  .featured-news ul li {
    min-height: 50px;
    padding-left: 0rem;
  }
}
</style>