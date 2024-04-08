<template>
  <tr>
    <td v-for="(key, index) in paramKeys" :key="key">
      <div v-if="isShowToDeleteButton(index)" class="d-flex gap-2">
        {{ renderText(key as keyof typeof param, param) }}
        <button class="btn btn-outline-danger btn-sm" @click="deleteCallback!(param)">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <template v-else>{{ renderText(key as keyof typeof param, param) }}</template>
    </td>
  </tr>
</template>
<script lang="ts" setup>
import { Param } from "../../types/paramsTypes.ts";
import { computed } from "vue";

interface Props {
  param: Param;
  showDeleteButton?: boolean;
  deleteCallback?: (param: Param) => void;
}

const props = withDefaults(defineProps<Props>(), { showDeleteButton: false });
const paramKeys = computed(() => Object.keys(props.param));
const isShowToDeleteButton = (index: number) => {
  return index === paramKeys.value.length - 1 && props.deleteCallback && props.showDeleteButton;
};
const renderText = (key: keyof Param, param: Param) => {
  const value = param[key];
  if (value === null || value === undefined) return "null";
  if (typeof value === "string" && key === "date") return new Date(value).toString();
  return param[key];
};
</script>
