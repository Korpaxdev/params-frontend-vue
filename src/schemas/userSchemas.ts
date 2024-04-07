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
  passwordConfirm: string()
    .required(REQUIRED_FIELD_ERROR)
    .oneOf([ref("password")], PASSWORD_CONFIRM_ERROR),
});
export const passwordChangeSchema = object({
  oldPassword: string().required(REQUIRED_FIELD_ERROR).matches(PASSWORD_REG_EXP, { message: PASSWORD_ERROR }),
  newPassword: string().required(REQUIRED_FIELD_ERROR).matches(PASSWORD_REG_EXP, { message: PASSWORD_ERROR }),
  passwordConfirm: string()
    .required(REQUIRED_FIELD_ERROR)
    .oneOf([ref("newPassword")], PASSWORD_CONFIRM_ERROR),
});
