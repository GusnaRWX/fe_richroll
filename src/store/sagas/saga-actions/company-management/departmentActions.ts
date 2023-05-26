import { post } from '@/utils/services';

export const postDepartment = (payload) => {
  return post('departments', payload);
};