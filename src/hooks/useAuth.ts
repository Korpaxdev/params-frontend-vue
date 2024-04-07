import { onBeforeMount, watch } from "vue";
import { hasTokenInStorage } from "../utils/tokenUtils.ts";
import useUserStore from "../stores/userStore.ts";
import { storeToRefs } from "pinia";

const useAuth = () => {
  const store = useUserStore();
  const { fetchProfile } = store;
  const { hasToken } = storeToRefs(store);
  watch(hasToken, async () => {
    if (hasToken.value) await fetchProfile();
  });

  onBeforeMount(async () => {
    hasToken.value = hasTokenInStorage();
  });
};
export default useAuth;
