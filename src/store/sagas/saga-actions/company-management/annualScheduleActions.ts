import { post, get, del, patch } from '@/utils/services';
import { AnnualWorkSchedule } from '@/types/annualWorkSchedule';
import { getCompanyData } from '@/utils/helper';

export const getListAnnualSchedule = (payload: AnnualWorkSchedule.AnnualScheduleParams) => {
  const { page, itemPerPage, sort, direction, search, start, companyID, end} = payload;
  return get(`annual-work-calendars?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&companyID=${companyID}&search=${search}&start=${start}&end=${end}`);
};

export const postAnnualSchedule = (payload: AnnualWorkSchedule.PayloadSagaAnnualSchedule) => {
  return post('annual-work-calendars', payload);
};

export const updateAnnualSchedule = (payload) => {
  return patch(`annual-work-calendars/${payload.id}`, payload.data as AnnualWorkSchedule.PayloadSagaAnnualSchedule);
};

export const getViewAnnualSchedule = (id: number) => {
  return get(`annual-work-calendars/${id}`);
};

export const deleteAnnualSchedule = (id: number) => {
  return del(`annual-work-calendars/${id}`);
};

export const getListEventSchedule = () => {
  return get(`annual-work-calendars?page=1&itemPerPage=10000000&sort=&direction=DESC&companyID=${getCompanyData()?.id}&search=&start=&end=`);
};