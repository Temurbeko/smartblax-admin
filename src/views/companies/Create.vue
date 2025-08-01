<script setup lang="ts">
import Autocomplete from "@/components/form/Autocomplete.vue";
import Input from "@/components/form/Input.vue";
import Radio from "@/components/form/Radio.vue";
import RangeDateSelect from "@/components/form/RangeDateSelect.vue";
import { reactive, ref } from "vue";
import { COMPANY_TYPES } from "./constants";
import FileInput from "@/components/form/FileInput.vue";
import Button from "@/components/custom/Button.vue";
import TextArea from "@/components/form/Textarea.vue";

const form = reactive({
  name: "",
  type: "",
  target: "",
  ageGroup: {
    from: "",
    to: "",
  },
  budget: "",
  startPeriod: {
    start: "",
    end: "",
  },
  endPeriod: {
    start: "",
    end: "",
  },
  description: "",
  file: undefined,
});

const handleSearch = () => {};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Добавить рекламную кампанию</h1>
      <div class="flex gap-2">
        <Button color="red">Удалить</Button>
        <Button color="gray">Сохранить черновик</Button>
        <Button color="green">Опубликовать</Button>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="p-4 shadow-sm rounded-xl flex flex-col gap-4">
        <Input
          v-model="form.name"
          label="Название кампании"
          placeholder="Введите название"
        />
        <Autocomplete
          v-model="form.type"
          :items="COMPANY_TYPES"
          item-text="text"
          item-value="value"
          label="Тип кампании"
          placeholder="Выберите тип"
          @update:search-input="handleSearch"
        />
        <Radio
          v-model="form.type"
          :items="[
            { text: 'Все', value: 'all' },
            { text: 'Мужчины', value: 'male' },
            { text: 'Женщины', value: 'female' },
          ]"
          item-text="text"
          label="Целевая аудитория"
          :rules="[(v) => (v ? null : 'Please select an option')]"
          name="option"
          required
          containerClass="flex gap-3"
        />
        <div class="flex gap-2">
          <Input
            label="Возрастная группа"
            placeholder="От"
            v-model="form.ageGroup.from"
            type="number"
          />
          <Input
            placeholder="До"
            class="mt-[15px]"
            v-model="form.ageGroup.to"
            type="number"
          />
        </div>

        <div>
          <label
            class="text-md font-medium mb-1.5 flex items-center justify-between"
          >
            <span>Бюджет</span>
            <span class="text-gray-500 font-normal text-sm"
              >Доступно: 0 сум</span
            >
          </label>
          <Input
            placeholder="Введите бюджет"
            v-model="form.budget"
            type="number"
          />
        </div>

        <RangeDateSelect
          v-model:start="form.startPeriod.start"
          v-model:end="form.startPeriod.end"
          label="Начало проведения"
        />
        <RangeDateSelect
          v-model:start="form.endPeriod.start"
          v-model:end="form.endPeriod.end"
          label="Конец проведения"
        />
        <Input
          v-model="form.name"
          label="Геолокация"
          placeholder="Введите геолокацию"
        />
      </div>
      <div class="p-4 shadow-sm rounded-xl flex flex-col gap-4">
        <TextArea
          v-model="form.description"
          label="Текст объявления"
          placeholder="Введите текст"
        />
        <FileInput
          v-model="form.file"
          label="Добавить медиа"
          :rules="[(v) => (v ? null : 'Please select a file')]"
          :acceptedTypes="['application/pdf', 'image/jpeg']"
        />
      </div>
    </div>
  </div>
</template>
