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

export const patchCompanyProfile = (payload: Company.CompanyParams) => {
  const { id, data } = payload;
  return patch(`companies/${id}`, data);
};

export const postCompanyPayments = (id: string, payload: object) => {
  return post(`companies/${id}/payments`, payload);
};