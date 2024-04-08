import { defineStore } from "pinia";
import { computed } from "vue";
import useMarkToDeleteParams from "./hooks/useMarkToDeleteParams.ts";
import useAddNewParams from "./hooks/useAddNewParams.ts";

const useParamsToServerStore = defineStore("paramsToServerStore", () => {
  const markToDeleteParamsControls = useMarkToDeleteParams();
  const addNewParamsControls = useAddNewParams();
  const { paramsMarkToDelete } = markToDeleteParamsControls;
  const { addedParams } = addNewParamsControls;
  const countParamsToModify = computed(() => paramsMarkToDelete.value.length + addedParams.value.length);
  const hasParamsToModify = computed(() => !!countParamsToModify.value);
  const clearModifyParams = () => {
    paramsMarkToDelete.value = [];
    addedParams.value = [];
  };

  return {
    hasParamsToModify,
    countParamsToModify,
    ...markToDeleteParamsControls,
    ...addNewParamsControls,
    clearModifyParams,
  };
});

export default useParamsToServerStore;
