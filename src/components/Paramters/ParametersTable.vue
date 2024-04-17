<template>
  <spinner class="fixed-center" v-if="isLoading || markParamsSyncIsLoading" />
  <search-params />
  <parameters-controls v-if="isAuthenticated" />
  <template v-if="currenPageParams.length">
    <div class="table-responsive mt-5">
      <table class="table">
        <table-head :headers="headers" />
        <tbody>
          <table-row
            v-for="param in currenPageParams"
            :param="param"
            :delete-callback="markToDelete"
            :show-delete-button="showDeleteButton(param)"
            :key="param.id"
          />
        </tbody>
      </table>
    </div>
    <paginator :total-pages="totalPages" :current-page="currentPage" :change-page="changePage" />
  </template>
  <h2 v-else class="text-center text-secondary">Список параметров пуст</h2>
  <parameters-controls v-if="currenPageParams!.length > 10 && isAuthenticated" class="mb-5" />
  <add-parameter-modal />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import useParamsStore from '../../stores/paramsStore.ts';
import useParamsToServerStore from '../../stores/paramsToServerStore.ts';
import useUserStore from '../../stores/userStore.ts';
import { Param } from '../../types/paramsTypes.ts';
import AddParameterModal from '../AddParameters/AddParameterModal.vue';
import Paginator from '../Paginator.vue';
import Spinner from '../Spinner.vue';
import TableHead from '../TableComponets/TableHead.vue';
import TableRow from '../TableComponets/TableRow.vue';
import ParametersControls from './ParametersControls.vue';
import SearchParams from './ParametersSearch.vue';

const paramsStore = useParamsStore();
const userStore = useUserStore();
const paramsToServerStore = useParamsToServerStore();
const { markParamToDelete } = paramsToServerStore;
const { currenPageParams, currentPage, totalPages, isLoading } = storeToRefs(paramsStore);
const { isAuthenticated } = storeToRefs(userStore);
const { markParamsSyncIsLoading } = storeToRefs(paramsToServerStore);

const headers = computed(() => {
  if (currenPageParams.value && currenPageParams.value.length) {
    return Object.keys(currenPageParams.value[0]);
  }
  return [];
});
const showDeleteButton = (param: Param) => {
  return isAuthenticated.value && param.id && !param.status_delete;
};

const markToDelete = (param: Param) => {
  param.status_delete = true;
  markParamToDelete(param);
};
const changePage = (page: number) => {
  currentPage.value = page;
};
</script>
