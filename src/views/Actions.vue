<template>
  <main class="pt-30 flex flex-col justify-center items-center gap-8">
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
        class="cursor-pointer md:min-w-7xl md:mx-auto min-h-80 bg-white rounded-xl shadow-md overflow-hidden flex"
        v-for="info in filteredInfo"
        :key="info.id"
        @click="goToActions(info.id)"
      >
        <img
          src="https://via.placeholder.com/150"
          alt="Card Image"
          class="w-1/3 object-cover"
        />
        <summary class="p-4 flex flex-col justify-center w-70">
          <h2 class="text-md mb-2">主題：{{ info.title }}</h2>
          <p class="text-md mb-2">
            時間：{{
              info.startTime.length
                ? new Date(info.startTime * 1000).toLocaleDateString() +
                  " ~ " +
                  new Date(info.endTime * 1000).toLocaleDateString()
                : "無期限"
            }}
          </p>
          <p class="text-md mb-2">成員：{{ info.group }}</p>
          <p class="text-md mb-2">描述：{{ info.intro }}</p>

          <div class="flex items-center w-full gap-3">
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

const progressColor = (progress) => {
  if (progress < 40) return "bg-red-500";
  if (progress < 70) return "bg-yellow-400";
  return "bg-green-500";
};
const goToActions = (id) => {
  return
  router.push({ name: "actions-detail", params: { id } });
};
</script>
<style scoped>
</style>