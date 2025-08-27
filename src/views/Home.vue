<template>
  <main
    class="h-screen w-screen flex flex-col items-center justify-center text-center bg-[url(@/assets/images/CS_school.png)] bg-cover bg-center overflow-hidden"
  >
    <!-- Title -->
    <section
      :class="[
        'transition-all duration-1000 ease-out',
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full',
      ]"
      class="w-full"
    >
      <h1 class="text-4xl md:text-7xl font-bold text-brown-500 mb-15 me-80">
        一起跟領角鴞探索中山國小吧！
      </h1>
    </section>

    <div class="flex flex-col md:flex-row items-center justify-center gap-90">
      <!-- Signboard -->
      <section
        :class="[
          'transition-all duration-1000 ease-out',
          isLoaded
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-full',
        ]"
        class="relative pb-6 scale-170 mt-50 w-[20rem] h-[28rem] flex flex-col items-center justify-center gap-10 text-brown-500 text-3xl font-bold bg-[url(@/assets/images/sign.png)] bg-contain bg-no-repeat bg-center"
      >
        <router-link
          to="/about"
          class="w-full transition-transform hover:scale-110 hover:brightness-125"
        >
          <span>校園探索</span>
        </router-link>
        <router-link
          to="/actions"
          class="w-full transition-transform hover:scale-110 hover:brightness-125"
        >
          <span>SDGs行動</span>
        </router-link>
        <router-link
          to="/sdgs"
          class="w-full transition-transform hover:scale-110 hover:brightness-125"
        >
          <span>SDGs成果</span>
        </router-link>
      </section>

      <!-- Owl -->
      <div
        :class="[
          'transition-all duration-1000 ease-out',
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
        ]"
        class="relative w-48 h-48 md:w-64 md:h-64 scale-270 me-60"
        @mousemove="handleMouseMove"
        @mouseleave="resetEyes"
      >
        <img
          src="@/assets/images/owl-body.png"
          class="w-full h-full pointer-events-none select-none"
          alt="Owl"
        />
        <!-- Eye tracking logic can be added back here -->
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isLoaded = ref(false);

onMounted(() => {
  // Use nextTick to ensure elements are mounted before starting the transition
  // or a simple timeout to make the animation more noticeable.
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});

// Placeholder for eye tracking logic if it needs to be re-implemented
const handleMouseMove = (event) => {
  // Eye tracking logic here
};
const resetEyes = () => {
  // Reset eye position logic here
};
</script>

<style scoped>
/* Scoped styles can be added here if needed */
</style>