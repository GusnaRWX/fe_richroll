import { get, patch, put, post } from '@/utils/services';
import { Account } from '@/types/account';

interface EmployeeDeletionPayloadType {
  password: string
}

export const getAccount = (payload: Account.AccountParams) => {
  const { page, itemPerPage, sort, direction, search, status, searchType } = payload;
  return get(`admin/users?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&status=${status}&searchType=${searchType}`);
};

export const patchSuspensionAccount = (payload) => {
  return patch(`admin/users/${payload.id}/suspension`, payload.data as Account.PatcSuspension);
};

export const putDeleteAccount = (id: string) => {
  return put(`admin/users/${id}/delete`, null);
};

export const putReactivateAccount = (id: string) => {
  return put(`admin/users/${id}/reactivate`, null);
};

export const putEmployeeAccountDeletion = (payload: EmployeeDeletionPayloadType) => {
  return put('users/delete', payload);
};

export const postUserSuspend = (payload) => {
  return post(`admin/users/suspension`, payload.body as Account.BulkPatchSuspension);
};
