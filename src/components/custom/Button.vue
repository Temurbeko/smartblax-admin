<template>
  <button
    :class="[
      'px-3 py-1.5 rounded text-sm transition-colors hover:cursor-pointer font-medium',
      colorClass
    ]"
    v-bind="$attrs"
  >
    <slot>
      Add
    </slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, computed, type ButtonHTMLAttributes } from 'vue';

const props = defineProps<{
  color?: 'red' | 'gray' | 'green';
} &  /* @vue-ignore */ ButtonHTMLAttributes>();

const colorClass = computed(() => {
  switch (props.color) {
    case 'red':
      return 'bg-trans text-red-400 hover:bg-red-100';
    case 'gray':
      return 'bg-gray-100 hover:bg-gray-200 text-black ';
    case 'green':
    default:
      return 'bg-gradient-to-b from-[#28B58A] to-[#058F68] text-white hover:from-[#058F68] hover:to-[#28B58A]';
  }
});
</script>