<template>
  <h1 class="text-center">Параметры на модификации:</h1>
  <params-mark-to-delete v-if="paramsMarkToDelete.length" />
  <params-to-add v-if="addedParams.length" />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import ParamsMarkToDelete from '../components/ToServer/ParamsMarkToDelete.vue';
import ParamsToAdd from '../components/ToServer/ParamsToAdd.vue';
import useAuthPermission from '../hooks/useAuthPermission.ts';
import useParamsToModifyPermission from '../hooks/useParamsToModifyPermission.ts';
import useParamsToServerStore from '../stores/paramsToServerStore.ts';

useAuthPermission();
useParamsToModifyPermission();
const { paramsMarkToDelete, addedParams } = storeToRefs(useParamsToServerStore());
</script>
