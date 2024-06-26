import { post, get, del, patch } from '@/utils/services';
import { workSchedule } from '@/types/workSchedule';

export const getListWorkSchedule = (payload: workSchedule.WorkScheduleParams) => {
  const { page, itemPerPage, sort, direction, search, companyID } = payload;
  return get(`work-schedules?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&companyID=${companyID}`);
};

export const postSimulationEvent = (payload: workSchedule.InitialValuesWorkScheduleForm) => {
  return post('work-schedules/simulation', payload);
};

export const postCalculateEvent = (payload: workSchedule.PostCalculateEventPayloadType) => {
  return post('work-schedules/calculate', payload);
};

export const postWorkSchedule = (payload: workSchedule.PostWorkSchedulePayloadType) => {
  return post('work-schedules', payload);
};

export const getDetailWorkSchedule = (id: number) => {
  return get(`work-schedules/${id}`);
};

export const deleteWorkSchedule = (id: number) => {
  return del(`work-schedules/${id}`);
};

export const patchWorkSchedule = (payload) => {
  return patch(`work-schedules/${payload.id}`, payload.workSchedule);
};