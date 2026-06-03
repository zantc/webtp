<template>
  <div id="container">
    <iframe :src="src" width="100%" height="100%" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: String
})

const { src } = toRefs(props)
</script>