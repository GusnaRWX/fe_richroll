/* eslint-disable @typescript-eslint/ban-types */
import { post, get, patch, del } from '@/utils/services';

// Get Table Data
export const getDataTable = (companyId: string) => {
  return get(`compensation_benefits/${companyId}`);
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
