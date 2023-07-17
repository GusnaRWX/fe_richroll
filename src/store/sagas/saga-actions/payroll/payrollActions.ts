import { get, post } from '@/utils/services';
import { Payroll } from '@/types/payroll';

export const getPayroll = (payload: Payroll.GetParams) => {
  const { page, itemPerPage, sort, direction, search, countryCode, companyID, workflow, status } = payload;
  return get(`payrolls?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&countryCode=${countryCode}&companyID=${companyID}&workflow=${workflow}&status=${status}`);
};

export const postPayroll = (payload) => {
  return post(`payrolls`, payload.data as Payroll.PostPayrollType);
};

export const getGenerateGross = (payload: Payroll.GetParams) => {
  const { page, itemPerPage, sort, direction, countryCode } = payload;
  return get(`payrolls/1/grosses?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&countryCode=${countryCode}`);
};

export const getDetailPayroll = (payload) => {
  const { id } = payload;
  return get(`payrolls/${id}`);
};

export const postPayrollAttendance = (payload) => {
  return post(`payrolls/${payload?.id}/attendances`, payload?.attendance as Payroll.PostPayrollAttendanceType);
};

export const postSelectedEmployee = (payload) => {
  const { id, selectEmployee } = payload;
  return post(`payrolls/${id}/attendances`, selectEmployee as Payroll.PostPayrollAttendanceType);
};

export const getSelectedEmployee = (payload: Payroll.ParamsSelectedEmployee) => {
  const { page, itemPerPage, sort, direction, search, countryCode, payrollID } = payload;
  return get(`payrolls/${payrollID}/attendances?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&countryCode=${countryCode}`);
};