<template>
  <Image360View src="/web360/chua-phung-khoang/tour.html"/>
  <div class="content">
    <TravelGuideView />
    <GuideListView />
    <TopNewsView />
    <TravelTourView />
    <MapView />
    <!-- <VietNam /> -->
  </div>
</template>
<script setup>
import TravelGuideView from '@/components/Travel_Guide/TravelGuideView.vue'
import TopNewsView from '@/components/Top_News/TopNewsView.vue'
import TravelTourView from '@/components/Travel_Tour/TravelTourView.vue'
import MapView from '@/components/Maps/MapView.vue'
import VietNam from '@/components/VietNam/VietNam.vue'
import GuideListView from '@/components/Travel_Guide/GuideListView.vue'
</script>