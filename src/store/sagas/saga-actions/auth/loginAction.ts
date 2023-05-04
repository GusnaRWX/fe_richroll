import { post } from '@/utils/services';
import { Auth } from '@/types/authentication';

export const loginService = (payload: Auth.LoginPayload) => {
  return post('authentication/login', payload);
};