import { post } from '@/utils/services';
import { workSchedule } from '@/types/workSchedule';


export const postSimulationEvent = (payload: workSchedule.InitialValuesWorkScheduleForm) => {
  return post('work-schedules/simulation', payload);
};

export const postCalculateEvent = (payload: workSchedule.PostCalculateEventPayloadType) => {
  return post('work-schedules/calculate', payload);
};

export const postWorkSchedule = (payload: workSchedule.PostWorkSchedulePayloadType) => {
  return post('work-schedules', payload);
};