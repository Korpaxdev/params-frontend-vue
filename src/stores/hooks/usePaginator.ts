import { Param, SearchParamFields } from "../../types/paramsTypes.ts";
import { computed, ref, Ref, watch } from "vue";
import { createFilteredParams, createPaginatedParams } from "../../utils/paramsUtils.ts";
import { DEFAULT_PAGE } from "../../utils/defaultConstants.ts";

const usePaginator = (params: Ref<Param[] | null>, searchFields?: SearchParamFields) => {
  const currentPage = ref(DEFAULT_PAGE);
  const paginatedParams = computed<Param[][] | null>(() => {
    if (!params.value) return null;
    if (searchFields && Object.values(searchFields).some((value) => value)) {
      return createPaginatedParams(createFilteredParams(params.value, searchFields));
    }
    return createPaginatedParams(params.value);
  });
  const totalPages = computed(() => {
    if (!paginatedParams.value) return null;
    return paginatedParams.value.length;
  });
  watch([currentPage, totalPages], () => {
    if (!totalPages.value || currentPage.value > totalPages.value || currentPage.value <= 0) {
      currentPage.value = DEFAULT_PAGE;
    }
  });
  return { paginatedParams, totalPages, currentPage };
};
export default usePaginator;
