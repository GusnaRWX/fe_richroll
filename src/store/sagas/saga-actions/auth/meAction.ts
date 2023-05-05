import { get } from '@/utils/services';

export const getMeServices = () => {
  return get('authentication/me');
};