import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';

import useUserStore from '../stores/userStore.ts';
import { hasTokenInStorage } from '../utils/tokenUtils.ts';

const useAuth = () => {
  const store = useUserStore();
  const { fetchProfile } = store;
  const { hasToken } = storeToRefs(store);
  watch(hasToken, async () => {
    if (hasToken.value) await fetchProfile();
  });

  onMounted(async () => {
    hasToken.value = hasTokenInStorage();
  });
};
export default useAuth;
