import { post, get, patch } from '@/utils/services';
import { Employees } from '@/types/employees';

export const getEmployee = (payload: Employees.EmployeeParams) => {
  const { page, itemPerPage, sort, direction, search, isActive, companyID } = payload;
  return get(`employees?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&isActive=${isActive}&companyID=${companyID}`);
};

export const postEmployeeInfo = (payload: Employees.EmployeeInfoPayload) => {
  return post('employees', payload);
};

export const postEmergency = (payload) => {
  const { employeeID, ...restPayload } = payload;
  return post(`employees/${employeeID}/emergency`, restPayload);
};

export const postPersonalInformation = (payload) => {
  const { employeeID, ...restPayload } = payload;
  return post(`employees/${employeeID as string}/personal`, restPayload as Employees.PersonalInformationPayload);
};

export const getDetailEmployeeInformation = (payload: number | string) => {
  return get(`employees/${payload}/information`);
};

export const getDetailPersonalInformation = (payload: number | string) => {
  return get(`employees/${payload}/personal`);
};

export const getDetailCnb = (payload: number | string) => {
  return get('compensation_benefits/detail/' + payload);
};

export const postEmployeeCNB = (payload: Employees.CnbEmployeePayload) => {
  return post('employees/compensation-benefit', payload);
};

export const getEmployeeEmergencyDetail = (payload: string) => {
  return get(`employees/${payload}/emergency`);
};

export const patchEmployeeInformation = (payload) => {
  const { employeeID, information } = payload;
  return patch(`employees/${employeeID}`, information as Employees.PatchEmployeeInformation);
};

export const patchEmergencyContact = (payload) => {
  const { employeeID, ...restPayload } = payload;
  console.log(restPayload);
  return patch(`employees/${employeeID}/emergency`, restPayload as Employees.EmergencyContactValues);
};

export const patchEmployeePersonal = (payload) => {
  const { employeeID, ...restPayload } = payload;
  return patch(`employees/${employeeID}/personal`, restPayload);
};