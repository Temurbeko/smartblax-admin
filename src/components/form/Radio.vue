<template>
  <div class="w-full">
    <label v-if="label" class="block text-md font-medium mb-1.5">{{
      label
    }}</label>
    <div :class="'flex items-center gap-8'">
      <label
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center space-x-2"
      >
        <input
          type="radio"
          v-model="selectedValue"
          :value="getItemValue(item)"
          :class="[
            'w-4 h-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200',
            error ? 'border-red-500' : '',
          ]"
          v-bind="$attrs"
        />
        <span class="text-gray-900">{{ getItemText(item) }}</span>
      </label>
    </div>
    <span v-if="error" class="text-xs text-red-500 mt-1 block">{{
      error
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from "vue";
import type { InputHTMLAttributes } from "vue";

const props = defineProps<
  {
    items: any[];
    itemText?: string;
    itemValue?: string;
    label?: string;
    rules?: ((value: any) => string | null)[];
    modelValue?: any;
    containerClass?: string;
  } & /* @vue-ignore */ InputHTMLAttributes
>();

const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref(props.modelValue);
const error = ref<string | null>(null);

const getItemText = (item: any) => {
  return props.itemText && item[props.itemText] !== undefined
    ? item[props.itemText]
    : item.toString();
};

const getItemValue = (item: any) => {
  return props.itemValue && item[props.itemValue] !== undefined
    ? item[props.itemValue]
    : item;
};

const validateInput = () => {
  if (props.rules) {
    for (const rule of props.rules) {
      const errorMessage = rule(selectedValue.value);
      if (errorMessage) {
        error.value = errorMessage;
        return;
      }
    }
  }
  error.value = null;
};

watch(selectedValue, (newValue) => {
  emit("update:modelValue", newValue);
  validateInput();
});

watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue;
  }
);
</script>
