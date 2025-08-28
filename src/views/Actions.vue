<template>
  <header class="pt-30 w-full shadow-md z-10">
    <div class="container mx-auto flex items-center p-4">
      <div class="w-1/3">
        <router-link to="/" class="back-home-btn">
          <span class="text">回首頁</span>
          <span class="icon">←</span>
        </router-link>
      </div>
      <div class="w-1/3 text-center">
        <h1 class="text-2xl font-bold">行動追蹤</h1>
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
    <section class="flex flex-col gap-5 w-full px-4 md:px-0">
      <div
        class="animate-fade-in-up cursor-pointer w-full md:max-w-7xl md:mx-auto min-h-96 md:min-h-80 bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row hover:scale-105"
        v-for="info in paginatedInfo"
        :key="info.id"
        @click="goToActions(info.id)"
      >
        <div class="relative w-full h-64 md:h-auto md:w-1/2">
          <img
            src="../assets/images/sdgs-bg.jpg"
            alt="Card Image"
            class="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
        <div class="p-6 md:p-15 flex flex-col justify-center w-full">
          <h2 class="text-md mb-2">主題：{{ info.title }}</h2>
          <p class="text-md mb-2">
            時間：{{
              info.startTime.length
                ? new Date(info.startTime * 1000).toLocaleDateString() +
                  " ~ " +
                  new Date(info.endTime * 1000).toLocaleDateString()
                : "無"
            }}
          </p>
          <p class="text-md mb-2">成員：{{ info.group }}</p>
          <p class="text-md mb-2">描述：{{ info.intro }}</p>
          <div class="flex items-center w-full md:w-70 gap-3">
            進度：
            <!-- Progress Bar -->
            <div
              class="relative flex-1 bg-gray-200 rounded-full h-2 overflow-hidden"
            >
              <div
                class="h-2 rounded-full transition-all duration-500"
                :class="progressColor(info.progress)"
                :style="{ width: info.progress + '%' }"
              ></div>
            </div>
            <!-- Percentage Number -->
            <span class="w-10 text-sm text-gray-700 text-left">
              {{ info.progress }}%
            </span>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="t in info.types"
              :key="t"
              class="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
            >
              {{ typeTags[t].title }}
            </span>
          </div>
          <p class="text-gray-600 text-sm text-right">更多</p>
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
import infos from "@/data/CS_actions.json";
import typeTags from "@/data/SDGs_goal.json";
import HeaderTabs from "@/components/HeaderTabs.vue";

const visibilityTab = ref(0);
const keyword = ref("");
const currentPage = ref(1);
const itemsPerPage = 3;

const updateVisibilityTab = (data) => {
  visibilityTab.value = data;
  currentPage.value = 1; // Reset to first page on filter change
};
const updateKeyword = (data) => {
  keyword.value = data;
  currentPage.value = 1; // Reset to first page on filter change
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

const progressColor = (progress) => {
  if (progress < 40) return "bg-red-500";
  if (progress < 70) return "bg-yellow-400";
  return "bg-green-500";
};
const goToActions = (id) => {
  return;
  router.push({ name: "actions-detail", params: { id } });
};
</script>
<style scoped>
</style>