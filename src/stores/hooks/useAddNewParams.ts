import { computed, ref } from "vue";
import { Param, ParamAddFormData } from "../../types/paramsTypes.ts";
import usePaginator from "./usePaginator.ts";
import useParamsStore from "../paramsStore.ts";
import { storeToRefs } from "pinia";
import { AxiosError, AxiosHeaders } from "axios";
import useUserStore from "../userStore.ts";
import { getAccessToken } from "../../utils/tokenUtils.ts";
import apiUtils from "../../utils/apiUtils.ts";

const useAddNewParams = () => {
  const paramsStore = useParamsStore();
  const userStore = useUserStore();
  const { updateAccessToken } = userStore;
  const { hasToken } = storeToRefs(userStore);
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
  const syncAddedParams = async () => {
    if (!hasToken.value) return;
    const accessToken = getAccessToken();
    try {
      const headers = new AxiosHeaders();
      headers.set("Authorization", `Bearer ${accessToken}`);
      await apiUtils.post("parameters/create/", addedParams.value, { headers });
      addedParams.value = [];
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          await updateAccessToken();
          await syncAddedParams();
          return;
        }
      }
    }
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
    syncAddedParams,
    removeAddedParamFromList,
  };
};
export default useAddNewParams;
