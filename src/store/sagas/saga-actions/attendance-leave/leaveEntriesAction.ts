import { get, post, del, put } from '@/utils/services';
import { AttendanceLeave } from '@/types/attendanceLeave';
import { getCompanyData } from '@/utils/helper';

export const getLeaveEntries = (payload?: object) => {
  const { page, itemPerPage, sort = '', direction = '', search = '', companyID } = payload as AttendanceLeave.GetParams;
  return get(`leaves?page=${page || 1}&itemPerPage=${itemPerPage || 5}&sort=${sort || ''}&direction=${direction || ''}&search=${search ?? ''}&companyID=${companyID || getCompanyData()?.id}`);
};

export const postLeaveEntries = (payload: AttendanceLeave.PostLeave) => {
  return post('leaves', payload);
};

export const deleteLeaveEntries = (payload: string) => {
  return del(`leaves/${payload}`);
};

export const putLeaveEntries = (payload: AttendanceLeave.PutLeave) => {
  const { id, data } = payload;
  return put(`leaves/${id}`, data);
};