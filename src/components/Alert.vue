<template>
  <div class="text-center my-3" :class="activeClass">
    <h2>{{ config.header[type] }}</h2>
    <p v-if="typeof message === 'string'">{{ message }}</p>
    <ul v-else class="list-group">
      <li v-for="value in messageArray" class="list-group-item" :class="activeClass">
        {{ value }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { ErrorMessage } from '../types/otherTypes.ts';

type AlertType = 'success' | 'error';

interface Props {
  message: ErrorMessage;
  type: AlertType;
}

const props = defineProps<Props>();

const config = {
  activeClass: {
    error: 'text-danger',
    success: 'text-success',
  },
  header: {
    error: 'Упс, произошла ошибка!',
    success: 'Успешно!',
  },
  listGroupClass: {
    error: 'list-group-item-danger-danger',
    success: 'list-group-item-success',
  },
};
const activeClass = computed<string>(() => config.activeClass[props.type]);
const messageArray = computed<string[]>(() => {
  const array: string[] = [];
  if (typeof props.message === 'string') {
    array.push(props.message);
  } else if (Array.isArray(props.message)) {
    for (const val of props.message) {
      if (typeof val === 'object') {
        for (const values of Object.values(val)) {
          array.push(...values);
        }
      } else {
        array.push(val);
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
<style>
.text-inherit {
  color: inherit;
}
</style>
