<template>
  <header class="pt-30 w-full z-10 shadow-md">
    <div class="container mx-auto flex items-center p-4">
      <div class="w-1/3">
        <router-link to="/story" class="back-home-btn">
          <span class="text">回上頁</span>
          <span class="icon">←</span>
        </router-link>
      </div>
      <div class="w-1/3 text-center"></div>
      <div class="w-1/3"></div>
    </div>
  </header>
  <main class="max-w-4xl mx-auto p-4 pt-10">
    <section class="animate-fade-in-up flex flex-col gap-8" v-if="selectedInfo">
      <!-- Article Header -->
      <div
        :style="bgImageStyle"
        class="relative bg-cover bg-center bg-opacity-70 p-7 rounded-md md:h-80 grid grid-cols-1 content-end overflow-hidden"
      >
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="relative z-10 text-white">
          <h1 class="text-4xl font-bold mb-4">{{ selectedInfo.title }}</h1>
          <p class="mb-2 text-lg">{{ selectedInfo.intro }}</p>
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
      </div>

      <!-- Article Body and Share button -->
      <section class="flex flex-col gap-4 items-start">
        <button
          @click="share"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 self-end"
        >
          分享
        </button>
        <p class="text-gray-700 leading-relaxed w-full">
          {{ selectedInfo.description }}
        </p>
      </section>

      <!-- Comments Section -->
      <section>
        <h2 class="text-2xl font-bold mb-4">留言板</h2>

        <!-- Post Comment Form -->
        <div class="mb-6">
          <textarea
            v-model="newComment"
            class="w-full p-2 border rounded-md"
            rows="3"
            placeholder="在這裡寫下你的留言..."
          ></textarea>
          <button
            @click="addComment"
            class="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            發布留言
          </button>
        </div>

        <!-- Comments List -->
        <div class="flex flex-col gap-4">
          <div
            v-for="comment in comments"
            :key="comment.id"
            :class="[
              'p-4 rounded-md',
              comment.author === currentUser.name
                ? 'bg-green-100'
                : 'bg-gray-100',
            ]"
          >
            <p class="font-bold">{{ comment.author }}</p>
            <p class="text-gray-800">{{ comment.text }}</p>
            <div class="flex items-center justify-end mt-2">
              <button
                @click="toggleLike(comment.id)"
                class="text-gray-500 hover:text-red-500"
              >
                <i
                  :class="[
                    'fa-heart',
                    comment.liked ? 'fa-solid text-red-500' : 'fa-regular',
                  ]"
                ></i>
                <span class="ml-1">{{ comment.likes }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
    <div v-else>
      <p>找不到這篇故事。</p>
    </div>
  </main>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import infos from "@/data/ChungShan.json";
import typeTags from "@/data/SDGs_goal.json";

const props = defineProps({ id: String });

const selectedInfo = ref(infos.find((item) => item.id === parseInt(props.id)));

const bgImageStyle = computed(() => {
  if (!selectedInfo.value) return {};
  const img = selectedInfo.value.img_url || "CS_school.png";
  try {
    const imageUrl = new URL(`../assets/images/${img}`, import.meta.url).href;
    return {
      backgroundImage: `url(${imageUrl})`,
    };
  } catch (e) {
    console.error(e);
    // Fallback if the image URL is invalid
    const fallbackUrl = new URL(
      "../assets/images/CS_school.png",
      import.meta.url
    ).href;
    return { backgroundImage: `url(${fallbackUrl})` };
  }
});

// --- Comment Section Logic ---

const currentUser = { name: "我" }; // Simulate current user
const newComment = ref("");
const comments = ref([
  // Mock initial comments
  { id: 1, author: "小明", text: "這篇文章真棒！", likes: 5, liked: false },
  { id: 2, author: "我", text: "寫得很好，學到很多。", likes: 2, liked: true },
]);

const addComment = () => {
  if (newComment.value.trim() === "") return;
  comments.value.unshift({
    id: Date.now(),
    author: currentUser.name,
    text: newComment.value,
    likes: 0,
    liked: false,
  });
  newComment.value = "";
};

const toggleLike = (commentId) => {
  const comment = comments.value.find((c) => c.id === commentId);
  if (comment) {
    if (comment.liked) {
      comment.likes--;
    } else {
      comment.likes++;
    }
    comment.liked = !comment.liked;
  }
};

const share = () => {
  if (navigator.share) {
    navigator
      .share({
        title: selectedInfo.value.title,
        text: selectedInfo.value.intro,
        url: window.location.href,
      })
      .catch(console.error);
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("連結已複製到剪貼簿！");
  }
};
</script>
<style scoped>
</style>