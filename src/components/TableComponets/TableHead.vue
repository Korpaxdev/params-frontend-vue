<template>
  <thead>
    <tr>
      <th v-for="header in headers" :key="header">{{ header }}</th>
    </tr>
  </thead>
</template>
<script lang="ts" setup>
interface Props {
  headers: string[];
}

defineProps<Props>();
</script>
