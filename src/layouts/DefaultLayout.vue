<template>
  <div class="flex min-h-screen">
    <Sidebar class="w-64" />
    <div class="flex-1 p-6 bg-gray-50 ml-64">
      <nav class="text-sm text-gray-600 space-x-1" >
        <router-link
          v-for="(crumb, index) in breadcrumbs"
          :key="index"
          :to="crumb.to"
          class="hover:underline"
        >
          {{ crumb.label }}
          <span v-if="index !== breadcrumbs.length - 1">/</span>
        </router-link>
      </nav>
      <h1 class="text-2xl font-semibold mb-4 mt-1.5">{{ title }}</h1>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/shared/Sidebar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const title = computed(() => (route.meta.title as string) || "");

const breadcrumbs = computed(() => {
  const matched = route.matched.filter((r) => r.name);
  return matched.map((r) => ({
    label: r.meta?.breadcrumb || r.name,
    to: { name: r.name },
  }));
});
</script>
