<template class="pt-50">
  <nav class="absolute z-10 left-50 top-30 flex flex-col">
    <router-link to="/">回首頁</router-link>
  </nav>
  <main class="grid grid-cols-4 gap-4 p-20 pt-50 text-center">
    <div class="col-span-3 border p-4">數據儀表板</div>
    <div class="col-span-1 border p-4">下載資源</div>
    <router-link to="/story" class="col-span-4 border p-4">故事牆</router-link>
  </main>
</template>
<script setup>
</script>
<style scoped>
</style>