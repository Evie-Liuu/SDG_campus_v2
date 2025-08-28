<template>
  <div
    v-if="isLoading && $route.path !== '/' && $route.path !== '/about'"
    class="loading-overlay"
  >
    <div class="loader"></div>
    <p>Loading...</p>
  </div>
  <nav
    class="absolute z-10 w-full p-4 pb-0 md:p-12 md:pb-0 font-bold md:text-4xl flex flex-row justify-between items-center"
    :class="[
      $route.path !== '/' && $route.path !== '/about' ? 'bg-header' : '',
    ]"
  >
    <router-link to="/">
      <!-- <img
        src="../assets/images/Landing/School_Logo.png"
        alt=""
        class="absolute inset-0 w-1/2 h-full object-end"
      /> -->
      <span class="text-5xl font-hspa">彰化市中山國民小學</span>
    </router-link>

    <!-- Hamburger Button -->
    <button
      v-if="$route.path !== '/'"
      @click="isMenuOpen = !isMenuOpen"
      class="md:hidden z-20"
    >
      <i class="fa-solid fa-bars"></i>
    </button>

    <!-- Menu -->
    <div
      :class="[
        'fixed top-0 left-0 w-full h-full bg-white flex flex-col justify-center items-center gap-8 text-3xl transition-transform duration-300 ease-in-out md:relative md:h-auto md:w-auto md:bg-transparent md:flex-row md:gap-3 md:text-2xl',
        isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <router-link
        v-if="$route.path !== '/'"
        to="/about"
        class="p-2 px-4"
        @click="isMenuOpen = false"
        :class="{
          'pointer-events-none bg-gradient-to-br from-green-600 to-yellow-400 opacity-80 rounded-full':
            $route.path === '/about',
        }"
        >校園探索</router-link
      >
      <router-link
        v-if="$route.path !== '/'"
        to="/actions"
        class="p-2 px-4"
        @click="isMenuOpen = false"
        :class="{
          'pointer-events-none bg-gradient-to-br from-green-600 to-yellow-400 opacity-80 rounded-full':
            $route.path === '/actions',
        }"
        >SDGs行動</router-link
      >
      <router-link
        v-if="$route.path !== '/'"
        to="/sdgs"
        class="p-2 px-4"
        @click="isMenuOpen = false"
        :class="{
          'pointer-events-none bg-gradient-to-br from-green-600 to-yellow-400 opacity-80 rounded-full':
            $route.path === '/sdgs' || $route.path.includes('/story'),
        }"
        >SDGs成果</router-link
      >
    </div>
  </nav>
  <router-view />
</template>
<script setup>
import { ref, onMounted } from "vue";

const isLoading = ref(true);
const isMenuOpen = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>
<style scoped>
</style>
