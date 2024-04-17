import { AxiosError, AxiosHeaders } from 'axios';
import { Ref, ref } from 'vue';

import { ErrorMessage } from '../../types/otherTypes.ts';
import {
  ChangePasswordForm,
  PasswordResetCompleteData,
  PasswordResetSendEmailData,
  PasswordResetSendEmailResponse,
  Profile,
  ProfileFormData,
} from '../../types/userTypes.ts';
import apiUtils from '../../utils/apiUtils.ts';
import {
  DEFAULT_ERROR_MESSAGE,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_RESET_SUCCESSFUL,
} from '../../utils/messagesConstants.ts';
import { getAccessToken } from '../../utils/tokenUtils.ts';

const useProfile = (hasToken: Ref<boolean>, updateAccessToken: () => Promise<void>) => {
  const profile = ref<Profile | null>(null);
  const profileIsLoading = ref(false);
  const profileUpdateError = ref<ErrorMessage>('');

  const passwordUpdateIsLoading = ref(false);
  const passwordUpdateError = ref<ErrorMessage>('');
  const passwordUpdateSuccess = ref('');

  const passwordResetIsLoading = ref(false);
  const passwordResetError = ref<ErrorMessage>('');
  const passwordResetSuccess = ref<string | string[]>('');
  const passwordResetCompleteIsLoading = ref(false);
  const passwordResetCompleteError = ref<ErrorMessage>('');
  const passwordResetCompleteSuccess = ref('');

  const fetchProfile = async () => {
    if (!hasToken.value) return;
    try {
      profileIsLoading.value = true;
      const accessToken = getAccessToken();
      const headers = new AxiosHeaders();
      headers.set('Authorization', `Bearer ${accessToken}`);
      const res = await apiUtils.get<Profile>('users/profile/', { headers });
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
      profileUpdateError.value = '';
      profileIsLoading.value = true;
      const accessToken = getAccessToken();
      const headers = new AxiosHeaders();
      headers.set('Authorization', `Bearer ${accessToken}`);
      const res = await apiUtils.patch<Profile>('users/profile/', profileData, { headers });
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
    passwordUpdateSuccess.value = '';
    passwordUpdateError.value = '';
    try {
      passwordUpdateIsLoading.value = true;
      const headers = new AxiosHeaders();
      const accessToken = getAccessToken();
      headers.set('Authorization', `Bearer ${accessToken}`);
      await apiUtils.post('users/password/change/', data, { headers });
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
  const passwordResetSendEmail = async (data: PasswordResetSendEmailData) => {
    const newData = { ...data, next: window.location.origin + '/password-reset/complete/' };
    passwordResetSuccess.value = '';
    passwordResetError.value = '';
    try {
      passwordResetIsLoading.value = true;
      const res = await apiUtils.post<PasswordResetSendEmailResponse>('users/password/reset/', newData);
      passwordResetSuccess.value = res.data.message.split('\n');
    } catch (e) {
      if (e instanceof AxiosError) {
        passwordResetError.value = e.response?.data ?? DEFAULT_ERROR_MESSAGE;
      }
    } finally {
      passwordResetIsLoading.value = false;
    }
  };
  const passwordResetComplete = async (data: PasswordResetCompleteData, token: string) => {
    passwordResetCompleteError.value = '';
    try {
      passwordResetCompleteIsLoading.value = true;
      const res = await apiUtils.post(`users/password/reset/complete/${token}/`, data);
      console.log(res.data);
      passwordResetCompleteSuccess.value = PASSWORD_RESET_SUCCESSFUL;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 404) {
          passwordResetCompleteError.value = PASSWORD_RESET_TOKEN_IS_INVALID;
        } else {
          passwordResetCompleteError.value = e.response?.data ?? DEFAULT_ERROR_MESSAGE;
        }
      }
    } finally {
      passwordResetCompleteIsLoading.value = false;
    }
  };
  return {
    profile,
    profileUpdateError,
    profileIsLoading,
    passwordUpdateIsLoading,
    passwordUpdateError,
    passwordUpdateSuccess,
    passwordResetIsLoading,
    passwordResetError,
    passwordResetSuccess,
    passwordResetCompleteIsLoading,
    passwordResetCompleteError,
    passwordResetCompleteSuccess,
    fetchProfile,
    updateProfile,
    changePassword,
    passwordResetSendEmail,
    passwordResetComplete,
  };
};
export default useProfile;
