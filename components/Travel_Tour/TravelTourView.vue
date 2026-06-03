<template>
 <section class="tour-section">
  <h2 class="section-title">TOUR DU LỊCH</h2>

  <div class="tour-list">
   <NuxtLink
    v-for="(tour, index) in tours"
    :key="index"
    class="tour-card"
    :to="`/travel-tour/${tour.slug}/`"
   >
    <img :src="tour.image" class="tour-image" />
    <div class="tour-info">
     <p class="tour-duration">1 Ngày</p>
     <h3 class="tour-title">{{ tour.title }}</h3>
     <p class="tour-price">0 VNĐ</p>
    </div>
   </NuxtLink>
  </div>
 </section>
</template>

<script setup>
const tours = [
 {
  image: '/images/travel-tour/lang-xua.jpg',
  title: 'Về Làng Xưa – Đại Mỗ Cổ Trấn',
  slug: 've-lang-xua-dai-mo-co-tran',
 },
 {
  image: '/images/travel-tour/di-san-dai-mo.jpg',
  title: 'Hành trình Di sản Đại Mỗ',
  slug: 'hanh-trinh-di-san-dai-mo',
 },
 {
  image: '/images/travel-tour/smart-city.jpg',
  title: 'Đại Mỗ Hiện Đại – Dạo bước giữa đô thị mới',
  slug: 'dai-mo-hien-dai-dao-buoc-giua-do-thi-moi',
 },
 {
  image: '/images/travel-tour/mot-ngay-du-ngoan.jpg',
  title: 'Một ngày du ngoạn',
  slug: 'mot-ngay-du-ngoan',
 },
]
</script>

<style scoped>
.tour-section {
 text-align: center;
 padding: 2rem;
}

.section-title {
 font-size: 24px;
 font-weight: bold;
 margin-bottom: 1.5rem;
 position: relative;
 display: inline-block;
}

.section-title::after {
 content: '';
 display: block;
 width: 60%;
 height: 2px;
 background: #333;
 margin: 0.5rem auto 0;
}


.tour-list {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
 gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.tour-card {
 border: 1px solid #219781;
 border-radius: 16px;
 overflow: hidden;
 display: flex;
 flex-direction: column;
 transition: transform 0.3s ease, box-shadow 0.3s ease; 
 text-decoration: none;
}

.tour-card:hover {
 transform: translateY(-5px); 
 box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.tour-image {
  aspect-ratio: 4 / 3;
 object-fit: cover;
 width: 100%;
}

.tour-info {
 background: #5c64af;
 color: white;
 padding: 1rem;
 text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}
.tour-info h3 {
  margin: 0.5rem 0 !important;
}

.tour-duration {
 font-size: 0.9rem;
 text-transform: uppercase;
 text-align: left;
 margin: auto 0;
}

.tour-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tour-price {
 font-size: 0.9rem;
 text-align: left;
 margin: auto 0;
}
</style>