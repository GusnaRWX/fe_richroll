import { Reducer, combineReducers } from '@reduxjs/toolkit';
import responserSlice from './slice/responserSlice';
import LoginSlice from './slice/auth/loginSlice';
import optionSlice from './slice/options/optionSlice';
import registerSlice from './slice/auth/registerSlice';
import meSlice from './slice/auth/meSlice';
import employeeSlice from './slice/company-management/employees/employeeSlice';
import companySlice from './slice/company/companySlice';
import cnbSlice from './slice/cnb/compensationSlice';
import departmentSlice from './slice/company-management/department/departmentSlice';
import workScheduleSlice from './slice/company-management/work-schedule/workScheduleSlice';
import annualScheduleSlice from './slice/company-management/annual-work-schedule/annualSchedule';
import employmentSlice from './slice/employment/employmentSlice';
import accountSlice from './slice/account-management/accountManagementSlice';
import attendanceEntriesSlice from './slice/attendance-leave/attendanceEntriesSlice';
import globalSlice from './slice/global/globalSlice';
import overtimeSlice from './slice/attendance-leave/overtimeSlice';
import leaveEntriesSlice from './slice/attendance-leave/leaveEntriesSlice';


const reducers: Reducer = combineReducers({
  responser: responserSlice,
  login: LoginSlice,
  option: optionSlice,
  register: registerSlice,
  me: meSlice,
  employee: employeeSlice,
  company: companySlice,
  compensation: cnbSlice,
  department: departmentSlice,
  workSchedule: workScheduleSlice,
  annualSchedule: annualScheduleSlice,
  employment: employmentSlice,
  account: accountSlice,
  attendanceEntries: attendanceEntriesSlice,
  global: globalSlice, // global state
  overtime: overtimeSlice,
  leaveEntries: leaveEntriesSlice
});

export default reducers;
