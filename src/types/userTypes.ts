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
