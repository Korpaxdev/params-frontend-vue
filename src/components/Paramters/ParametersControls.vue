<template>
  <div class="d-flex flex-wrap justify-content-center gap-2 my-3" v-bind="$attrs">
    <button class="btn btn-success" @click="onSyncParams" :disabled="disableSyncButton">
      Синхронизировать ({{ countParamsToModify }})
    </button>
    <button class="btn btn-secondary" @click="updateTable" :disabled="disableUpdateButton">Обновить</button>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Добавить</button>
  </div>
  <alert :message="markParamsSyncError" type="error" v-if="markParamsSyncError" />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import useParamsStore from '../../stores/paramsStore.ts';
import useParamsToServerStore from '../../stores/paramsToServerStore.ts';
import { HAS_MODIFY_PARAMS_CONFIRM } from '../../utils/messagesConstants.ts';
import Alert from '../Alert.vue';

const paramsStore = useParamsStore();
const paramsToServerStore = useParamsToServerStore();
const { fetchParams } = paramsStore;
const { clearModifyParams, syncParams } = paramsToServerStore;
const { isLoading: paramsIsLoading } = storeToRefs(paramsStore);
const { markParamsSyncError, hasParamsToModify, countParamsToModify, markParamsSyncIsLoading } =
  storeToRefs(paramsToServerStore);

const disableUpdateButton = computed(() => {
  return paramsIsLoading.value || markParamsSyncIsLoading.value;
});
const disableSyncButton = computed(() => {
  return !hasParamsToModify.value || paramsIsLoading.value || markParamsSyncIsLoading.value;
});
const updateTable = async () => {
  if (hasParamsToModify.value && !confirm(HAS_MODIFY_PARAMS_CONFIRM)) return;
  clearModifyParams();
  await fetchParams();
};
const onSyncParams = async () => {
  await syncParams();
  if (!markParamsSyncError.value) {
    await fetchParams();
  }
};
</script>
