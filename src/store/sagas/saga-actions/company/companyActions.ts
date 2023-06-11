import { get, post, patch } from '@/utils/services';
import { Company } from '@/types/company';

export const getCompaniesItem = () => {
  return get('/companies?page=-1');
};

export const getCompanyTypeItem = () => {
  return get('/company_types?page=-1');
};

export const getCompanySectorItem = () => {
  return get('/company_sectors?page=-1');
};

export const getBankItem = () => {
  return get('/banks?page=-1');
};

export const getPaymentMethodItem = () => {
  return get('/payment_methods?page=-1');
};

export const getCompanyDetail = (payload: Company.CompanyDetailPayload) => {
  const { id } = payload;
  return get(`companies/${id}`);
};

export const postCompanyProfile = (payload: object) => {
  return post('companies', payload);
};

export const patchCompanyProfile = (payload: { id: string, companyProfile: object }) => {
  // const { id, data } = payload;
  return patch(`companies/${payload.id}`, payload.companyProfile);
};

export const postCompanyPayments = (id: string, payload: object) => {
  return post(`companies/${id}/payments`, payload);
};

export const getCompanyPayments = (id: string | number) => {
  return get(`companies/${id}/payments`);
};

export const patchCompanyPayments = (id: string | number, payload: object) => {
  return patch(`companies/${id}/payments`, payload);
};