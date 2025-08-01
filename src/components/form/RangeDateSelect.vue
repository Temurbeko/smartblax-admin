<template>
  <div class="w-full">
    <label v-if="label" class="block text-md font-medium mb-1.5">{{
      label
    }}</label>
    <div class="flex space-x-2">
      <DateSelect
        v-model="startDate"
        :rules="[(v) => (v && !error?.value ? null : 'Invalid start date')]"
      />
      <DateSelect
        v-model="endDate"
        :rules="[(v) => (v && !error?.value ? null : 'Invalid end date')]"
      />
    </div>
    <span v-if="error?.value" class="text-xs text-red-500 mt-1 block">{{
      error?.value
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { compareAsc, isValid, parse } from "date-fns";
import { ref, watch } from "vue";
import DateSelect from "./DateSelect.vue";

defineProps<{
  label?: string;
}>();
const startDate = ref("");
const endDate = ref("");
const error = ref<{ value: string } | null>(null);

const compareDates = (date1: string, date2: string) => {
  const d1 = parse(date1, "dd.MM.yyyy", new Date());
  const d2 = parse(date2, "dd.MM.yyyy", new Date());
  return isValid(d1) && isValid(d2) ? compareAsc(d1, d2) : 1;
};

const validateRange = () => {
  if (startDate.value && endDate.value) {
    const start = parse(startDate.value, "dd.MM.yyyy", new Date());
    const end = parse(endDate.value, "dd.MM.yyyy", new Date());
    if (isValid(start) && isValid(end)) {
      if (compareAsc(start, end) > 0) {
        const temp = startDate.value;
        startDate.value = endDate.value;
        endDate.value = temp;
        // @ts-ignore
        if (error) error.value = "Dates swapped to correct range";
        setTimeout(() => (error.value = null), 2000);
      } else {
        error.value = null;
      }
    } else {
      // @ts-ignore
      if (error) error.value = "Invalid date range";
    }
  }
};

watch([startDate, endDate], () => {
  validateRange();
});
</script>
