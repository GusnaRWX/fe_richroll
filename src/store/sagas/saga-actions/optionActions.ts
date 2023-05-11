import { get } from '@/utils/services';
import { AxiosResponse } from 'axios';

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
  return get(`/administrative-third?page=1&itemPerPage=1000&country=${countryId}&firstLevelCode=${firstLevelCode}&thirdLevelCode=${secondLevelCode}`);
};

export const getBanks = (): Promise<AxiosResponse> => {
  return get('/banks');
}; 