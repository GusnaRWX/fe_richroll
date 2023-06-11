import { get, patch } from '@/utils/services';
import { Employment } from '@/types/employment';

export const getDetailInformation = () => {
  return get('users/employees/information');
};

export const getDetailPersonalInfo = () => {
  return get('users/employees/personal');
};

export const getDetailEmergencyContact = () => {
  return get('users/employees/emergency');
};

export const getDetailCnb = () => {
  return get('users/employees/compensations');
};

export const getUserWorkSchedule = () => {
  return get('users/employees/work-schedules');
};

export const patchInformation = (payload) => {
  const { information } = payload;
  return patch('users/employee', information as Employment.PatchEmployeeInformation);
};

export const patchPersonalInfo = (payload) => {
  const { ...restPayload } = payload;
  return patch('users/employees/personal', restPayload);
};

export const patchEmergencyContact = (payload) => {
  const { ...restPayload } = payload;
  return patch('users/employees/emergency', restPayload as Employment.EmergencyContactValues);
};