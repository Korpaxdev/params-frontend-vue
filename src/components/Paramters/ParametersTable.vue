<template>
  <search-params />
  <div class="table-responsive mt-5" v-if="currenPageParams">
    <table class="table">
      <table-head :headers="headers" />
      <tbody>
        <table-row
          v-for="param in currenPageParams"
          :param="param"
          :delete-callback="markToDelete"
          :show-delete-button="isAuthenticated"
          :key="param.id"
        />
      </tbody>
    </table>
  </div>
  <h2 v-else class="text-center text-secondary">Список параметров пуст</h2>
  <paginator :total-pages="totalPages" :current-page="currentPage" :change-page="changePage" />
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";

import TableHead from "../TableComponets/TableHead.vue";
import TableRow from "../TableComponets/TableRow.vue";
import Paginator from "../Paginator.vue";
import SearchParams from "./ParametersSearch.vue";

import { Param } from "../../types/paramsTypes.ts";
import { DEFAULT_PAGE } from "../../utils/defaultConstants.ts";
import useParamsStore from "../../stores/paramsStore.ts";
import useUserStore from "../../stores/userStore.ts";

const paramsStore = useParamsStore();
const userStore = useUserStore();
const { currenPageParams, currentPage, totalPages } = storeToRefs(paramsStore);
const { isAuthenticated } = storeToRefs(userStore);

const headers = computed(() => {
  if (currenPageParams.value && currenPageParams.value.length) {
    return Object.keys(currenPageParams.value[0]);
  }
  return [];
});

const markToDelete = (param: Param) => {
  param.status_delete = true;
};
const changePage = (page: number) => {
  currentPage.value = page;
};

watch([currentPage, totalPages], () => {
  if (!totalPages.value || currentPage.value > totalPages.value) {
    return (currentPage.value = DEFAULT_PAGE);
  }
});
</script>
