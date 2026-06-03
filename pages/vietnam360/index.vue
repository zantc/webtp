<template>
    <div class="banner-image">
        <img
            src="/images/news/chua_ngoc_truc.jpg"
            alt="Hình ảnh Hồ Tây"
        />
    </div>
    <div class="pattern">
        <h2 class="pattern-title">VIỆT NAM 360</h2>
        <div class="map-list">
            <div class="map-item" v-for="image in images" :key="image.title">
                <img :src="image.url" :alt="image.title" class="map-image" />
            </div>
        </div>
    </div>
</template>

<script setup>

const images = [
  { title: 'Hà Nội', url: '/images/Viet-Nam-360/ha_noi.jpg' },
  { title: 'Cần Thơ', url: '/images/Viet-Nam-360/can_tho.jpg' },
  { title: 'Đà Lạt', url: '/images/Viet-Nam-360/da_lat.jpg' },
  { title: 'Phú Quốc', url: '/images/Viet-Nam-360/phu_quoc.jpg' },
]
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

.pattern-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
}

.map-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1200px;
    margin: 40px auto 40px auto;
    justify-content: center;
}

.map-item {
    width: 100%;
    height: 100%;
    aspect-ratio: 5/3;
    overflow: hidden;
    display: flex;
    border-radius: 15px;
}

.map-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
}

.map-item:hover .map-image {
    transform: scale(1.12);
    z-index: 2;
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
</style>