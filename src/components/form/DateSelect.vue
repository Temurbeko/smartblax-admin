<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
    <input
      v-model="dateValue"
      v-mask="'##.##.####'"
      @input="validateDate"
      :class="[
        'w-full px-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200',
        error ? 'border-red-500' : ''
      ]"
      placeholder="DD.MM.YYYY"
      v-bind="$attrs"
    />
    <span v-if="error" class="text-xs text-red-500 mt-1 block">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { parse, isValid, format } from 'date-fns';
import type { InputHTMLAttributes } from 'vue';

const props = defineProps<{
  label?: string;
  rules?: ((value: string) => string | null)[];
  modelValue?: string;
} &/* @vue-ignore */ InputHTMLAttributes>();

const emit = defineEmits(['update:modelValue']);

const dateValue = ref('');
const error = ref<string | null>(null);

const validateDate = () => {
  const value = dateValue.value.replace(/_/g, '').trim();
  if (value.length === 10) {
    const parsedDate = parse(value, 'dd.MM.yyyy', new Date());
    if (isValid(parsedDate)) {
      emit('update:modelValue', format(parsedDate, 'dd.MM.yyyy'));
      error.value = null;
    } else {
      error.value = 'Invalid date';
    }
  } else if (value) {
    error.value = 'Complete the date (DD.MM.YYYY)';
  } else {
    emit('update:modelValue', '');
    error.value = null;
  }
  if (props.rules) {
    for (const rule of props.rules) {
      const ruleError = rule(dateValue.value);
      if (ruleError) {
        error.value = ruleError;
        break;
      }
    }
  }
};

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    dateValue.value = newValue;
  } else {
    dateValue.value = '';
  }
});
</script>