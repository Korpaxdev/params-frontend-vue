<template>
  <h3 class="text-center mt-5">Параметры добавленные пользователем:</h3>
  <div class="table-responsive mt-3">
    <table class="table">
      <table-head :headers="headers" />
      <tbody>
        <table-row
          v-for="(param, index) in currentPageAddedParams"
          :param="param"
          :key="index"
          :delete-callback="removeAddedParamFromList"
          :show-delete-button="true"
        />
      </tbody>
    </table>
  </div>
  <paginator :change-page="changePage" :total-pages="addedParamsTotalPage" :current-page="addedParamsCurrentPage" />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import useParamsToServerStore from '../../stores/paramsToServerStore.ts';
import Paginator from '../Paginator.vue';
import TableHead from '../TableComponets/TableHead.vue';
import TableRow from '../TableComponets/TableRow.vue';

const paramsToServerStore = useParamsToServerStore();
const { removeAddedParamFromList } = paramsToServerStore;
const { currentPageAddedParams, addedParamsTotalPage, addedParamsCurrentPage } = storeToRefs(paramsToServerStore);
const headers = computed(() => Object.keys(currentPageAddedParams.value[0]));
const changePage = (page: number) => {
  addedParamsCurrentPage.value = page;
};
</script>
