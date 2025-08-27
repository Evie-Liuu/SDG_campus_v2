<template>
  <main class="pt-30 flex flex-col justify-center items-center gap-8">
    <nav class="absolute z-10 left-50 top-30 flex flex-col text-2xl">
      <router-link to="/sdgs" class="bg-white rounded-md px-8 py-3"
        >回上頁</router-link
      >
    </nav>
    <h1 class="text-4xl font-bold">故事牆</h1>
    <HeaderTabs
      @update:visibilityTab="updateVisibilityTab"
      @update:keyword="updateKeyword"
      class="md:max-w-7xl md:mx-auto flex flex-row justify-between items-center w-full"
    />
    <section class="grid grid-cols-1 md:grid-cols-3 md:gap-5">
      <div
        class="cursor-pointer md:w-md md:mx-auto min-h-80 bg-white rounded-xl shadow-md overflow-hidden flex flex-col gap-5 hover:scale-105"
        v-for="info in paginatedInfo"
        :key="info.id"
        @click="goToStory(info.id)"
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
    results = infos.filter((info) => info.type * 1 === visibilityTab.value);
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