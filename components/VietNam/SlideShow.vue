<template>
    <section class="panorama-section">
        <h2>VIỆT NAM 360</h2>
        <div class="article-space"></div>
        <p>Hãy khám phá những điểm đến tuyệt vời không thể bỏ lỡ ở Việt Nam</p>

        <Swiper
            :modules="[EffectCoverflow, Navigation, Autoplay]"
            effect="coverflow"
            :centeredSlides="true"
            :loop="true"
            :grabCursor="true"
            :coverflowEffect="{
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1.5,
                slideShadows: false
            }"
            :autoplay="{ 
                delay: 5000,
                pauseOnMouseEnter: true,
            }"
            navigation
            class="panorama-swiper"
            :breakpoints="{
                '320': {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                '768': {
                    slidesPerView: 1.2,
                    spaceBetween: -100
                }
            }"
        >
            <SwiperSlide v-for="(item, index) in images" :key="index" class="panorama-slide">
                <img :src="item.url" :alt="item.title" />
                <h3 class="slide-title">{{ item.title }}</h3>
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

defineProps<{
    images: { title: string; url: string }[]
}>()
</script>

<style scoped lang="scss">
/* --- THIẾT KẾ GỐC CHO MÀN HÌNH LỚN --- */
.panorama-section {
    font-family: "Korinna", Times, serif;
    text-align: center;
    padding: 2rem;

    h2 {
        font-size: 2rem;
        font-weight: 300;
        margin-bottom: 0.5rem;
    }

    p {
        color: #666;
        margin-bottom: 2rem;
    }
    .article-space {
        border-bottom: 3px solid #3f4042;
        width: 229px;
        margin: 2px auto 15px auto;
    }
    .panorama-swiper {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        padding-bottom: 2rem;
        padding-left: 2rem;
        padding-right: 2rem;
    }
    
    :deep(.swiper-button-prev),
    :deep(.swiper-button-next) {
        background-color: #388e7d;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: white;
        top: 50%;
        transform: translateY(-50%);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    :deep(.swiper-button-prev)::after,
    :deep(.swiper-button-next)::after {
        font-size: 1rem;
        font-weight: bold;
    }
    
    .panorama-slide {
        position: relative;
        border-radius: 20px;
        transition: transform 0.4s ease;
        overflow: hidden;
    }

    .panorama-slide img {
        width: 100%;
        height: 390px;
        object-fit: cover;
        border-radius: 20px;
        transition: all 0.3s ease;
    }
    
    .slide-title {
        position: absolute;
        bottom: 20px;
        left: 20px;
        font-size: 2rem;
        color: white;
        font-family: 'Pacifico', cursive;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
        z-index: 2;
    }
    
    :deep(.swiper-slide-active img) {
        transform: scaleX(0.85);
        transition: transform 0.3s ease;
    }

    @media (max-width: 767px) {
        .panorama-section {
            padding: 2rem 0;
        }

        .panorama-slide img {
            height: auto; 
            aspect-ratio: 16 / 9; 
        }

        .slide-title {
            font-size: 1.5rem;
            bottom: 15px;
            left: 15px;
        }

        .panorama-swiper {
            padding-left: 0;
            padding-right: 0;
        }

        :deep(.swiper-button-prev) { left: 10px; }
        :deep(.swiper-button-next) { right: 10px; }

        :deep(.swiper-button-prev),
        :deep(.swiper-button-next) {
            width: 35px;
            height: 35px;
        }
    }
}
</style>