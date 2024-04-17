import { defineStore } from 'pinia';
import { computed } from 'vue';

import useAddNewParams from './hooks/useAddNewParams.ts';
import useMarkToDeleteParams from './hooks/useMarkToDeleteParams.ts';

const useParamsToServerStore = defineStore('paramsToServerStore', () => {
  const markToDeleteParamsControls = useMarkToDeleteParams();
  const addNewParamsControls = useAddNewParams();
  const { paramsMarkToDelete, markParamsSyncIsLoading, markParamsSyncError, syncMarkedParams } =
    markToDeleteParamsControls;
  const { addedParams, syncAddedParams } = addNewParamsControls;
  const isSyncLoading = computed(() => markParamsSyncIsLoading.value);
  const countParamsToModify = computed(() => paramsMarkToDelete.value.length + addedParams.value.length);
  const hasParamsToModify = computed(() => !!countParamsToModify.value);

  const clearModifyParams = () => {
    markParamsSyncError.value = '';
    paramsMarkToDelete.value = [];
    addedParams.value = [];
  };
  const syncParams = async () => {
    await syncMarkedParams();
    await syncAddedParams();
  };

  return {
    hasParamsToModify,
    countParamsToModify,
    isSyncLoading,
    ...markToDeleteParamsControls,
    ...addNewParamsControls,
    clearModifyParams,
    syncParams,
  };
});

export default useParamsToServerStore;
