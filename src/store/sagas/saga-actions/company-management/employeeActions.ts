import { post, get } from '@/utils/services';
import { Employees } from '@/types/employees';

export const getEmployee = (payload: Employees.EmployeeParams) => {
  const {page, itemPerPage, sort, direction, search, status} = payload;
  return get(`employee?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&status=${status}`);
};

export const postEmployeeInfo = (payload: Employees.EmployeeInfoPayload) => {
  return post('employee/information', payload);
};