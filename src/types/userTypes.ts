export interface ProfileFormData {
  username: string;
  email: string;
}

export interface Profile extends ProfileFormData {
  id: number;
}

export interface RegisterForm extends ProfileFormData {
  password: string;
  passwordConfirm: string;
}

export interface ChangePasswordForm {
  old_password: string;
  new_password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AccessToken {
  access: string;
}

export interface Token extends AccessToken {
  refresh: string;
}

export interface PasswordResetSendEmailData {
  email: string;
}

export interface PasswordResetSendEmailResponse {
  email: string;
  message: string;
}

export interface PasswordResetCompleteData {
  new_password: string;
  password_confirm: string;
}
