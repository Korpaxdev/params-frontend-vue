import { Ref, ref } from "vue";
import { ChangePasswordForm, Profile, ProfileFormData } from "../../types/userTypes.ts";
import apiUtils from "../../utils/apiUtils.ts";
import { getAccessToken } from "../../utils/tokenUtils.ts";
import { AxiosError, AxiosHeaders } from "axios";
import { DEFAULT_ERROR_MESSAGE, PASSWORD_CHANGE_SUCCESS } from "../../utils/messagesConstants.ts";
import { ErrorMessage } from "../../types/otherTypes.ts";

const useProfile = (hasToken: Ref<boolean>, updateAccessToken: () => Promise<void>) => {
  const profile = ref<Profile | null>(null);
  const profileIsLoading = ref(false);
  const profileUpdateError = ref<ErrorMessage>("");

  const passwordUpdateIsLoading = ref(false);
  const passwordUpdateError = ref<ErrorMessage>("");
  const passwordUpdateSuccess = ref("");
  const fetchProfile = async () => {
    if (!hasToken.value) return;
    try {
      profileIsLoading.value = true;
      const accessToken = getAccessToken();
      const headers = new AxiosHeaders();
      headers.set("Authorization", `Bearer ${accessToken}`);
      const res = await apiUtils.get<Profile>("users/profile/", { headers });
      profile.value = res.data;
      profileIsLoading.value = false;
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401) {
        await updateAccessToken();
        await fetchProfile();
      }
      profileIsLoading.value = false;
    }
  };
  const updateProfile = async (profileData: ProfileFormData) => {
    try {
      profileUpdateError.value = "";
      profileIsLoading.value = true;
      const accessToken = getAccessToken();
      const headers = new AxiosHeaders();
      headers.set("Authorization", `Bearer ${accessToken}`);
      const res = await apiUtils.patch<Profile>("users/profile/", profileData, { headers });
      profile.value = res.data;
      profileIsLoading.value = false;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          await updateAccessToken();
          await updateProfile(profileData);
        } else {
          profileUpdateError.value = e.response?.data ?? DEFAULT_ERROR_MESSAGE;
        }
      }
      profileIsLoading.value = false;
    }
  };
  const changePassword = async (data: ChangePasswordForm) => {
    passwordUpdateSuccess.value = "";
    passwordUpdateError.value = "";
    try {
      passwordUpdateIsLoading.value = true;
      const headers = new AxiosHeaders();
      const accessToken = getAccessToken();
      headers.set("Authorization", `Bearer ${accessToken}`);
      await apiUtils.post("users/password/change/", data, { headers });
      passwordUpdateIsLoading.value = false;
      passwordUpdateSuccess.value = PASSWORD_CHANGE_SUCCESS;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          await updateAccessToken();
          await changePassword(data);
        } else {
          passwordUpdateError.value = e.response?.data ?? DEFAULT_ERROR_MESSAGE;
        }
        passwordUpdateIsLoading.value = false;
      }
    }
  };
  return {
    profile,
    profileUpdateError,
    profileIsLoading,
    passwordUpdateIsLoading,
    passwordUpdateError,
    passwordUpdateSuccess,
    fetchProfile,
    updateProfile,
    changePassword,
  };
};
export default useProfile;
