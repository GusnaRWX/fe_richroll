/* eslint-disable @typescript-eslint/ban-types */
import { post, get, patch, del } from '@/utils/services';

interface CnbParams {
  page: number;
  itemPerPage: number;
  sort: string;
  direction: boolean;
  search: string;
}
// Get Table Data
export const getDataTable = (payload: CnbParams) => {
  const { page, itemPerPage, sort, direction, search } = payload;
  return get(`compensations?page=${page}&itemPerPage=${itemPerPage}&sort=${sort}&direction=${direction}&search=${search}`);
};
// Get Compensation Component Option
export const getCompensationComponentOption = () => {
  return get(`compensation_components`);
};
// Create New CNB Profile
export const postNewCnbProfile = (Payload: Object) => {
  return post(`compensation_benefits`, Payload);
};
// Delete CNB
export const deleteCnbProfile = (Id: string) => {
  return del(`compensations/${Id}`);
};
// Get Detail
export const getDetailCnb = (Id: string) => {
  return get(`compensation_benefits/detail/${Id}`);
};
// Update CNB Profile
export const putCnbProfile = (Payload: Object, Id: number) => {
  return patch(`compensation_benefits/${Id}`, Payload);
};
