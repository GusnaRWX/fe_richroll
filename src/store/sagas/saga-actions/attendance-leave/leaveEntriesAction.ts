import { get } from '@/utils/services';
import { AttendanceLeave } from '@/types/attendanceLeave';

export const getLeaveEntries = (payload: AttendanceLeave.GetParams) => {
  const { page, itemPerPage, sort, direction, search, companyID } = payload;
  return get(`leaves?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&companyID=${companyID}`);
};