import { storeToRefs } from 'pinia';
import { watch } from 'vue';

import router from '../routes/router.ts';
import useParamsToServerStore from '../stores/paramsToServerStore.ts';

const useParamsToModifyPermission = () => {
  const paramsToServerStore = useParamsToServerStore();
  const { hasParamsToModify } = storeToRefs(paramsToServerStore);

  const redirectCallback = async () => {
    if (!hasParamsToModify.value) {
      await router.replace({ name: 'IndexPage', replace: true });
    }
  };

  watch(hasParamsToModify, redirectCallback, { immediate: true });
};
export default useParamsToModifyPermission;
