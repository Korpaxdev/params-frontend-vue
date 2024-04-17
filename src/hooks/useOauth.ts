import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

import router from '../routes/router.ts';
import useUserStore from '../stores/userStore.ts';
import { setAccessToken, setRefreshToken } from '../utils/tokenUtils.ts';

const useOauth = () => {
  const { hasToken } = storeToRefs(useUserStore());
  onBeforeMount(async () => {
    const { access, refresh } = router.currentRoute.value.query;
    setAccessToken(access as string);
    setRefreshToken(refresh as string);
    hasToken.value = true;
    await router.replace({ name: 'IndexPage' });
  });
};
export default useOauth;
