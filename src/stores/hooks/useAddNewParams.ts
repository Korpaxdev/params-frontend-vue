import { computed, ref } from "vue";
import { Param, ParamAddFormData } from "../../types/paramsTypes.ts";
import usePaginator from "./usePaginator.ts";
import useParamsStore from "../paramsStore.ts";
import { storeToRefs } from "pinia";

const useAddNewParams = () => {
  const paramsStore = useParamsStore();
  const { params } = storeToRefs(paramsStore);
  const addedParams = ref<Param[]>([]);
  const {
    paginatedParams: paginatedAddedParams,
    totalPages: addedParamsTotalPage,
    currentPage: addedParamsCurrentPage,
  } = usePaginator(addedParams);
  const currentPageAddedParams = computed<Param[]>(() => {
    return paginatedAddedParams.value![addedParamsCurrentPage.value - 1];
  });

  const addNewParam = (data: ParamAddFormData) => {
    const newParam: Param = { id: null, ...data, date: null, status_delete: false };
    addedParams.value.push(newParam);
    params.value.push(newParam);
  };
  const removeAddedParamFromList = (param: Param) => {
    addedParams.value = addedParams.value.filter((value) => value !== param);
    params.value = params.value.filter((value) => value !== param);
  };
  return {
    addedParams,
    paginatedAddedParams,
    addedParamsTotalPage,
    addedParamsCurrentPage,
    currentPageAddedParams,
    addNewParam,
    removeAddedParamFromList,
  };
};
export default useAddNewParams;
