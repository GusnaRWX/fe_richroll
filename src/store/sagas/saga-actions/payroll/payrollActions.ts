import { get, post } from '@/utils/services';
import { Payroll } from '@/types/payroll';

export const getPayroll = (payload: Payroll.GetParams) => {
  const { page, itemPerPage, sort, direction, search, countryCode, companyID, workflow, status } = payload;
  return get(`payrolls?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&countryCode=${countryCode}&companyID=${companyID}&workflow=${workflow}&status=${status}`);
};

export const postPayroll = (payload: Payroll.PostPayrollType) => {
  return post(`payrolls`, payload);
};

export const getGenerateGross = (payload: Payroll.GetParams) => {
  const { page, itemPerPage, sort, direction, countryCode } = payload;
  return get(`payrolls/1/grosses?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&countryCode=${countryCode}`);
};