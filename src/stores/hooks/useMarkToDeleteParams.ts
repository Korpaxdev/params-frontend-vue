import { AxiosError, AxiosHeaders } from 'axios';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import { ErrorMessage } from '../../types/otherTypes.ts';
import { Param } from '../../types/paramsTypes.ts';
import apiUtils from '../../utils/apiUtils.ts';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/messagesConstants.ts';
import { getAccessToken } from '../../utils/tokenUtils.ts';
import useUserStore from '../userStore.ts';
import usePaginator from './usePaginator.ts';

const useMarkToDeleteParams = () => {
  const paramsMarkToDelete = ref<Param[]>([]);
  const userStore = useUserStore();
  const { updateAccessToken } = userStore;
  const { hasToken } = storeToRefs(userStore);
  const {
    paginatedParams: paginatedMarkToDeleteParams,
    currentPage: markToDeleteCurrentPage,
    totalPages: markToDeleteTotalPages,
  } = usePaginator(paramsMarkToDelete);
  const currentPageMarkToDeleteParams = computed<Param[]>(() => {
    return paginatedMarkToDeleteParams.value![markToDeleteCurrentPage.value - 1];
  });
  const markParamsSyncIsLoading = ref(false);
  const markParamsSyncError = ref<ErrorMessage>('');
  const markParamToDelete = (param: Param) => {
    paramsMarkToDelete.value.push(param);
  };
  const unmarkParamFromDelete = (param: Param) => {
    param.status_delete = false;
    paramsMarkToDelete.value = paramsMarkToDelete.value.filter((value) => value !== param);
  };
  const syncMarkedParams = async () => {
    if (!hasToken.value || !paramsMarkToDelete.value.length) return;
    const accessToken = getAccessToken();
    try {
      markParamsSyncIsLoading.value = true;
      const headers = new AxiosHeaders();
      headers.set('Authorization', `Bearer ${accessToken}`);
      await apiUtils.post('parameters/to-delete/', paramsMarkToDelete.value, { headers });
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
