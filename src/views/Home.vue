<template class="h-max-screen w-min-screen">
  <main
    class="relative md:h-[1024px] flex flex-col items-center justify-center text-center pt-8 bg-[url(@/assets/images/CS.jpg)] bg-cover bg-center"
  >
    <section
      class="absolute bottom-80 right-80 flex flex-col justify-center gap-5 text-3d text-white text-4xl font-bold"
    >
      <router-link to="/about"
        ><span
          class="pb-1 border-b border-transparent hover:border-white transition"
          >校園探索</span
        >
      </router-link>
      <router-link to="/actions"
        ><span
          class="pb-1 border-b border-transparent hover:border-white transition"
          >SDGs 行動</span
        >
      </router-link>

      <router-link to="/sdgs"
        ><span
          class="pb-1 border-b border-transparent hover:border-white transition"
          >SDGs 成果</span
        >
      </router-link>
    </section>
  </main>
</template>
<script setup>
</script>
<style scoped>
</style>