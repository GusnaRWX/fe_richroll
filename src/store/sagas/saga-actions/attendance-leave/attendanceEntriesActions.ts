import { get, post, put, del } from '@/utils/services';
import { AttendanceLeave } from '@/types/attendanceLeave';

export const getAttendanceEntries = (payload: AttendanceLeave.GetParams) => {
  const { page, itemPerPage, sort, direction, search, companyID } = payload;
  return get(`attendances?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&companyID=${companyID}`);
};

export const postAttendanceEntries = (payload: AttendanceLeave.PostAttendance) => {
  return post(`attendances`, payload);
};

export const putAttendanceEntries = (payload) => {
  return put(`attendances?id=${payload.id}`, payload.data as AttendanceLeave.PutAttendance);
};

export const delAttendanceEntries = (id:string) => {
  return del(`attendances/${id}`);
};
