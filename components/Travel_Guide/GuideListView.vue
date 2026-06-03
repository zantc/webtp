<template>
  <div>
    <section class="guide-item">
      <div class="title-block">
        <p class="section-title">CẨM NANG DU LỊCH</p>
      </div>
      <div class="guide-list guide-items">
        <div
          v-for="(item, index) in guideItems"
          :key="index"
          class="guide-item-image"
        >
          <img :src="item.image" :alt="item.title" class="guide-image" />
          <div class="overlay"></div>
          <div class="title-service-details over_black">
            <h4>{{ item.title }}</h4>
          </div>
          <div class="guide-title-hover">{{ item.title }}</div>
          <a :href="item.href" class="see-all-btn"> Xem tất cả> </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const guideItems = [
  {
    title: "Ăn gì?",
    image: "/images/news/an-gi.jpg",
    href: "/nha-hang/",
  },
  {
    title: "Chơi gì?",
    image:
      "/images/news/le-hoi.jpg",
    href: "/danh-lam/",
  },
  {
    title: "Ở đâu?",
    image: "/images/news/o-dau.jpg",
    href: "/khach-san/",
  },
  {
    title: "Địa điểm nổi bật",
    image: "/images/news/noi-bat.jpg",
    href: "/di-tich/",
  },
];
</script>

<style scoped>
.guide-item {
  box-shadow: 0 -24px 32px -16px rgba(0, 0, 0, 0.15);
  border-radius: 0px;
}

.guide-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
  justify-content: center;
}

.guide-item-image {
  position: relative;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
}

.guide-image {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.title-service-details {
  position: absolute;
  z-index: 2;
  padding-left: 60px;
  padding-bottom: 20px;
}

.title-service-details h4 {
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: 46px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.over_black {
  position: absolute;
  height: 70px;
  background-image: linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0) 100%);
  width: 100%;
  bottom: 0px;
  transition: 0.2s;
  border-radius: 5px;
  z-index: 0;
  border-radius: 20px;
}

.guide-item-image:hover .title-service-details h4 {
  opacity: 0;
  transition: opacity 0.3s;
}

.guide-item-image .overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;
  background: rgba(210, 215, 250, 0.8);
  transition: height 1s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 2;
  opacity: 1;
  border-radius: 20px;
}

.guide-item-image:hover .overlay {
  height: 100%;
}

.guide-item-image .see-all-btn {
  border: 2px solid #fff;
  color: #fff;
  border-radius: 10px;
  background: rgba(210, 215, 250, 0.1);
  height: 40px;
  width: 40%;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  text-align: center;
  align-content: center;
  text-decoration: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 40px);
  z-index: 3;
  transition: opacity 1s cubic-bezier(0.23, 1, 0.32, 1),
    transform 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.guide-item-image:hover .see-all-btn {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.guide-title-hover {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, 40px);
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  z-index: 3;
  transition: opacity 1s cubic-bezier(0.23, 1, 0.32, 1),
    transform 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.guide-item-image:hover .guide-title-hover {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%);
}

.guide-title {
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 15px;
  color: #000000;
  font-weight: 500;
}

.title-block {
  text-align: center;
  margin-bottom: 10px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  color: #000;
}
.section-title::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: #333;
  margin: 0.5rem auto 0;
}

@media (max-width: 768px) {
  .guide-items {
    grid-template-columns: 1fr;
    gap: 15px;
    max-width: 400px;
    padding: 0 20px;
  }

  .guide-item-image {
    height: 250px;
  }

  .title-service-details {
    bottom: 15px;
    left: 20px;
  }

  .title-service-details h4 {
    font-size: 18px;
    line-height: 32px;
  }
  .over_black {
    background-image: none;
  }
}
</style>
