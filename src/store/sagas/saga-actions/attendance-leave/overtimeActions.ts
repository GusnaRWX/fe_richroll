import { get, post, put, del } from '@/utils/services';
import { AttendanceLeave } from '@/types/attendanceLeave';


export const getOvertime = (payload: AttendanceLeave.GetParams) => {
  const { page, itemPerPage, sort, direction, search, companyID } = payload;
  return get(`overtimes?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&companyID=${companyID}`);
};

export const postOvertime = (payload: AttendanceLeave.PostOvertime) => {
  return post(`overtimes`, payload);
};

export const putOvertime = (payload) => {
  return put(`overtimes/${payload.id}`, payload.data as AttendanceLeave.PutOvertime);
};

export const deleteOvertime = (id: string) => {
  return del(`overtimes/${id}`);
};