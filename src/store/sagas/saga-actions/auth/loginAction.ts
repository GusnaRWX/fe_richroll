import { post } from '@/utils/services';
import { Auth } from '@/types/authentication';

export const loginService = (payload: Auth.LoginPayload) => {
  return post('authentication/login', payload);
};

export const setNewPasswordEmployee = (payload: Auth.EmployeeSetNewPassword) => {
  return post('authentication/set-password', payload);
};
export const postForgotPassword = (payload: string) => {
  return post('authentication/send-reset-password', payload);
};

export const postResetPassword = (payload: Auth.ResetPasswordPayload) => {
  return post('authentication/reset-password', payload);
};