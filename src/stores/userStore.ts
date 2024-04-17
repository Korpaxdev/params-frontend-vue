import { defineStore } from 'pinia';
import { computed, watch } from 'vue';

import useProfile from './hooks/useProfile.ts';
import useRegister from './hooks/useRegister.ts';
import useToken from './hooks/useToken.ts';

const useUserStore = defineStore('userStore', () => {
  const tokenControls = useToken();
  const { clearTokens, hasToken, updateAccessToken } = tokenControls;
  const profileControls = useProfile(hasToken, updateAccessToken);
  const { profile } = profileControls;
  const registerControls = useRegister();
  const isAuthenticated = computed(() => !!profile.value);

  watch(hasToken, () => {
    if (!hasToken.value) {
      logout();
    }
  });
  const logout = () => {
    profile.value = null;
    clearTokens();
  };
  return {
    ...tokenControls,
    ...profileControls,
    ...registerControls,
    isAuthenticated,
    logout,
  };
});
export default useUserStore;
