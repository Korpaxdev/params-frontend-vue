import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { Param, SearchParamFields } from "../types/paramsTypes.ts";
import apiUtils from "../utils/apiUtils.ts";
import usePaginator from "./hooks/usePaginator.ts";
import { DEFAULT_PAGE } from "../utils/defaultConstants.ts";

const useParamsStore = defineStore("params", () => {
  const params = ref<Param[]>([]);
  const isLoading = ref(false);
  const isError = ref(false);
  const searchFields = reactive<SearchParamFields>({
    name: "",
    range: "",
    scaling: "",
  });
  const { paginatedParams, totalPages, currentPage } = usePaginator(params, searchFields);
  const currenPageParams = computed<Param[]>(() => {
    if (!paginatedParams.value || !paginatedParams.value?.length) return [];
    return paginatedParams.value[currentPage.value - 1];
  });

  const fetchParams = async () => {
    try {
      isLoading.value = true;
      const res = await apiUtils.get<Param[]>("parameters/");
      params.value = res.data;
      isLoading.value = false;
      currentPage.value = DEFAULT_PAGE;
    } catch (e) {
      isLoading.value = false;
      isError.value = true;
    }
  };

  return {
    params,
    isLoading,
    isError,
    searchFields,
    paginatedParams,
    currenPageParams,
    currentPage,
    totalPages,
    fetchParams,
  };
});

export default useParamsStore;
