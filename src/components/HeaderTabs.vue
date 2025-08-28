<template>
  <!-- Mobile Dropdown -->
  <div class="md:hidden relative flex-grow">
    <select
      v-model="visibilityTab"
      class="w-full p-2 border rounded-md appearance-none bg-white text-xl"
    >
      <option
        v-for="tab in sortedHeaderTabs"
        :key="tab.value"
        :value="tab.value"
      >
        {{ tab.title }}
        {{
          props.counts && props.counts[tab.value] !== undefined
            ? `(${props.counts[tab.value]})`
            : ""
        }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    >
      <svg
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </div>
  </div>

  <!-- Desktop Tabs -->
  <ul
    ref="tabContainer"
    class="hidden md:flex flex-row items-center justify-center gap-5 h-10 flex-grow text-xl"
  >
    <li
      v-for="tab in visibleTabs"
      :key="tab.value"
      class="flex-shrink-0 h-full flex items-center"
    >
      <a
        href=""
        :class="{ active: visibilityTab == tab.value }"
        class="hover:bg-green-200 rounded p-2 px-3 whitespace-nowrap"
        @click.prevent="visibilityTab = tab.value"
        v-html="
          tab.title +
          (props.counts && props.counts[tab.value] !== undefined
            ? ` <span class='text-gray-500'>(${props.counts[tab.value]})</span>`
            : '')
        "
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
        class="absolute z-10 top-7 left-1 bg-white shadow rounded hidden group-hover:block"
      >
        <li v-for="tab in hiddenTabs" :key="tab.value">
          <a
            href=""
            class="block px-4 py-2 bg-gray-100 hover:bg-green-200 whitespace-nowrap rounded"
            @click.prevent="visibilityTab = tab.value"
            v-html="
              tab.title +
              (props.counts && props.counts[tab.value] !== undefined
                ? ` <span class='text-gray-500'>(${
                    props.counts[tab.value]
                  })</span>`
                : '')
            "
          ></a>
        </li>
      </ul>
    </li>
  </ul>

  <div ref="rightTools" class="relative flex items-center w-full justify-center md:justify-end  md:pe-10">
    <button @click="showSearch = true" class="p-2">
    <!-- <button @click="showSearch = !showSearch" class="p-2"> -->
      <i class="fa-solid fa-magnifying-glass text-2xl"></i>
    </button>
    <transition name="fade">
      <input
        v-if="showSearch"
        v-model="keyword"
        type="text"
        placeholder="搜尋標題..."
        class="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-57 md:w-40"
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
</template>
<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  defineEmits,
  nextTick,
  defineProps,
} from "vue";
import targets from "@/data/SDGs_goal.json";

const props = defineProps({
  counts: {
    type: Object,
    default: () => ({}),
  },
});

const headerTabs = ref(targets);
const visibilityTab = ref(headerTabs.value[0].value);

const sortedHeaderTabs = computed(() => {
  if (!props.counts || Object.keys(props.counts).length === 0) {
    return headerTabs.value;
  }
  const allTab = headerTabs.value.find((tab) => tab.value === 0);
  const otherTabs = headerTabs.value.filter((tab) => tab.value !== 0);
  otherTabs.sort(
    (a, b) => (props.counts[b.value] || 0) - (props.counts[a.value] || 0)
  );
  const result = [];
  if (allTab) result.push(allTab);
  result.push(...otherTabs);
  return result;
});

const showSearch = ref(true);
const keyword = ref("");
const tabContainer = ref(null);
const rightTools = ref(null);
const visibleTabs = ref([]);
const hiddenTabs = ref([]);

const emits = defineEmits(["update:visibilityTab", "update:keyword"]);
watch(visibilityTab, (newValue) => {
  const numericValue = Number(newValue);
  emits("update:visibilityTab", numericValue);
});
watch(keyword, (newValue) => {
  emits("update:keyword", newValue);
});

const updateTabs = () => {
  if (!tabContainer.value || !rightTools.value) return;
  const container = tabContainer.value.parentNode;
  if (!container) return;
  const availableWidth = container.clientWidth - 20;
  //   const availableWidth =
  //     container.clientWidth - rightTools.value.offsetWidth - 20;
  const moreButtonWidth = 350;
  let usedWidth = 0;
  const newVisible = [];
  const newHidden = [];
  const items = tabContainer.value.querySelectorAll("li:not(.relative)");
  items.forEach((el, i) => {
    const tabData = sortedHeaderTabs.value[i];
    if (!tabData) return;
    const w = el.offsetWidth;
    if (usedWidth + w < availableWidth - moreButtonWidth) {
      usedWidth += w;
      newVisible.push(tabData);
    } else {
      newHidden.push(tabData);
    }
  });
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
  visibleTabs.value = [...sortedHeaderTabs.value];
  nextTick(() => {
    updateTabs();
    window.addEventListener("resize", updateTabs);
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", updateTabs);
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
