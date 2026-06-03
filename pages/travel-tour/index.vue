<template>
  <div class="banner-image">
    <img
      src="/images/news/chua_ngoc_truc.jpg"
      alt="Hình ảnh Hồ Tây"
    />
  </div>

  <div class="search-wrapper">
    <div class="search-box">
        <div class="search-item">
            <div class="search-title">Địa điểm</div>
            <input class="search-input" type="text" placeholder="Địa điểm" v-model="searchName" @input="handleSearch" />
        </div>
        <div class="search-item">
            <div class="search-title">Ngày</div>
            <div class="search-input-container">
                <input class="search-input" type="date" v-model="searchDate" @input="handleSearch" />
            </div>
        </div>
    </div>
  </div>

    <div class="pattern">
        <h2 class="pattern-title">Tour Du Lịch</h2>
        <!-- Đã thay thế bằng tour-list dùng paginatedEvents phía dưới -->
        <div class="tour-list">
            <NuxtLink class="tour-item-container" v-for="(item, idx) in paginatedEvents" :key="idx" :to="`/travel-tour/${item.slug}/`" style="text-decoration: none;">
                <img :src="item.image" :alt="item.title" class="tour-image" />
                <div class="tour-content">
                    <div class="tour-title">{{ item.title }}</div>
                    <div class="tour-date">
                        <svg fill="#fff" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 612 612" xml:space="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M306,87.735c-120.352,0-218.265,97.914-218.265,218.266S185.648,524.266,306,524.266s218.266-97.912,218.266-218.265 S426.352,87.735,306,87.735z M420.801,328.658H306c-12.513,0-22.658-10.145-22.658-22.656V166.306 c0-12.513,10.143-22.656,22.658-22.656c12.513,0,22.656,10.145,22.656,22.656v117.037h92.145 c12.513,0,22.658,10.145,22.658,22.658C443.457,318.513,433.315,328.658,420.801,328.658z"></path> <path d="M306,0C137.272,0,0,137.272,0,306.002C0,474.73,137.272,612,306,612s306-137.27,306-305.998C612,137.272,474.728,0,306,0z M306,564.923C163.23,564.923,47.077,448.77,47.077,306C47.077,163.228,163.228,47.074,306,47.074 c142.77,0,258.923,116.154,258.923,258.926C564.923,448.77,448.77,564.923,306,564.923z"></path> </g> </g> </g></svg>                        
                        {{ item.start_date }} - {{ item.end_date }}</div>
                    <div class="tour-address">
                        <svg fill="#fff" viewBox="0 0 32 32" style="height: 30px; width: 30px; fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Layer1"> <path d="M16,2c-6.071,0 -11,4.929 -11,11c0,2.778 1.654,6.081 3.699,9.019c2.939,4.224 6.613,7.707 6.613,7.707c0.386,0.365 0.99,0.365 1.376,-0c0,-0 3.674,-3.483 6.613,-7.707c2.045,-2.938 3.699,-6.241 3.699,-9.019c0,-6.071 -4.929,-11 -11,-11Zm0,5.5c-3.036,0 -5.5,2.464 -5.5,5.5c0,3.036 2.464,5.5 5.5,5.5c3.036,-0 5.5,-2.464 5.5,-5.5c0,-3.036 -2.464,-5.5 -5.5,-5.5Zm0,2c1.932,0 3.5,1.568 3.5,3.5c0,1.932 -1.568,3.5 -3.5,3.5c-1.932,-0 -3.5,-1.568 -3.5,-3.5c0,-1.932 1.568,-3.5 3.5,-3.5Z"></path> </g> </g></svg>
                        {{ item.address }}</div>
                </div>
            </NuxtLink>
        </div>
    </div>

    <div class="main-list">

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
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const searchName = ref('')
const searchDate = ref('')

const tours = [
  {
    image: '/images/travel-tour/lang-xua.jpg',
    title: 'Về Làng Xưa – Đại Mỗ Cổ Trấn',
    slug: 've-lang-xua-dai-mo-co-tran',
    start_date: '2025-12-19',
    end_date: '2025-12-20',
    address: "Đại Mỗ, Nam Từ Liêm, Hà Nội",
  },
  {
    image: '/images/travel-tour/di-san-dai-mo.jpg',
    title: 'Hành trình Di sản Đại Mỗ',
    slug: 'hanh-trinh-di-san-dai-mo',
    start_date: '2025-12-19',
    end_date: '2025-12-20',
    address: "Đại Mỗ, Nam Từ Liêm, Hà Nội",
  },
  {
    image: '/images/travel-tour/smart-city.jpg',
    title: 'Đại Mỗ Hiện Đại – Dạo bước giữa đô thị mới',
    slug: 'dai-mo-hien-dai-dao-buoc-giua-do-thi-moi',
    start_date: '2025-12-19',
    end_date: '2025-12-20',
    address: "Đại Mỗ, Nam Từ Liêm, Hà Nội",
  },
  {
    image: '/images/travel-tour/mot-ngay-du-ngoan.jpg',
    title: 'Một ngày du ngoạn',
    slug: 'mot-ngay-du-ngoan',
    start_date: '2025-12-19',
    end_date: '2025-12-20',
    address: "Đại Mỗ, Nam Từ Liêm, Hà Nội",
  },

]

const filteredTours = computed(() => {
  return tours.filter(tour => {
    const matchName = searchName.value.trim() === '' || tour.title.toLowerCase().includes(searchName.value.trim().toLowerCase())
    const matchDate = !searchDate.value || (tour.start_date <= searchDate.value && tour.end_date >= searchDate.value)
    return matchName && matchDate
  })
})

const eventsPerPage = 6
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(filteredTours.value.length / eventsPerPage))
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage
  return filteredTours.value.slice(start, start + eventsPerPage)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const router = useRouter()
const goToDetailPage = (tour) => {
  router.push(`/travel-tour/${tour.slug}`)
};

function handleSearch() {
  currentPage.value = 1
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
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        background-color: white;
        border-radius: 15px;
        border: #7f8083 2px solid;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        width: 70%;
        max-width: 1200px;
        align-items: stretch;
        position: relative;
    }

    .search-item:first-child {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .search-item:first-child::after {
        content: "";
        position: absolute;
        top: 18px;
        right: 0;
        width: 3px;
        height: calc(100% - 36px);
        background: #5c64af;
        border-radius: 2px;
    }

    .search-item {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .search-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .search-title::before {
        content: "";
        display: inline-block;
        width: 16px;
        height: 16px;
        background: #5c64af;
        border-radius: 50%;
        margin-right: 8px;
    }

    .search-input {
        border: #7f8083 2px solid;
        background: transparent;
        border-radius: 10px;
        width: 80%;
        font-size: 16px;
        outline: none;
        color: #333;
        padding: 12px 16px;
        margin-left: 25px;
    }

    .tour-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        max-width: 1200px;
        margin: 60px auto 40px auto;
        justify-content: center;
    }

    .tour-item-container {
        width: 400px;
        border-radius: 20px;
        overflow: hidden;
        background: #8690d3;
        box-shadow: 0 4px 16px rgba(0,0,0,0.13);
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s;
        position: relative;
    }

    .tour-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 20px 20px 0 0;
        display: block;
        transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
    }

    .tour-item-container:hover .tour-image {
        transform: scale(1.12);
        z-index: 0;
    }

    .tour-content {
        padding: 16px 16px;
        color: #fff;
        background: #8690d3;
        z-index: 1;
    }

    .tour-date,
    .tour-address {
        display: flex;
        align-items: center;
        gap: 8px;
        line-height: 0.3;
        margin: 5px;
    }

    .tour-title {
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 10px;
    }
  
    .search-input-container {
        display: flex;
    }

    .pattern-title {
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        color: #000;
        margin-top: 40px;
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
        margin-top: 20px;
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
        .tour-list {
            grid-template-columns: 1fr;
        }

        .tour-item-container {
            width: 90%;
        }

        .search-box {
            grid-template-columns: 1fr;
            width: 95%;
            min-width: unset;
            max-width: 98vw;
            padding: 16px 8px;
            margin-left: 20px;
            margin-right: 20px;
        }

        .search-item:first-child::after {
            display: none;
        }

        .search-item {
            padding: 10px 0;
        }

        .search-input {
            width: 100%;
            margin-left: 0;
            box-sizing: border-box;
        }

        .search-input-container {
            flex-direction: row;
            width: 100%;
        }

        .search-input-container {
            flex-direction: column;
            width: 100%;
            gap: 0;
        }
    }
</style>