import { get, post, put, patch } from '@/utils/services';
import { Payroll } from '@/types/payroll';

export const getPayroll = (payload: Payroll.GetParams) => {
  const { page, itemPerPage, sort, direction, search, countryCode, companyID, workflow, status } = payload;
  const workflowArr = workflow === 'payroll' ? '&workflow=GROSS_PAYROLL&workflow=NET_PAYROLL' : `&workflow=${workflow}`; 
  return get(`payrolls?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&countryCode=${countryCode}&companyID=${companyID}${workflowArr}&status=${status}`);
};

export const getPayrollCompleted = (payload: Payroll.GetParamsCompleted) => {
  const { page, itemPerPage, sort, direction, search, companyID } = payload;
  return get(`payrolls/assistants?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&companyID=${companyID}`);
};

export const postPayroll = (payload) => {
  return post(`payrolls`, payload.data as Payroll.PostPayrollType);
};

export const putPayrollWorkflow = (payload) => {
  return put(`payrolls/${payload.id}`, payload.data as Payroll.WorkflowType);
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

export const postPayrollGrosses = (payload) => {
  return post(`payrolls/grosses`, payload);
};

export const getGenerateGrossEmployee = (payload) => {
  const { page, itemPerPage, sort, direction, countryCode, id } = payload;
  return get(`payrolls/${id}/grosses/employees?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&countryCode=${countryCode}`);
};

export const putGenerateGrosses = (payload) => {
  return put(`payrolls/${payload.id}/grosses/employees`, payload.body);
};

export const getPayrollGrosses = (payload: string) => {
  return get(`payrolls/${payload}/grosses`);
};
export const getDetailAttendance = (payload: Payroll.ParamsDetailAttendance) => {
  return get(`payrolls/${payload?.id}/attendances/${payload?.attendanceID}/employees/${payload?.employeeID}`);
};

export const putPayrollGrossesFinal = (payload) => {
  return patch(`payrolls/${payload.id}/grosses/final`, {});
};

export const putPayrollGrossesId = (payload) => {
  const { id, grossesId, body } = payload;
  return put(`payrolls/${id}/grosses/${grossesId}`, body);
};