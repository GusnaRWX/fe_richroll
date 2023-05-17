import { post, get } from "@/utils/services";
import axios, {AxiosHeaderValue} from "axios";
import { config } from "@config";
import { getStorage } from "@/utils/storage";

const service = axios.create({
  baseURL: config.API_URL || 'http://localhost',
  headers: {
    Authorization: {
      toString() {
        return `Bearer ${getStorage('accessToken')}`;
      }
    } as AxiosHeaderValue
  }
});

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
  return service.delete(`compensation_benefits/${Id}`);
};
