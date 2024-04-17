<template>
  <alert :message="DEFAULT_ERROR_MESSAGE" type="error" v-if="isError" />
  <parameters-table v-else />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import useParamsStore from '../../stores/paramsStore.ts';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/messagesConstants.ts';
import Alert from '../Alert.vue';
import ParametersTable from './ParametersTable.vue';

const store = useParamsStore();
const { fetchParams } = store;
const { isError, params } = storeToRefs(store);

onMounted(async () => {
  if (!params.value.length) {
    await fetchParams();
  }
});
</script>
