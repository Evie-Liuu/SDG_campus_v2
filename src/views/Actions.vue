<template>
  <main class="pt-40 flex flex-col justify-center items-center gap-8">
    <nav class="absolute z-10 left-50 top-30 flex flex-col">
      <router-link to="/">回首頁</router-link>
    </nav>
    <h1 class="text-3xl font-bold">行動追蹤</h1>
    <HeaderTabs
      @update:visibilityTab="updateVisibilityTab"
      @update:keyword="updateKeyword"
      class="md:max-w-7xl md:mx-auto flex flex-row justify-between items-center w-full"
    />
    <section class="flex flex-col gap-4">
      <div
        class="cursor-pointer md:min-w-5xl md:mx-auto min-h-80 bg-white rounded-xl shadow-md overflow-hidden flex"
        v-for="info in filteredInfo"
        :key="info.id"
        @click="goToArticle(info.id)"
      >
        <img
          src="https://via.placeholder.com/150"
          alt="Card Image"
          class="w-1/2 object-cover"
        />
        <summary class="p-4 flex flex-col justify-center">
          <h2 class="text-xl font-bold mb-2">{{ info.title }}</h2>
          <p class="text-gray-600 text-sm">{{ info.summary }}</p>
          <p class="text-gray-600 text-sm">更多</p>
        </summary>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref, computed } from "vue";
import infos from "@/data/CS_actions.json";
import HeaderTabs from "@/components/HeaderTabs.vue";

const visibilityTab = ref(0);
const keyword = ref("");
const updateVisibilityTab = (data) => {
  visibilityTab.value = data;
};
const updateKeyword = (data) => {
  keyword.value = data;
};

const filteredInfo = computed(() => {
  let results = infos;

  if (visibilityTab.value !== 0) {
    results = infos.filter((info) => info.type * 1 === visibilityTab.value);
  }

  if (keyword.value.trim() !== "") {
    results = results.filter((info) =>
      info.title.toLowerCase().includes(keyword.value.trim().toLowerCase())
    );
  }

  return results;
});
</script>
<style scoped>
</style>