<template>
    <div class="w-full">
      <label v-if="label" class="block text-md font-medium mb-1.5">{{ label }}</label>
  
      <div
        class="relative w-full h-11 border rounded-[6px] focus-within:ring-2 focus-within:ring-gray-200 focus-within:border-gray-200 transition-all duration-200"
        :class="error ? 'border-red-500' : 'border-gray-200'"
      >
        <input
          type="file"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          v-bind="$attrs"
          @change="validateFile"
          :accept="acceptedTypes.join(',')"
          ref="fileInput"
        />
  
        <div class="flex items-center h-full px-2 py-2">
          <button
            type="button"
            @click="openFilePicker"
            class="bg-gray-100 text-sm text-gray-700 font-medium px-4 py-[3px] rounded-[4px] border border-none hover:bg-gray-200 transition-colors duration-200"
          >
            Выберите файл
          </button>
  
          <span class="ml-4 text-sm text-gray-500 truncate">
            {{ fileName || 'Файл не выбран' }}
          </span>
        </div>
      </div>
  
      <span v-if="error" class="text-xs text-red-500 mt-1 block">{{ error }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, ref, watch, computed } from "vue";
  import type { InputHTMLAttributes } from "vue";
  
  type FileType =
    | "application/pdf"
    | "application/msword"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    | "image/jpeg"
    | "image/png";
  const allowedFileTypes: FileType[] = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];
  
  const props = defineProps<
    {
      label?: string;
      rules?: ((value: string) => string | null)[];
      modelValue?: File | null;
      acceptedTypes?: FileType[];
    } & /* @vue-ignore */ InputHTMLAttributes
  >();
  
  const emit = defineEmits(["update:modelValue"]);
  
  const error = ref<string>("");
  const fileName = ref<string>("");
  const fileInput = ref<HTMLInputElement | null>(null);
  const acceptedTypes = computed(() => props.acceptedTypes || allowedFileTypes);
  
  const validateFile = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] || null;
  
    // Set the file name for display
    fileName.value = file ? file.name : "";
  
    if (file) {
      if (!acceptedTypes.value.includes(file.type as FileType)) {
        error.value = `Invalid file type. Allowed types: ${acceptedTypes.value
          .map((t) => t.split("/")[1])
          .join(", ")}`;
        emit("update:modelValue", null);
        if (fileInput.value) fileInput.value.value = "";
        fileName.value = "";
        return;
      }
      emit("update:modelValue", file);
      error.value = "";
    } else {
      emit("update:modelValue", null);
      error.value = "";
    }
    if (props.rules) {
      for (const rule of props.rules) {
        const ruleError = rule(file ? file.name : "");
        if (ruleError) {
          error.value = ruleError;
          return;
        }
      }
    }
  };
  
  const openFilePicker = () => {
    fileInput.value?.click();
  };
  
  watch(
    () => props.modelValue,
    (newValue) => {
      if (!newValue) {
        fileName.value = "";
      }
    }
  );
  </script>