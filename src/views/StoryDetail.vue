<template>
  <main class="pt-30 max-w-3xl mx-auto p-4">
    <nav class="absolute z-10 left-50 top-30 flex flex-col text-2xl">
      <router-link to="/story" class="bg-white rounded-md px-8 py-3">回上頁</router-link>
    </nav>
    <h1 class="text-4xl font-bold mb-4">{{ selectedInfo.title }}</h1>
    <p class="text-gray-700 leading-relaxed">
      {{ selectedInfo.description }}
    </p>

    <div>
      <h1>留言</h1>
    </div>
  </main>
</template>
<script setup>
import { defineProps, ref } from "vue";
import infos from "@/data/ChungShan.json";

const props = defineProps({ id: String });
const selectedInfo = ref({});
selectedInfo.value = infos.find((item) => item.id === props.id * 1);
</script>
<style scoped>
</style>