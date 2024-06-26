import { AxiosError } from 'axios';
import { ref } from 'vue';

import { AccessToken, LoginData, Token } from '../../types/userTypes.ts';
import apiUtils from '../../utils/apiUtils.ts';
import { DEFAULT_ERROR_MESSAGE } from '../../utils/messagesConstants.ts';
import {
  clearTokensInStorage,
  getRefreshToken,
  hasTokenInStorage,
  setAccessToken,
  setRefreshToken,
} from '../../utils/tokenUtils.ts';

const useToken = () => {
  const hasToken = ref(false);
  const tokenIsLoading = ref(false);
  const tokenError = ref<string>('');
  const fetchTokens = async (data: LoginData) => {
    try {
      tokenIsLoading.value = true;
      const res = await apiUtils.post<Token>('users/token/', data);
      const { access, refresh } = res.data;
      setAccessToken(access);
      setRefreshToken(refresh);
      hasToken.value = true;
      tokenIsLoading.value = false;
    } catch (e) {
      tokenIsLoading.value = false;
      if (e instanceof AxiosError) {
        tokenError.value = e.response?.data?.detail ?? DEFAULT_ERROR_MESSAGE;
      } else {
        tokenError.value = DEFAULT_ERROR_MESSAGE;
      }
    }
  };
  const clearTokens = () => {
    clearTokensInStorage();
    hasToken.value = false;
  };
  const updateAccessToken = async () => {
    if (!hasTokenInStorage()) {
      clearTokens();
    }
    try {
      const refreshToken = getRefreshToken();
      const res = await apiUtils.post<AccessToken>('users/token/refresh/', { refresh: refreshToken });
      setAccessToken(res.data.access);
      hasToken.value = true;
    } catch {
      clearTokens();
    }
  };
  return { hasToken, tokenIsLoading, tokenError, fetchTokens, clearTokens, updateAccessToken };
};
export default useToken;
