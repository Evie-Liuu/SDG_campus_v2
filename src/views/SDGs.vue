<template>
  <main class="pt-30">
    <nav class="absolute z-10 left-50 top-30 flex flex-col text-2xl">
      <router-link to="/" class="bg-white rounded-md px-8 py-3"
        >回首頁</router-link
      >
    </nav>
    <h1 class="text-4xl font-bold text-center">成果展示</h1>
    <section
      class="grid grid-cols-4 gap-4 p-20 pt-10 text-center md:h-225 text-3xl"
    >
      <div
        class="col-span-3 border p-4 flex items-center justify-center hover:shadow-[10px_5px_10px_-3px_rgba(0,0,0,0.8)]"
      >
        數據儀表板
      </div>
      <div
        class="col-span-1 border p-4 flex items-center justify-center hover:shadow-[10px_5px_10px_-3px_rgba(0,0,0,0.8)]"
      >
        下載資源
      </div>
      <router-link
        to="/story"
        class="col-span-4 border p-4 bg-[url(@/assets/images/CS_school.png)] bg-cover bg-center overflow-hidden flex items-center justify-center hover:shadow-[10px_5px_10px_-3px_rgba(0,0,0,0.8)]"
        >故事牆</router-link
      >
    </section>
  </main>
</template>
<script setup>
</script>
<style scoped>
</style>