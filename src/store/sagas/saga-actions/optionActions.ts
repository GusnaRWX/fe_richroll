import { get } from '@/utils/services';

export const getCountriesItem = () => {
  return get('/countries?page=1&itemPerPage=1000');
};