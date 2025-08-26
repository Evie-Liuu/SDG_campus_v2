<template>
  <main class="pt-40 flex flex-col justify-center items-center gap-8">
    <nav class="absolute z-10 left-50 top-30 flex flex-col">
      <router-link to="/sdgs">回上頁</router-link>
    </nav>
    <h1 class="text-3xl font-bold">故事牆</h1>
    <HeaderTabs
      @update:visibilityTab="updateVisibilityTab"
      @update:keyword="updateKeyword"
      class="md:max-w-7xl md:mx-auto flex flex-row justify-between items-center w-full"
    />
    <section class="grid grid-cols-1 md:grid-cols-3 md:gap-5">
      <div
        class="cursor-pointer md:w-md md:mx-auto min-h-80 bg-white rounded-xl shadow-md overflow-hidden flex flex-col gap-5"
        v-for="info in filteredInfo"
        :key="info.id"
        @click="goToArticle(info.id)"
      >
        <img
          src="https://via.placeholder.com/150"
          alt="Card Image"
          class="h-45 object-cover"
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
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import infos from "@/data/ChungShan.json";
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

const router = useRouter();
const goToArticle = (id) => {
  router.push({ name: "article-detail", params: { id } });
};
</script>
<style scoped>
</style>