import { post, get } from '@/utils/services';
import { Auth } from '@/types/authentication';
import { AxiosRequestHeaders } from 'axios';

export const postRegister = (payload: Auth.RegisterPayload) => {
  return post('authentication/register', payload);
};

export const sendEmail = (token: string) => {
  return get('authentication/send-email-verification', '', { 'Authorization': `Bearer ${token}`} as AxiosRequestHeaders );
};