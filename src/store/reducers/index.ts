import { Reducer, combineReducers } from '@reduxjs/toolkit';
import responserSlice from './slice/responserSlice';
import LoginSlice from './slice/auth/loginSlice';
import optionSlice from './slice/options/optionSlice';
import registerSlice from './slice/auth/registerSlice';
import meSlice from './slice/auth/meSlice';
import employeeSlice from './slice/company-management/employees/employeeSlice';
import companySlice from './slice/company/companySlice';
import cnbSlice  from './slice/cnb/compensationSlice';
import departmentSlice from './slice/company-management/department/departmentSlice';
import workScheduleSlice from './slice/company-management/work-schedule/workScheduleSlice';
import annualScheduleSlice  from './slice/company-management/annual-work-schedule/annualSchedule';
import employmentSlice from './slice/employment/employmentSlice';


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
  employment: employmentSlice
});

export default reducers;
