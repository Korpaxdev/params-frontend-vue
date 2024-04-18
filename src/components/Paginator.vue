<template>
  <nav aria-label="Page navigation example" class="mt-3">
    <ul class="pagination justify-content-center flex-wrap">
      <li class="page-item" :class="{ disabled: isStart }">
        <button class="page-link" @click="changePage(DEFAULT_PAGE)">
          <i class="bi-chevron-double-left"></i>
        </button>
      </li>
      <li class="page-item" :class="{ disabled: isPrevDisabled }">
        <button class="page-link" @click="downCurrentPageIndex">
          <i class="bi-chevron-compact-left"></i>
        </button>
      </li>
      <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: page === currentPage }">
        <button class="page-link" @click="changePage(page)">{{ page }}</button>
      </li>
      <li class="page-item" :class="{ disabled: isNextDisabled }">
        <button class="page-link" @click="upCurrentPageIndex">
          <i class="bi-chevron-compact-right"></i>
        </button>
      </li>
      <li class="page-item" :class="{ disabled: isEnded }">
        <button class="page-link" @click="changePage(totalPages)">
          <i class="bi-chevron-double-right"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { DEFAULT_PAGE, DEFAULT_PAGINATION_COUNT } from '../utils/defaultConstants.ts';

interface Props {
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
}

const props = defineProps<Props>();

const pageList = computed(() => Array.from({ length: props.totalPages }).map((_, i) => i + 1));
const pageListPaginator = computed(() => {
  const pages = [];
  for (let i = 0; i < pageList.value.length; i += DEFAULT_PAGINATION_COUNT) {
    pages.push(pageList.value.slice(i, i + DEFAULT_PAGINATION_COUNT));
  }
  return pages;
});
const currentPaginatorIndex = computed(() => {
  return pageListPaginator.value.findIndex((pages) => pages.some((page) => page === props.currentPage));
});
const visiblePages = computed(() => pageListPaginator.value[currentPaginatorIndex.value]);

const upCurrentPageIndex = () => {
  if (currentPaginatorIndex.value < pageListPaginator.value.length - 1) {
    props.changePage(pageListPaginator.value[currentPaginatorIndex.value + 1][0]);
  }
};
const downCurrentPageIndex = () => {
  if (currentPaginatorIndex.value > 0) {
    props.changePage(pageListPaginator.value[currentPaginatorIndex.value - 1][0]);
  }
};
const isNextDisabled = computed(() => currentPaginatorIndex.value === pageListPaginator.value.length - 1);
const isPrevDisabled = computed(() => currentPaginatorIndex.value === 0);
const isEnded = computed(() => props.currentPage === props.totalPages);
const isStart = computed(() => props.currentPage === DEFAULT_PAGE);
</script>
