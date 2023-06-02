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
  return get('/banks');
};

export const getListDepartment = (): Promise<AxiosResponse> => {
  const data =  getCompanyData();
  return get(`/departments?page=1&itemPerPage=10000&companyID=${data?.id}`);
};

export const getListPosition = ({departmentID}): Promise<AxiosResponse> => {
  return get(`/positions?page=1&itemPerPage=10000&departmentID=${departmentID}`);
};

export const getCnb = (): Promise<AxiosResponse> => {
  const data =  getCompanyData();
  return get(`compensation_benefits/${data?.id}`);
};