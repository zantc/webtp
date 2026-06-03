<template>
  <div class="pattern">
    <div class="main">
      <div class="head">
        <div class="introduce">
          <h2>{{ place.name }}</h2>
          <div  v-if="place.address" class="infor">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {{ place.address }}
            </span>
          </div>
          <div  v-if="place.phoneNumber" class="infor">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              {{ place.phoneNumber }}
            </span>
          </div>
          <div  v-if="place.email" class="infor">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              {{ place.email }}
            </span>
          </div>

          <div class="actions">
            <button class="btn-favorite">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
               </svg>
               Yêu thích
            </button>
            <button class="btn-share">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share
            </button>
          </div>
          <!-- <div class="booking">
            <button class="btn-booking">ĐẶT PHÒNG</button>
          </div> -->
        </div>
        <div class="main-image">
          <img :src="place.imageUrl" :alt="place.name" />
        </div>
      </div>
      <h2  v-if="place.amenities">TIỆN NGHI DỊCH VỤ</h2>
      <div class="amenities">
        <div class="amenity-item"  v-if="place.amenities" v-for="amenity in place.amenities" :key="amenity">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>{{ amenity }}</span>
        </div>
      </div>
      <h2 class="title">GIỚI THIỆU</h2>
      <div class="content">
        {{ place.content }}
      </div>
      <br />
    <div v-if="place.address || place.phoneNumber || place.email || place.website" class="content">
        <div>Thông tin liên hệ:</div>
        
        <div v-if="place.address">Địa chỉ: {{ place.address }}</div>
        <div v-if="place.phoneNumber">Điện thoại: {{ place.phoneNumber }}</div>
        <div v-if="place.email">Email: {{ place.email }}</div>
        <div v-if="place.website">Website: <a :href="place.website">{{ place.website }}</a></div>
      </div>

      <MapView :place="props.place"/>
      <div style="text-align: center">
        <h2 class="section-title">ĐỊA ĐIỂM XUNG QUANH</h2>
      </div>
      <div class="locations-slider">
        <swiper
          :loop="true"
          :modules="[Navigation]"
          :slides-per-view="3"
          :space-between="20"
          :slides-per-group="1"
          :navigation="true"
          :breakpoints="{
            320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 20 },
            1024: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 20 },
          }"
        >
          <swiper-slide v-for="nearbyPlace in places" :key="nearbyPlace.key">
            <NuxtLink class="slide-content" :to="`/${props.category}/${nearbyPlace.slug}/`">
              <img :src="nearbyPlace.imageUrl" :alt="nearbyPlace.name" class="place-image" />
              <div class="place-title">{{ nearbyPlace.name }}</div>
              <div class="place-info">
                <span>{{ nearbyPlace.address }}</span>
                <span class="distance-badge">2.0 KM</span>
              </div>
            </NuxtLink>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MapView from "@/components/Maps/MapView.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const props = defineProps<{
  place: any;
  places: any[];
  category:any;
}>();
 
</script>

<style scoped>
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
  mask-image: linear-gradient( to bottom, transparent 0%, black 20%, black 80%, transparent 100% );
  -webkit-mask-image: linear-gradient( to bottom, transparent 0%, black 20%, black 80%, transparent 100% );
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}

.pattern > * {
  position: relative;
  z-index: 1;
}

.main {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2.5rem 3rem;
}

.head {
  display: grid;
  grid-template-columns: 3.5fr 6.5fr;
  gap: 1rem;
  align-items: flex-start;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.introduce h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1rem;
}

.infor {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #555;
  margin-bottom: 1.5rem;
  font-size: 20px;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.actions button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
 
}

.btn-favorite {
  background-color: #ffffff;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn-share {
  background-color: #007bff;
  color: #ffffff;
    border: 1px solid #007bff;
}

.booking {
  max-width: 16.2rem;
}
.booking button {
  width: 100%;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
}
.btn-booking {
  background-color: #444a9b;
  color: #ffff;
  border: 1px solid #444a9b;
  transition: background-color 0.3s ease;
}

.btn-booking:hover {
  background-color: #303577;
}

.main-image img {
  width: 100%;
  border-radius: 8px;
  height: 483px;
  object-fit: cover;
}

.main > h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.content {
  line-height: 1.7;
  color: #000;
  white-space: pre-wrap;
  text-align: justify;
  font-size: 25px;
}

.content a {
  text-decoration: none;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}
.section-title::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: #333;
  margin: 0.5rem auto 0;
}

.title {
  font-size: 25px !important;
  font-weight: bold !important;
}

.amenities {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 2rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}

.amenity-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: #333;
}

.amenity-item svg {
  color: #555;
  flex-shrink: 0;
}

.locations-slider {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 40px;
}

.slide-content {
  text-align: left;
  cursor: pointer;
  text-decoration: none;
}

.slide-content > h3 {
  font-size: 18px;
}

.place-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 16px;
  display: block;
  transition: transform 0.3s ease-in-out;
}
.slide-content:hover .place-image {
  transform: scale(1.05);
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 1rem 0 0.5rem;
}

.place-info {
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  color: #666;
}

.place-title {
  font-size: 25px;
  padding: 10px 0;
  font-weight: bold;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.distance-badge {
  background-color: #e4f3f1;
  color: #279a88;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  background-color: rgba(46, 139, 86, 0.879);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: #ffffff;
  box-shadow: none;
  top: 50%;
  transform: translateY(-50%);
}

:deep(.swiper-button-prev) {
  left: 0;
}
:deep(.swiper-button-next) {
  right: 0;
}

:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
  font-size: 18px;
  font-weight: bold;
}

@media (max-width: 1024px) {
  .main {
    padding: 2rem 1.5rem;
  }
  .head {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .amenities {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .main {
    padding: 1.5rem 1rem;
  }
  .head {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
  }
  .introduce h2 {
    font-size: 1.75rem;
  }
  .infor {
    font-size: 1rem; 
    gap: 0.5rem;
  }
  .main-image img {
    height: auto;
    max-height: 300px;
    object-fit: cover;
  }
  /* .content {
    font-size: 0.95rem;
  } */
  .amenities {
    grid-template-columns: 1fr;
  }
  .locations-slider {
    padding: 0 15px;
  }
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 45px;
    height: 45px;
  }
  :deep(.swiper-button-prev::after),
  :deep(.swiper-button-next::after) {
    font-size: 14px;
  }
  :deep(.swiper-button-prev) {
    left: -5px;
  }
  :deep(.swiper-button-next) {
    right: -5px;
  }
}
</style>