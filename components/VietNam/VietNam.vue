<template>
  <div>
    <section class="vn360">
    <slide-show :images="images" />
    </section>
  </div>
</template>

<script setup lang="ts">
import SlideShow from './SlideShow.vue'

const images = [
  { title: 'Hà Nội', url: '/images/Viet-Nam-360/ha_noi.jpg' },
  { title: 'Cần Thơ', url: '/images/Viet-Nam-360/can_tho.jpg' },
  { title: 'Đà Lạt', url: '/images/Viet-Nam-360/da_lat.jpg' },
  { title: 'Phú Quốc', url: '/images/Viet-Nam-360/phu_quoc.jpg' },
   { title: 'Hà Nội', url: '/images/Viet-Nam-360/ha_noi.jpg' },
  { title: 'Cần Thơ', url: '/images/Viet-Nam-360/can_tho.jpg' },
  { title: 'Đà Lạt', url: '/images/Viet-Nam-360/da_lat.jpg' },
  { title: 'Phú Quốc', url: '/images/Viet-Nam-360/phu_quoc.jpg' },
]
</script>

<style scoped>
</style>