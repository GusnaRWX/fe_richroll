import { post, get } from '@/utils/services';
import { Employees } from '@/types/employees';

export const getEmployee = (payload: Employees.EmployeeParams) => {
  const { page, itemPerPage, sort, direction, search, status, companyID } = payload;
  return get(`employees?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&status=${status}&companyID=${companyID}`);
};

export const postEmployeeInfo = (payload: Employees.EmployeeInfoPayload) => {
  return post('employees/information', payload);
};

export const postEmergency = (payload) => {
  return post('employees/emergency', payload);
};

export const postPersonalInformation = (payload: Employees.PersonalInformationPayload) => {
  return post('employees/personal', payload);
};