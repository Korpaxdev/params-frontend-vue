import { ref } from "vue";
import { ErrorMessage } from "../../types/otherTypes.ts";
import apiUtils from "../../utils/apiUtils.ts";
import { RegisterForm } from "../../types/userTypes.ts";
import { DEFAULT_ERROR_MESSAGE, REGISTER_SUCCESS } from "../../utils/messagesConstants.ts";
import { AxiosError } from "axios";

const useRegister = () => {
  const isRegisterLoading = ref(false);
  const registerError = ref<ErrorMessage>("");
  const registerSuccess = ref("");

  const register = async (userData: RegisterForm) => {
    registerError.value = "";
    registerSuccess.value = "";
    try {
      isRegisterLoading.value = true;
      await apiUtils.post("users/register/", userData);
      isRegisterLoading.value = false;
      registerSuccess.value = REGISTER_SUCCESS;
    } catch (e) {
      if (e instanceof AxiosError) {
        registerError.value = e.response?.data ?? DEFAULT_ERROR_MESSAGE;
      }
      isRegisterLoading.value = false;
    }
  };
  const registerClearStatuses = () => {
    isRegisterLoading.value = false;
    registerError.value = "";
    registerSuccess.value = "";
  };
  return { isRegisterLoading, registerError, registerSuccess, register, registerClearStatuses };
};
export default useRegister;
