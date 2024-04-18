<template>
  <h3 class="text-center">Поиск по значениям</h3>
  <div class="mt-3 search mx-auto d-flex flex-column gap-2">
    <div v-for="(value, key) in searchFields" :key="key">
      <label :for="key" class="form-label">{{ labels[key] }}</label>
      <input
        :id="key"
        :name="key"
        class="form-control"
        :value="value"
        @input="onInput(($event.target as HTMLInputElement).value.trim(), key)"
      />
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-secondary" @click="clearFields">Очистить</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import useParamsStore from '../../stores/paramsStore.ts';
import { SearchParamFields } from '../../types/paramsTypes.ts';
import { debounce } from '../../utils/otherUtils.ts';

const labels: SearchParamFields = {
  name: 'Название параметра',
  range: 'Range',
  scaling: 'Scaling',
};

const store = useParamsStore();
const { searchFields, isLoading } = storeToRefs(store);

const debouncedFunc = debounce((value: string, key: keyof SearchParamFields) => {
  searchFields.value[key] = value;
  isLoading.value = false;
});

const onInput = (value: string, key: keyof SearchParamFields) => {
  isLoading.value = true;
  debouncedFunc(value, key);
};
const clearFields = () => {
  for (let key in searchFields.value) {
    searchFields.value[key as keyof SearchParamFields] = '';
  }
};
</script>
<style>
.search {
  max-width: 800px;
}
</style>
