<template>
  <main class="pt-30 max-w-3xl mx-auto p-4">
    <nav class="absolute z-10 left-50 top-30 flex flex-col text-2xl">
      <router-link to="/story" class="bg-white rounded-md px-8 py-3"
        >回上頁</router-link
      >
    </nav>
    <section class="animate-fade-in-up flex flex-col gap-8">
      <div>
        <h1 class="text-4xl font-bold mb-4">{{ selectedInfo.title }}</h1>
        <small>{{
          new Date(selectedInfo.time * 1000).toLocaleDateString()
        }}</small>
        <div class="flex flex-wrap gap-2 mt-2">
          <span
            v-for="t in selectedInfo.types"
            :key="t"
            class="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
          >
            {{ typeTags[t].title }}
          </span>
        </div>
      </div>
      <section class="">
        <p class="text-gray-700 leading-relaxed">
          {{ selectedInfo.description }}
        </p>
      </section>
      <section>
        <h1>留言</h1>
        <div class="border md:h-50"></div>
      </section>
    </section>
  </main>
</template>
<script setup>
import { defineProps, ref } from "vue";
import infos from "@/data/ChungShan.json";
import typeTags from "@/data/SDGs_goal.json";

const props = defineProps({ id: String });
const selectedInfo = ref({});
selectedInfo.value = infos.find((item) => item.id === props.id * 1);
</script>
<style scoped>
</style>