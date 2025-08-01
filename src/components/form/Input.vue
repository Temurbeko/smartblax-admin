<template>
  <div class="w-full">
    <label v-if="label" class="block text-md font-medium mb-1.5">{{
      label
    }}</label>
    <input
      :class="[
        'w-full !h-10 px-2 py-2 border border-gray-200 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200',
        error ? 'border-red-500' : '',
      ]"
      v-bind="$attrs"
      @input="validateInput"
    />
    <span v-if="error" class="text-xs text-red-500 mt-1 block">{{
      error
    }}</span>
  </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";
import { defineProps, ref } from "vue";

const props = defineProps<
  {
    label?: string;
    rules?: ((value: string) => string | null)[];
  } &  /* @vue-ignore */ InputHTMLAttributes
>();

const error = ref<string | null>(null);

const validateInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  if (props.rules) {
    for (const rule of props.rules) {
      const errorMessage = rule(value);
      if (errorMessage) {
        error.value = errorMessage;
        return;
      }
    }
  }
  error.value = null;
};
</script>
