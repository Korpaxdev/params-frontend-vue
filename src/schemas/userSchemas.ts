import { object, ref, string } from "yup";
import {
  EMAIL_FIELD_ERROR,
  PASSWORD_CONFIRM_ERROR,
  PASSWORD_ERROR,
  REQUIRED_FIELD_ERROR,
} from "../utils/messagesConstants.ts";

const PASSWORD_REG_EXP = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$`);

export const loginUserSchema = object({
  username: string().required(REQUIRED_FIELD_ERROR),
  password: string().required(REQUIRED_FIELD_ERROR),
});
export const profileSchema = object({
  username: string().required(REQUIRED_FIELD_ERROR),
  email: string().required(REQUIRED_FIELD_ERROR).email(EMAIL_FIELD_ERROR),
});
export const registerSchema = object({
  username: string().required(REQUIRED_FIELD_ERROR),
  email: string().required(REQUIRED_FIELD_ERROR).email(EMAIL_FIELD_ERROR),
  password: string().required(REQUIRED_FIELD_ERROR).matches(PASSWORD_REG_EXP, { message: PASSWORD_ERROR }),
  password_confirm: string()
    .required(REQUIRED_FIELD_ERROR)
    .oneOf([ref("password")], PASSWORD_CONFIRM_ERROR),
});
export const passwordChangeSchema = object({
  old_password: string().required(REQUIRED_FIELD_ERROR),
  new_password: string().required(REQUIRED_FIELD_ERROR).matches(PASSWORD_REG_EXP, { message: PASSWORD_ERROR }),
  password_confirm: string()
    .required(REQUIRED_FIELD_ERROR)
    .oneOf([ref("new_password")], PASSWORD_CONFIRM_ERROR),
});

export const passwordResetSendEmailSchema = object({
  email: string().required(REQUIRED_FIELD_ERROR).email(EMAIL_FIELD_ERROR),
});

export const passwordResetCompleteSchema = object({
  new_password: string().required(REQUIRED_FIELD_ERROR).matches(PASSWORD_REG_EXP, { message: PASSWORD_ERROR }),
  password_confirm: string()
    .required(REQUIRED_FIELD_ERROR)
    .oneOf([ref("new_password")], PASSWORD_CONFIRM_ERROR),
});
