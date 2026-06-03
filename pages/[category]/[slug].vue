<template>
  <div>
    <div v-if="detailData" class="banner-image">
      <image360-view
        v-if="detailData.path360"
        :src="detailData.path360"
      ></image360-view>
      <img
        v-else
        :src="detailData.imageBanner || detailData.imageUrl"
        alt="360 view"
      />
    </div>
    <component
      v-if="detailData"
      :is="detailComponent"
      :place="detailData"
      :places="nearbyPlaces"
      :category="category"
    />
    <div v-else class="error-message">
      <h2>Không tìm thấy địa điểm</h2>
      <p>
        Rất tiếc, chúng tôi không thể tìm thấy thông tin bạn yêu cầu. Vui lòng
        thử lại sau.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";
import { useRoute } from "vue-router";
import allMockData from "~/public/allMockData.json";

const route = useRoute();
const category = route.params.category as string;
const slug = route.params.slug as string;

const detailData = computed(() => {
  // @ts-ignore
  const categoryData = allMockData[category];
  if (!categoryData) {
    return null;
  }
  // @ts-ignore
  return categoryData.find((p) => p.slug === slug) || null;
});

const nearbyPlaces = computed(() => {
  // @ts-ignore
  const categoryData = allMockData[category];
  if (!categoryData) {
    return [];
  }
  return (
    categoryData
      // @ts-ignore
      .filter((place) => place.slug !== slug)
  );
});

const componentMap = {
  "khach-san": "DetailsHotel",
  "nha-hang": "DetailsRestaurant",
  "danh-lam": "DetailsDefault",
  "di-tich": "DetailsDefault",
  "le-hoi": "DetailsDefault",
  "lang-nghe": "DetailsDefault",
  "co-quan-hanh-chinh": "DetailsDefault",
  "trung-tam-hoi-nghi-su-kien": "DetailsDefault",
  "dich-vu-ho-tro-du-lich": "DetailsDefault",
};

// @ts-ignore
const componentName = componentMap[category] || "DetailsDefault";

const detailComponent = defineAsyncComponent(
  () => import(`~/components/details/${componentName}.vue`)
);
</script>

<style scoped>
.error-message {
  text-align: center;
  padding: 5rem 1rem;
  color: #555;
}

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
</style>
