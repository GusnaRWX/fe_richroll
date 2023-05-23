import { get, post, patch } from '@/utils/services';
import { Company } from '@/types/company';

export const getCompaniesItem = () => {
  return get('/companies');
};

export const getCompanyTypeItem = () => {
  return get('/company_types');
};

export const getCompanySectorItem = () => {
  return get('/company_sectors');
};

export const getBankItem = () => {
  return get('/banks');
};

export const getPaymentMethodItem = () => {
  return get('/payment_methods');
};

export const getCompanyDetail = (payload: Company.CompanyDetailPayload) => {
  const {id} = payload;
  return get(`companies/${id}`);
};

export const postCompanyProfile = (payload: Company.CompanyProfilePayload) => {
  return post('companies', payload);
};

export const patchCompanyProfile = (payload: Company.CompanyParams) => {
  const {id, data} = payload;
  return patch(`companies/${id}`, data);
};