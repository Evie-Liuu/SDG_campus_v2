<template>
  <main class="pt-40 flex flex-col justify-center items-center gap-8">
    <nav class="absolute z-10 left-50 top-30 flex flex-col">
      <router-link to="/sdgs">回上頁</router-link>
    </nav>
    <h1 class="text-3xl font-bold">故事牆</h1>
    <section
      class="md:max-w-7xl md:mx-auto flex flex-row justify-between items-center w-full"
    >
      <ul
        ref="tabContainer"
        class="w-full flex flex-row items-center gap-5 h-10 flex-grow"
      >
        <li
          v-for="tab in visibleTabs"
          :key="tab.value"
          class="flex-shrink-0 h-full flex items-center"
        >
          <a
            href=""
            :class="{ active: visibilityTab === tab.value }"
            class="hover:bg-green-200 rounded p-2 px-3 whitespace-nowrap"
            @click.prevent="visibilityTab = tab.value"
            v-html="tab.title"
          ></a>
        </li>
        <li v-if="hiddenTabs.length" class="relative group flex-shrink-0">
          <a
            href="#"
            @click.prevent
            class="h-full cursor-pointer hover:bg-green-200 rounded p-2 px-3"
            >更多 ▾</a
          >
          <ul
            class="absolute top-8 left-1 bg-white shadow rounded hidden group-hover:block"
          >
            <li v-for="tab in hiddenTabs" :key="tab.value">
              <a
                href=""
                class="block px-4 py-2 bg-gray-100 hover:bg-green-200 whitespace-nowrap rounded"
                @click.prevent="visibilityTab = tab.value"
                v-html="tab.title"
              ></a>
            </li>
          </ul>
        </li>
      </ul>
      <div ref="rightTools" class="relative flex items-center">
        <button @click="showSearch = !showSearch" class="p-2">
          <i class="fa-solid fa-magnifying-glass text-2xl"></i>
        </button>
        <transition name="fade">
          <input
            v-if="showSearch"
            v-model="keyword"
            type="text"
            placeholder="搜尋..."
            class="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-48"
          />
        </transition>
        <a
          v-if="showSearch & keyword.length"
          href="#"
          class="absolute right-2"
          @click.prevent="keyword = ''"
        >
          <i class="fa-solid fa-xmark text-gray-400"></i>
        </a>
      </div>
    </section>
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
import targets from "@/data/SDGs_target.json";

const headerTabs = ref(targets);
const visibilityTab = ref(headerTabs.value[0].value);

const showSearch = ref(false);
const keyword = ref("");
const tabContainer = ref(null);
const rightTools = ref(null);
const visibleTabs = ref([]);
const hiddenTabs = ref([]);

const updateTabs = () => {
  // Ensure the container and tools refs are available
  if (!tabContainer.value || !rightTools.value) return;

  const container = tabContainer.value.parentNode;
  if (!container) return;

  const availableWidth =
    container.clientWidth - rightTools.value.offsetWidth - 20; // 20px buffer
  const moreButtonWidth = 300; // Estimated width for the 'More' button

  let usedWidth = 0;
  const newVisible = [];
  const newHidden = [];

  // This function now runs *after* all tabs are rendered in the DOM,
  // so it can correctly measure them.
  const items = tabContainer.value.querySelectorAll("li:not(.relative)");

  items.forEach((el, i) => {
    const tabData = headerTabs.value[i];
    if (!tabData) return;

    const w = el.offsetWidth;

    // Check if there's enough space for the current tab plus the 'More' button
    if (usedWidth + w < availableWidth - moreButtonWidth) {
      usedWidth += w;
      newVisible.push(tabData);
    } else {
      newHidden.push(tabData);
    }
  });

  // If there's only one hidden item, check if it can fit without the 'More' button
  if (newHidden.length === 1) {
    const lastItem = items[newVisible.length];
    if (lastItem && usedWidth + lastItem.offsetWidth < availableWidth) {
      newVisible.push(newHidden.shift());
    }
  }

  visibleTabs.value = newVisible;
  hiddenTabs.value = newHidden;
};

onMounted(() => {
  visibleTabs.value = [...headerTabs.value];

  nextTick(() => {
    updateTabs();

    window.addEventListener("resize", updateTabs);
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", updateTabs);
});
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