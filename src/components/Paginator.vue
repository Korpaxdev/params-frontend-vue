<template>
  <nav aria-label="Page navigation example" class="mt-3">
    <ul class="pagination justify-content-center flex-wrap">
      <li v-for="page in pageList" :key="page" class="page-item" :class="{ active: page === currentPage }">
        <button class="page-link" @click="changePage(page)">{{ page }}</button>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
}

const props = defineProps<Props>();

const pageList = computed(() => Array.from({ length: props.totalPages }).map((_, i) => i + 1));
</script>
