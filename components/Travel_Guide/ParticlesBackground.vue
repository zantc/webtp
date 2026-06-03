<template>
  <div class="absolute inset-0 z-0">
    <NuxtParticles
      id="tsparticles"
      style="height: 100%"
      :options="options"
      @load="onLoad"
      class="w-full h-full"
    />
  </div>
</template>

<script setup lang="ts">
import type {
  Container,
  IOptions,
  RecursivePartial,
} from "@tsparticles/engine";

const options = ref<RecursivePartial<IOptions>>({
  background: { color: "transparent" },
  fullScreen: { enable: false },
  particles: {
    number: { value: 160 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    move: {
      enable: true,
      speed: 2.2,
      direction: "none",
      outModes: { default: "bounce" },
    },
    links: {
      enable: true,
      color: "#ffffff",
      distance: 150,
      opacity: 0.3,
      width: 1,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 100 },
    },
  },
});

const onLoad = (container: Container) => {
  container.pause();
  setTimeout(() => container.play(), 100);
};
</script>
