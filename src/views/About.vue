<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="loader"></div>
    <p>Loading...</p>
  </div>
  <div class="w-screen h-screen bg-rice-500">
    <!-- <div
    class="w-screen h-screen bg-[url(@/assets/images/about-bg.jpg)] bg-repeat bg-center overflow-hidden"
  > -->
    <!-- <nav class="absolute z-10 left-50 top-30 flex flex-col text-2xl">
      <router-link to="/" class="bg-white rounded-md px-8 py-3"
        >回首頁</router-link
      >
    </nav> -->
    <main class="w-full h-full flex justify-center">
      <iframe
        src="https://www.thinglink.com/view/scene/2016738261199749797"
        type="text/html"
        class="w-full h-full pt-27"
        style="border: none"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
        scrolling="no"
      ></iframe>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>
<style scoped>
</style>