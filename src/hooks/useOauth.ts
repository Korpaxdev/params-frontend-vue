import router from "../routes/router.ts";
import { onBeforeMount } from "vue";
import { setAccessToken, setRefreshToken } from "../utils/tokenUtils.ts";
import useUserStore from "../stores/userStore.ts";
import { storeToRefs } from "pinia";

const useOauth = () => {
  const { hasToken } = storeToRefs(useUserStore());
  onBeforeMount(async () => {
    const { access, refresh } = router.currentRoute.value.query;
    setAccessToken(access as string);
    setRefreshToken(refresh as string);
    hasToken.value = true;
    await router.replace({ name: "IndexPage" });
  });
};
export default useOauth;
