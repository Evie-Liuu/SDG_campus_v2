<template class="h-max-screen w-min-screen">
  <main
    class="relative md:h-screen flex flex-col items-center justify-center text-center pt-8 bg-[url(@/assets/images/CS_school.png)] bg-cover bg-center"
  >
    <section
      class="absolute bottom-70 left-100 flex flex-col w-90 gap-15 text-white text-4xl font-bold"
    >
      <router-link to="/about" class="w-full group">
        <span
          class="block w-full text-center p-3 px-9 border bg-gradient-to-br from-blue-500 to-red-500 opacity-90 rounded-full shadow-[0_3px_0_0_hsl(289,14%,48%)]"
        >
          校園探索
          <i
            class="fa-solid fa-arrow-right transition-all swing-on-group-hover"
          ></i>
        </span>
      </router-link>

      <router-link to="/actions" class="w-full group">
        <span
          class="block w-full text-center p-3 px-9 border bg-gradient-to-br from-blue-500 to-red-500 opacity-90 rounded-full shadow-[0_3px_0_0_hsl(289,14%,48%)]"
        >
          SDGs 行動
          <i
            class="fa-solid fa-arrow-right transition-all swing-on-group-hover"
          ></i>
        </span>
      </router-link>

      <router-link to="/sdgs" class="w-full group">
        <span
          class="block w-full text-center p-3 px-9 border bg-gradient-to-br from-blue-500 to-red-500 opacity-90 rounded-full shadow-[0_3px_0_0_hsl(289,14%,48%)]"
        >
          SDGs 成果
          <i
            class="fa-solid fa-arrow-right transition-all swing-on-group-hover"
          ></i>
        </span>
      </router-link>
    </section>
  </main>
</template>
<script setup>
</script>
<style scoped>
</style>