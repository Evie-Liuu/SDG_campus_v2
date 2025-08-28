<template>
  <header class="pt-30 w-full shadow-md z-10">
    <div class="container mx-auto flex items-center p-4">
      <div class="w-1/3">
        <router-link to="/sdgs" class="back-home-btn">
          <span class="text">回上頁</span>
          <span class="icon">←</span>
        </router-link>
      </div>
      <div class="w-1/3 text-center">
        <h1 class="text-2xl font-bold">故事牆</h1>
      </div>
      <div class="w-1/3"></div>
    </div>
  </header>
  <main class="p-10 flex flex-col justify-center items-center gap-8">
    <HeaderTabs
      @update:visibilityTab="updateVisibilityTab"
      @update:keyword="updateKeyword"
      class="md:max-w-7xl md:mx-auto flex flex-row justify-between items-center w-full"
    />
    <section class="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 md:p-0 md:gap-5">
      <div
        class="animate-fade-in-up cursor-pointer w-full md:mx-auto min-h-80 bg-white rounded-xl shadow-md overflow-hidden flex flex-col gap-5 hover:scale-105"
        v-for="info in paginatedInfo"
        :key="info.id"
        @click="goToStory(info.id)"
      >
        <img
          src="@/assets/images/story-bg.webp"
          alt="Card Image"
          class="h-45 object-cover"
        />
        <div class="p-4 flex flex-col justify-center">
          <h2 class="text-xl font-bold mb-2">{{ info.title }}</h2>
          <p class="text-gray-600 text-sm">{{ info.intro }}</p>
          <p class="text-gray-600 text-sm text-right pe-3">更多</p>
        </div>
      </div>
    </section>
    <!-- Pagination -->
    <div class="flex justify-center items-center gap-4 mt-8">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
      >
        上一頁
      </button>
      <span>第 {{ currentPage }} / {{ totalPages }} 頁</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
      >
        下一頁
      </button>
    </div>
  </main>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import infos from "@/data/ChungShan.json";
import HeaderTabs from "@/components/HeaderTabs.vue";

const visibilityTab = ref(0);
const keyword = ref("");
const currentPage = ref(1);
const itemsPerPage = 6;

const updateVisibilityTab = (data) => {
  visibilityTab.value = data;
  currentPage.value = 1;
};
const updateKeyword = (data) => {
  keyword.value = data;
  currentPage.value = 1;
};

const filteredInfo = computed(() => {
  let results = infos;

  if (visibilityTab.value !== 0) {
    results = infos.filter(
      (info) => info.types.indexOf(visibilityTab.value) !== -1
    );
  }

  if (keyword.value.trim() !== "") {
    results = results.filter((info) =>
      info.title.toLowerCase().includes(keyword.value.trim().toLowerCase())
    );
  }

  return results;
});

const totalPages = computed(() => {
  return Math.ceil(filteredInfo.value.length / itemsPerPage);
});

const paginatedInfo = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredInfo.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const router = useRouter();
const goToStory = (id) => {
  router.push({ name: "story-detail", params: { id } });
};
</script>
<style scoped>
</style>