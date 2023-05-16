import { post, get } from "@/utils/services";

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
