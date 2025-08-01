<template>
  <div class="flex text-xl font-semibold justify-between mb-2">
    <h1>Список компаний</h1>
    <RouterLink :to="{ name: 'companies-create' }">
      <!-- /* @vue-ignore */ -->
      <Button color="green">Создать</Button></RouterLink
    >
  </div>
  <Table :items="companies" :columns="columns" :perPage="5">
    <template #col.name="{ value }">
      <strong>{{ value }}</strong>
    </template>
  </Table>
</template>

<script setup lang="ts">
import Button from "@/components/custom/Button.vue";
import Table from "@/components/custom/Table.vue";
import { RouterLink } from "vue-router";

interface Company {
  name: string;
  industry: string;
  country: string;
}

const companies: Company[] = [
  { name: "Google", industry: "Tech", country: "USA" },
  { name: "Toyota", industry: "Automotive", country: "Japan" },
  { name: "Samsung", industry: "Electronics", country: "South Korea" },
  { name: "Nestlé", industry: "Food", country: "Switzerland" },
  { name: "Alibaba", industry: "E-commerce", country: "China" },
  { name: "Sony", industry: "Entertainment", country: "Japan" },
];

const columns = [
  { key: "name", label: "Company Name" },
  { key: "industry", label: "Industry" },
  { key: "country", label: "Country" },
];
</script>
