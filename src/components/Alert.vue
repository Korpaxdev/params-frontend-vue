<template>
  <div class="text-center my-3" :class="config.activeClass[type]">
    <h2>{{ config.header[type] }}</h2>
    <p v-if="typeof message === 'string'">{{ message }}</p>
    <ul v-else class="list-group">
      <li v-for="value in messageArray" class="list-group-item list-group-item-danger">
        {{ value }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ErrorMessage } from "../types/otherTypes.ts";
import { computed } from "vue";

type AlertType = "success" | "error";

interface Props {
  message: ErrorMessage;
  type: AlertType;
}

const props = defineProps<Props>();

const config = {
  activeClass: {
    error: "text-danger",
    success: "text-success",
  },
  header: {
    error: "Упс, произошла ошибка!",
    success: "Успешно!",
  },
};
const messageArray = computed<string[]>(() => {
  const array: string[] = [];
  if (typeof props.message === "string") {
    array.push(props.message);
  } else if (Array.isArray(props.message)) {
    for (const obj of props.message) {
      for (const values of Object.values(obj)) {
        array.push(...values);
      }
    }
  } else {
    for (const values of Object.values(props.message)) {
      array.push(...values);
    }
  }
  return array;
});
</script>
