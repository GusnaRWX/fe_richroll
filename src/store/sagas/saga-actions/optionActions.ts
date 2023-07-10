import { get } from '@/utils/services';
import { AxiosResponse } from 'axios';
import { getCompanyData } from '@/utils/helper';

export const getCountriesItem = () => {
  return get('/countries?page=1&itemPerPage=1000');
};

export const getAdministrativeFirstLevel = ({ countryId }): Promise<AxiosResponse<unknown>> => {
  return get(`/administrative-first?page=1&itemPerPage=1000&country=${countryId}`);
};

export const getAdministrativeSecondLevel = ({ countryId, firstLevelCode }): Promise<AxiosResponse<unknown>> => {
  return get(`/administrative-second?page=1&itemPerPage=1000&country=${countryId}&firstLevelCode=${firstLevelCode}`);
};

export const getAdministrativeThirdLevel = ({ countryId, firstLevelCode, secondLevelCode }): Promise<AxiosResponse<unknown>> => {
  return get(`/administrative-third?page=1&itemPerPage=1000&country=${countryId}&firstLevelCode=${firstLevelCode}&secondLevelCode=${secondLevelCode}`);
};

export const getBanks = (): Promise<AxiosResponse> => {
  return get('/banks?page=-1&itemPerPage=&sort=&direction=&search=');
};

export const getListDepartment = (): Promise<AxiosResponse> => {
  const data = getCompanyData();
  return get(`/departments?page=1&itemPerPage=10000&companyID=${data?.id}`);
};

export const getListPosition = ({ departmentID }): Promise<AxiosResponse> => {
  return get(`/positions?page=1&itemPerPage=10000&departmentID=${departmentID}`);
};

export const getCnb = (): Promise<AxiosResponse> => {
  const data = getCompanyData();
  return get(`compensations?page=1&itemPerPage=1000&companyID=${data?.id}`);
};

export const getListBaseCompensation = (): Promise<AxiosResponse> => {
  return get(`compensation-components?page=1&itemPerPage=10000&direction=DESC&isBase=true`);
};

export const getListSuppCompensation = (): Promise<AxiosResponse> => {
  return get(`compensation-components?page=1&itemPerPage=10000&direction=DESC&isBase=false`);
};

export const getListTermin = (payload: number): Promise<AxiosResponse> => {
  return get(`term-compensations?page=-1&itemPerPage=0&direction=DESC&componentID=${payload}`);
};

export const getListSuppTermin = (payload: number): Promise<AxiosResponse> => {
  return get(`term-compensations?page=-1&itemPerPage=0&direction=DESC&componentID=${payload}`);
};

export const getListWorkSchedule = (payload: number) => {
  return get(`work-schedules?page=-1&itemPerPage=&sort=&direction=&search=&companyID=${payload}`);
};