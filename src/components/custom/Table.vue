<template>
  <div class="w-full">
    <table
      class="min-w-full border border-gray-400 text-sm text-left shadow-lg rounded-sm overflow-hidden"
    >
      <thead class="bg-teal-700 text-xs uppercase text-white">
        <tr>
          <slot name="header" :columns="columns">
            <th
              v-for="col in columns"
              :key="col.key"
              class="font-semibold px-4 py-2 text-left uppercase text-xs text-white"
            >
              {{ col.label }}
            </th>
          </slot>
        </tr>
      </thead>

      <tbody>
        <template v-if="paginatedData.length">
          <tr
            v-for="(row, index) in paginatedData"
            :key="index"
            class="border-b border-gray-400 hover:bg-teal-50 transition-all duration-200"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="text-teal-900 font-medium px-4 py-2"
            >
              <template v-if="$slots[`col.${col.key}`]">
                <slot
                  :name="`col.${col.key}`"
                  :value="row[col.key]"
                  :row="row"
                  :col="col"
                  :index="index"
                />
              </template>
              <template v-else>
                {{ row[col.key] }}
              </template>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td
            :colspan="columns.length"
            class="text-center text-teal-700 font-light px-4 py-2"
          >
            <slot name="empty">No data found</slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-end gap-6 items-center mt-4 text-sm text-teal-600">
      <div class="font-medium">Page {{ currentPage }} of {{ totalPages }}</div>
      <div class="space-x-3">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-1 border border-gray-400 rounded-sm bg-white text-teal-700 hover:bg-teal-700 hover:text-white hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-1 border border-gray-400 rounded-sm bg-white text-teal-700 hover:bg-teal-700 hover:text-white hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, ref, watch } from "vue";

interface Column<T> {
  key: string;
  label: string;
}

const props = defineProps<{
  items: T[];
  columns: Column<T>[];
  perPage?: number;
}>();

const currentPage = ref(1);
const perPage = computed(() => props.perPage ?? 10);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.items.length / perPage.value))
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return props.items.slice(start, start + perPage.value);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

watch(
  () => props.items,
  () => {
    currentPage.value = 1; 
  }
);
</script>
