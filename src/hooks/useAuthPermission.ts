import useUserStore from "../stores/userStore.ts";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import router from "../routes/router.ts";

const useAuthPermission = () => {
  const userStore = useUserStore();
  const { hasToken } = storeToRefs(userStore);
  const redirectCallBack = async () => {
    if (!hasToken.value) {
      await router.replace({ name: "LoginPage" });
    }
  };

  watch(hasToken, redirectCallBack, { immediate: true });
};

export default useAuthPermission;
