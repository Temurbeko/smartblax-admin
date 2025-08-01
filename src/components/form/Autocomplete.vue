<template>
  <div class="relative w-full">
    <label v-if="label" class="block text-md font-medium mb-1.5">{{
      label
    }}</label>
    <div class="relative">
      <input
        v-model="search"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        :class="[
          'w-full !h-10 px-2 py-2 border border-gray-200 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 transition-all duration-200',
          error ? 'border-red-500' : '',
        ]"
        :placeholder="placeholder"
      />
      <span
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="white" fill-opacity="0.01" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.29207 10.2929C8.10526 10.4818 8.00049 10.7368 8.00049 11.0024C8.00049 11.2681 8.10526 11.523 8.29207 11.7119L11.2311 14.6769C11.4491 14.8919 11.7311 14.9989 12.0101 14.9989C12.2891 14.9989 12.5661 14.8919 12.7791 14.6769L15.7091 11.7219C15.8956 11.5329 16.0002 11.278 16.0002 11.0124C16.0002 10.7469 15.8956 10.492 15.7091 10.3029C15.6172 10.2098 15.5078 10.1358 15.3871 10.0853C15.2664 10.0347 15.1369 10.0087 15.0061 10.0087C14.8752 10.0087 14.7457 10.0347 14.625 10.0853C14.5043 10.1358 14.3949 10.2098 14.3031 10.3029L12.0051 12.6199L9.69807 10.2929C9.60603 10.2001 9.49652 10.1264 9.37586 10.0762C9.25521 10.0259 9.12578 10 8.99507 10C8.86435 10 8.73493 10.0259 8.61427 10.0762C8.49361 10.1264 8.38411 10.2001 8.29207 10.2929Z"
            fill="#344054"
          />
        </svg>
      </span>
    </div>
    <ul
      v-if="isOpen && filteredItems.length"
      class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-[6px] shadow-lg max-h-60 overflow-auto"
    >
      <li
        v-for="(item, index) in filteredItems"
        :key="index"
        @click="selectItem(item)"
        class="px-4 py-2 cursor-pointer hover:bg-gray-100"
      >
        {{ getItemText(item) }}
      </li>
    </ul>
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
    placeholder?: string;
    rules?: ((value: string) => string | null)[];
    value?: any;
    label?: string
  } & /* @vue-ignore */ InputHTMLAttributes
>();

const emit = defineEmits(["input", "update:search-input"]);

const search = ref("");
const isOpen = ref(false);
const error = ref<string | null>(null);

const filteredItems = computed(() => {
  if (!search.value) return props.items;
  return props.items.filter((item) => {
    const text = getItemText(item).toLowerCase();
    return text.includes(search.value.toLowerCase());
  });
});

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

const selectItem = (item: any) => {
  const value = getItemValue(item);
  emit("input", value);
  search.value = getItemText(item);
  isOpen.value = false;
};

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  search.value = value;
  emit("update:search-input", value);
  validateInput();
};

const onFocus = () => {
  isOpen.value = true; 
};

const onBlur = () => {
  setTimeout(() => {
    isOpen.value = false;
  }, 200);
};

const validateInput = () => {
  if (props.rules) {
    for (const rule of props.rules) {
      const errorMessage = rule(search.value);
      if (errorMessage) {
        error.value = errorMessage;
        return;
      }
    }
  }
  error.value = null;
};

watch(
  () => props.value,
  (newValue) => {
    if (
      newValue !== undefined &&
      !filteredItems.value.some((item) => getItemValue(item) === newValue)
    ) {
      search.value = newValue.toString();
    }
  }
);

watch(search, (newSearch) => {
  if (!filteredItems.value.some((item) => getItemText(item) === newSearch)) {
    emit("input", newSearch); 
  }
});
</script>
