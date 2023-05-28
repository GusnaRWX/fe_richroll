import { post, get } from '@/utils/services';
import { Employees } from '@/types/employees';

export const getEmployee = (payload: Employees.EmployeeParams) => {
  const { page, itemPerPage, sort, direction, search, isActive, companyID } = payload;
  return get(`employees?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&isActive=${isActive}&companyID=${companyID}`);
};

export const postEmployeeInfo = (payload: Employees.EmployeeInfoPayload) => {
  return post('employees/information', payload);
};

export const postEmergency = (payload) => {
  return post('employees/emergency', payload);
};

export const postPersonalInformation = (payload: Employees.PersonalInformationPayload | unknown) => {
  return post('employees/personal', payload);
};

export const getDetailEmployeeInformation = (payload: number | string) => {
  return get('employees/information/' + payload);
};

export const getDetailPersonalInformation = (payload: number | string) => {
  return get('employees/personal/' + payload);
};

export const getDetailCnb = (payload: number | string) => {
  return get('compensation_benefits/detail/' + payload);
};

export const postEmployeeCNB = (payload: Employees.CnbEmployeePayload) => {
  return post('employees/compensation-benefit', payload);
};

export const getEmployeeEmergencyDetail = (payload: string) => {
  return get(`employees/emergency/${payload}`);
};