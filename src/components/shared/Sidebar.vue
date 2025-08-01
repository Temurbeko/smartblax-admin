<template>
  <nav
    class="bg-gradient-to-b from-[#334D49] to-[#1F2D3B] border-r min-h-screen fixed w-64 top-0 left-0 overflow-y-auto z-10 flex flex-col"
  >
    <div class="px-5 pt-5 pb-3 flex gap-2.5">
      <img src="@/assets/Avatar.png" alt="" />
      <div class="flex flex-col">
        <span class="text-white font-medium h-5">Имя фамилия</span>
        <span class="text-gray-300 h-5 text-sm">0 сум</span>
      </div>
    </div>
    <div class="px-4">
      <div class="border-b-gray-500 border-b"></div>
    </div>
    <ul class="space-y-2 p-4 flex-grow">
      <li v-for="link in links" :key="link.name">
        <RouterLink
          :to="link.path"
          class="flex gap-4 py-[10px] px-3 rounded text-white hover:bg-[#6fa3a3] transition-all"
          :class="{
            'bg-gradient-to-r from-[#2F4746] to-[#4b6e6eaa] font-medium':
              isActive(link.path),
          }"
        >
          <img :src="link.icon" alt="Icon" class="w-6 h-6" />
          {{ link.name }}
        </RouterLink>
      </li>
    </ul>

    <div class="p-4 mt-auto flex justify-center">
      <Button
        @click="handleSignOut"
        color="red"
      >
        <span>Выйти</span>
      </Button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Button from "../custom/Button.vue";
const route = useRoute();

interface Link {
  name: string;
  path: string;
  icon: any;
}

const isActive = (path: string) => {
  if (path === "/") return route.path === "/";
  return route.path === path || route.path.startsWith(path + "/");
};
const handleSignOut = () => {}
const links = ref<Link[]>([
  {
    name: "Главная",
    path: "/",
    icon: new URL("@/assets/icons/dashboard.svg", import.meta.url).href,
  },
  {
    name: "Мои кампании",
    path: "/companies",
    icon: new URL("@/assets/icons/companies.svg", import.meta.url).href,
  },
  {
    name: "Настройки",
    path: "/settings",
    icon: new URL("@/assets/icons/settings.svg", import.meta.url).href,
  },
]);
</script>
