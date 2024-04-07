<template>
  <div class="text-center" :class="config.activeClass[type]">
    <h2>{{ config.header[type] }}</h2>
    <p v-if="typeof message === 'string'">{{ message }}</p>
    <ul v-else class="list-group">
      <template v-for="values in message">
        <li v-for="value in values" class="list-group-item list-group-item-danger">
          {{ value }}
        </li>
      </template>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ErrorMessage } from "../types/otherTypes.ts";

type AlertType = "success" | "error";

interface Props {
  message: ErrorMessage;
  type: AlertType;
}

defineProps<Props>();

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
</script>
