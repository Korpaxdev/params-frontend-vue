<template>
  <spinner v-if="isLoading" class="fixed-center" />
  <error v-if="isError" />
  <parameters-table v-if="paginatedParams" />
</template>

<script lang="ts" setup>
import useParamsStore from "../../stores/paramsStore.ts";
import { onMounted } from "vue";
import Spinner from "../Spinner.vue";
import Error from "../Alert.vue";
import ParametersTable from "./ParametersTable.vue";
import { storeToRefs } from "pinia";

const store = useParamsStore();
const { fetchParams } = store;
const { isLoading, isError, paginatedParams, params } = storeToRefs(store);

onMounted(async () => {
  if (!params.value) {
    await fetchParams();
  }
});
</script>
