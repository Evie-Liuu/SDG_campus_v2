<template>
  <main
    class="font-huninn h-screen w-screen flex flex-col items-center justify-center text-center bg-[url(@/assets/images/CS_school.png)] bg-cover bg-center overflow-hidden"
  >
    <!-- Title -->
    <section
      :class="[
        'transition-all duration-1000 ease-out',
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full',
      ]"
      class="w-full mt-20 lg:mt-40"
    >
      <h1 class="text-4xl lg:text-7xl font-bold text-brown-500 lg:me-80">
        一起跟領角鴞探索中山國小吧！
      </h1>
    </section>

    <div
      class="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-90"
    >
      <!-- Owl -->
      <div
        :class="[
          'transition-all duration-1000 ease-out',
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
        ]"
        class="relative w-48 h-48 lg:w-64 lg:h-64 scale-150 lg:order-2 mt-20 lg:scale-270 lg:me-55 lg:mt-50"
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

      <!-- Signboard for Desktop -->
      <section
        :class="[
          'transition-all duration-1000 ease-out',
          isLoaded
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-full',
        ]"
        class="relative hidden lg:order-1 lg:flex flex-col items-center justify-center gap-10 text-brown-500 text-3xl font-bold bg-[url(@/assets/images/sign.png)] bg-contain bg-no-repeat bg-center pb-8 scale-125 mt-20 lg:scale-170 lg:mt-50 w-[15rem] h-[21rem] lg:w-[20rem] lg:h-[28rem]"
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

      <!-- Buttons for Mobile -->
      <section
        :class="[
          'transition-all duration-1000 ease-out',
          isLoaded
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-full',
        ]"
        class="flex lg:hidden flex-col items-center justify-center gap-4 mt-8 w-64"
      >
        <router-link
          to="/about"
          class="w-full text-shadow-3d bg-orange-custom text-white px-8 py-3 rounded-full text-xl font-bold shadow-[0_3px_0_0_#da9346] transition-transform hover:scale-105"
        >
          校園探索
        </router-link>
        <router-link
          to="/actions"
          class="w-full text-shadow-3d bg-blue-custom text-white px-8 py-3 rounded-full text-xl font-bold shadow-[0_3px_0_0_#78b6cb] transition-transform hover:scale-105"
        >
          SDGs行動
        </router-link>
        <router-link
          to="/sdgs"
          class="w-full text-shadow-3d bg-green-custom text-white px-8 py-3 rounded-full text-xl font-bold shadow-[0_3px_0_0_#82b989] transition-transform hover:scale-105"
        >
          SDGs成果
        </router-link>
      </section>
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