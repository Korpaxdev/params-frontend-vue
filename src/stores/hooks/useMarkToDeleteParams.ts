import { computed, ref } from "vue";
import { Param } from "../../types/paramsTypes.ts";
import usePaginator from "./usePaginator.ts";
import apiUtils from "../../utils/apiUtils.ts";
import { getAccessToken } from "../../utils/tokenUtils.ts";
import { AxiosError, AxiosHeaders } from "axios";
import useUserStore from "../userStore.ts";
import { ErrorMessage } from "../../types/otherTypes.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/messagesConstants.ts";

const useMarkToDeleteParams = () => {
  const paramsMarkToDelete = ref<Param[]>([]);
  const userStore = useUserStore();
  const { updateAccessToken } = userStore;
  const {
    paginatedParams: paginatedMarkToDeleteParams,
    currentPage: markToDeleteCurrentPage,
    totalPages: markToDeleteTotalPages,
  } = usePaginator(paramsMarkToDelete);
  const currentPageMarkToDeleteParams = computed<Param[]>(() => {
    return paginatedMarkToDeleteParams.value![markToDeleteCurrentPage.value - 1];
  });
  const markParamsSyncIsLoading = ref(false);
  const markParamsSyncError = ref<ErrorMessage>("");
  const markParamToDelete = (param: Param) => {
    paramsMarkToDelete.value.push(param);
  };
  const unmarkParamFromDelete = (param: Param) => {
    param.status_delete = false;
    paramsMarkToDelete.value = paramsMarkToDelete.value.filter((value) => value !== param);
  };
  const syncMarkedParams = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    try {
      markParamsSyncIsLoading.value = true;
      const headers = new AxiosHeaders();
      headers.set("Authorization", `Bearer ${accessToken}`);
      const res = await apiUtils.post("parameters/to-delete/", paramsMarkToDelete.value, { headers });
      console.log(res.data);
      paramsMarkToDelete.value = [];
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          await updateAccessToken();
          await syncMarkedParams();
          return;
        }
        markParamsSyncError.value = e.response?.data ?? DEFAULT_ERROR_MESSAGE;
      }
    } finally {
      markParamsSyncIsLoading.value = false;
    }
  };
  return {
    paramsMarkToDelete,
    paginatedMarkToDeleteParams,
    markToDeleteCurrentPage,
    markToDeleteTotalPages,
    currentPageMarkToDeleteParams,
    markParamsSyncIsLoading,
    markParamsSyncError,
    markParamToDelete,
    unmarkParamFromDelete,
    syncMarkedParams,
  };
};
export default useMarkToDeleteParams;
