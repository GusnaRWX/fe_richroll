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

export const postEmployeeCNB = (payload) => {
  const { employeeID, data } = payload;
  return post(`employees/${employeeID as string}/compensations`, data as Employees.CnbEmployeePayload);
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

export const getDetailWorkSchedule = (payload) => {
  return get(`work-schedules/${payload}/`);
};

export const getViewWorkSchedule = (payload) => {
  return get(`employees/${payload}/work-schedules`);
};

export const postSimulationEvent = (payload: Employees.InitialValuesWorkScheduleForm) => {
  return post('work-schedules/simulation', payload);
};

export const postCalculateEvent = (payload: Employees.PostCalculateEventPayloadType) => {
  return post('work-schedules/calculate', payload);
};

export const postWorkSchedule = (payload) => {
  return post(`employees/${payload?.id}/work-schedules`, payload?.workSchedule);
};

export const postTerminateEmployee = (payload) => {
  const { employeeID, data } = payload;
  return post(`employees/${employeeID as string}/compensations`, data as Employees.PostTerminateEmployee);
};
