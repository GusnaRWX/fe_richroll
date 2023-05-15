import { post } from '@/utils/services';
import { Auth } from '@/types/authentication';

export const loginService = (payload: Auth.LoginPayload) => {
  return post('authentication/login', payload);
};

export const setNewPasswordEmployee = (payload: Auth.EmployeeSetNewPassword) => {
  return post('authentication/set-password', payload);
};