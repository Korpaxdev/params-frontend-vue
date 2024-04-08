<template>
  <div class="d-flex flex-wrap justify-content-center gap-2 my-3">
    <button class="btn btn-success">Синхронизировать</button>
    <button class="btn btn-secondary" @click="updateTable">Обновить</button>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Добавить</button>
  </div>
</template>
<script lang="ts" setup>
import useParamsStore from "../../stores/paramsStore.ts";
import useParamsToServerStore from "../../stores/paramsToServerStore.ts";
import { storeToRefs } from "pinia";
import { HAS_MODIFY_PARAMS_CONFIRM } from "../../utils/messagesConstants.ts";

const paramsStore = useParamsStore();
const paramsToServerStore = useParamsToServerStore();
const { clearModifyParams } = paramsToServerStore;
const { fetchParams } = paramsStore;
const { hasParamsToModify } = storeToRefs(paramsToServerStore);
const updateTable = async () => {
  if (hasParamsToModify.value && !confirm(HAS_MODIFY_PARAMS_CONFIRM)) return;
  clearModifyParams();
  await fetchParams();
};
</script>
