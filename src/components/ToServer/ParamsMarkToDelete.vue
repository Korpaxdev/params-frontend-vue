<template>
  <h3 class="text-center mt-5">Параметры помеченные на удаление:</h3>
  <div class="table-responsive mt-3">
    <table class="table">
      <table-head :headers="headers" />
      <tbody>
        <table-row
          v-for="param in currentPageMarkToDeleteParams"
          :param="param"
          :key="param.id"
          :delete-callback="unmarkParamFromDelete"
          :show-delete-button="true"
        />
      </tbody>
    </table>
  </div>
  <paginator :change-page="changePage" :total-pages="markToDeleteTotalPages" :current-page="markToDeleteCurrentPage" />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import useParamsToServerStore from '../../stores/paramsToServerStore.ts';
import Paginator from '../Paginator.vue';
import TableHead from '../TableComponets/TableHead.vue';
import TableRow from '../TableComponets/TableRow.vue';

const paramsToServerStore = useParamsToServerStore();
const { unmarkParamFromDelete } = paramsToServerStore;
const { currentPageMarkToDeleteParams, markToDeleteTotalPages, markToDeleteCurrentPage } =
  storeToRefs(paramsToServerStore);
const headers = computed(() => Object.keys(currentPageMarkToDeleteParams.value[0]));
const changePage = (page: number) => {
  markToDeleteCurrentPage.value = page;
};
</script>
