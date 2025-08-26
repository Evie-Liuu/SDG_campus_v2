<template>
  <nav
    class="absolute z-10 w-full p-9 font-bold text-4xl flex flex-row justify-between items-center"
  >
    <router-link to="/"><span class="">彰化市中山國民小學</span></router-link>
    <div class="flex gap-5 text-2xl">
      <router-link
        v-if="$route.path !== '/'"
        to="/about"
        class="p-2 hover:"
        :class="{
          'pointer-events-none bg-gradient-to-br from-blue-500 to-red-500 opacity-80 rounded-full':
            $route.path === '/about',
        }"
        >校園探索</router-link
      >
      <router-link
        v-if="$route.path !== '/'"
        to="/actions"
        class="p-2 hover:"
        :class="{
          'pointer-events-none bg-gradient-to-br from-blue-500 to-red-500 opacity-80 rounded-full':
            $route.path === '/actions',
        }"
        >SDGs行動</router-link
      >
      <router-link
        v-if="$route.path !== '/'"
        to="/sdgs"
        class="p-2 hover:"
        :class="{
          'pointer-events-none bg-gradient-to-br from-blue-500 to-red-500 opacity-80 rounded-full':
            $route.path === '/sdgs' || $route.path === '/story',
        }"
        >SDGs成果</router-link
      >
    </div>
  </nav>
  <router-view />
</template>
<script setup>
</script>
<style scoped>
.router-link-active,
.router-link-exact-active {
  /* 如果要自訂當前頁面的樣式，可以在這裡加樣式 */
}
</style>
