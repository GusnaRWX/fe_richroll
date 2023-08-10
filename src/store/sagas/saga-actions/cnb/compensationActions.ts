/* eslint-disable @typescript-eslint/ban-types */
import { post, get, del, put } from '@/utils/services';

interface CnbParams {
  page: number;
  itemPerPage: number;
  sort: string;
  direction: boolean;
  search: string;
  companyID: string | number;
}
// Get Table Data
export const getDataTable = (payload: CnbParams) => {
  const { page, itemPerPage, sort, direction, search, companyID } = payload;
  return get(`compensations?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}&companyID=${companyID}`);
};
// Get Compensation Component Option
export const getCompensationComponentOption = () => {
  return get(`compensation-components?page=1&itemPerPage=5`);
};
// Create New CNB Profile
export const postNewCnbProfile = (Payload: Object) => {
  return post(`compensations`, Payload);
};
// Delete CNB
export const deleteCnbProfile = (Id: string) => {
  return del(`compensations/${Id}`);
};
// Get Detail
export const getDetailCnb = (Id: string) => {
  return get(`compensations/${Id}`);
};
// Update CNB Profile
export const putCnbProfile = (Payload: Object, Id: number) => {
  return put(`compensations/${Id}`, Payload);
};
