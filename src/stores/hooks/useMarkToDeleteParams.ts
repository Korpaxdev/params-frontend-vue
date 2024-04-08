import { computed, ref } from "vue";
import { Param } from "../../types/paramsTypes.ts";
import usePaginator from "./usePaginator.ts";

const useMarkToDeleteParams = () => {
  const paramsMarkToDelete = ref<Param[]>([]);
  const {
    paginatedParams: paginatedMarkToDeleteParams,
    currentPage: markToDeleteCurrentPage,
    totalPages: markToDeleteTotalPages,
  } = usePaginator(paramsMarkToDelete);
  const currentPageMarkToDeleteParams = computed<Param[]>(() => {
    return paginatedMarkToDeleteParams.value![markToDeleteCurrentPage.value - 1];
  });
  const markParamToDelete = (param: Param) => {
    paramsMarkToDelete.value.push(param);
  };
  const unmarkParamFromDelete = (param: Param) => {
    param.status_delete = false;
    paramsMarkToDelete.value = paramsMarkToDelete.value.filter((value) => value !== param);
  };
  return {
    paramsMarkToDelete,
    paginatedMarkToDeleteParams,
    markToDeleteCurrentPage,
    markToDeleteTotalPages,
    currentPageMarkToDeleteParams,
    markParamToDelete,
    unmarkParamFromDelete,
  };
};
export default useMarkToDeleteParams;
