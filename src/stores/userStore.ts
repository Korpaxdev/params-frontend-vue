import { defineStore } from "pinia";
import useProfile from "./hooks/useProfile.ts";
import useToken from "./hooks/useToken.ts";
import { computed } from "vue";
import useRegister from "./hooks/useRegister.ts";

const useUserStore = defineStore("userStore", () => {
  const tokenControls = useToken();
  const profileControls = useProfile();
  const registerControls = useRegister();
  const { clearTokens } = tokenControls;
  const { profile } = profileControls;
  const isAuthenticated = computed(() => !!profile.value);
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
