import { defineStore } from "pinia";
import useProfile from "./hooks/useProfile.ts";
import useToken from "./hooks/useToken.ts";
import { computed, watch } from "vue";
import useRegister from "./hooks/useRegister.ts";

const useUserStore = defineStore("userStore", () => {
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
