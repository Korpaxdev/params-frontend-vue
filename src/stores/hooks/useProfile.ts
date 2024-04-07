import { ref } from "vue";
import { Profile, ProfileFormData } from "../../types/userTypes.ts";
import apiUtils from "../../utils/apiUtils.ts";
import { getAccessToken } from "../../utils/tokenUtils.ts";
import { AxiosError, AxiosHeaders } from "axios";
import useToken from "./useToken.ts";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/messagesConstants.ts";

const useProfile = () => {
  const tokenStore = useToken();
  const { updateAccessToken } = tokenStore;
  const profile = ref<Profile | null>(null);
  const profileIsLoading = ref(false);
  const profileUpdateError = ref("");
  const fetchProfile = async () => {
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
  return { profile, profileUpdateError, profileIsLoading, fetchProfile, updateProfile };
};
export default useProfile;
