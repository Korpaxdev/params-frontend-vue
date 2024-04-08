<template>
  <h1 class="text-center">Параметры на модификации:</h1>
  <params-mark-to-delete v-if="paramsMarkToDelete.length" />
  <params-to-add v-if="addedParams.length" />
</template>
<script lang="ts" setup>
import useAuthPermission from "../hooks/useAuthPermission.ts";
import useParamsToModifyPermission from "../hooks/useParamsToModifyPermission.ts";
import ParamsMarkToDelete from "../components/ToServer/ParamsMarkToDelete.vue";
import useParamsToServerStore from "../stores/paramsToServerStore.ts";
import { storeToRefs } from "pinia";
import ParamsToAdd from "../components/ToServer/ParamsToAdd.vue";

useAuthPermission();
useParamsToModifyPermission();
const { paramsMarkToDelete, addedParams } = storeToRefs(useParamsToServerStore());
</script>
