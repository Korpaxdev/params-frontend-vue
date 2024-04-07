import useUserStore from "../stores/userStore.ts";
import { storeToRefs } from "pinia";
import router from "../routes/router.ts";
import { watch } from "vue";

const useNotAuthPermission = () => {
  const userStore = useUserStore();
  const { hasToken } = storeToRefs(userStore);
  const redirectCallBack = async () => {
    if (hasToken.value) {
      await router.replace({ name: "IndexPage", replace: true });
    }
  };
  watch(hasToken, redirectCallBack, { immediate: true });
};

export default useNotAuthPermission;
