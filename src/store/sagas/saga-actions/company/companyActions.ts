import { get, post, patch } from '@/utils/services';
import { Company } from '@/types/company';

export const getCompaniesItem = () => {
  return get('/companies');
};

export const getCompanyTypeItem = () => {
  return get('/company_sectors');
};

export const getCompanySectorItem = () => {
  return get('/company_types');
};

export const getBankItem = () => {
  return get('/banks');
};

export const getPaymentMethodItem = () => {
  return get('/payment_methods');
};

export const postCompanyProfile = (payload: Company.CompanyProfilePayload) => {
  return post('companies', payload);
};

export const postCompanyDetail = (payload: Company.CompanyDetailPayload) => {
  return post('companies/detail', payload);
};

export const patchCompanyProfile = (payload: Company.CompanyParams) => {
  const {id, data} = payload;
  return patch(`companies/${id}`, data);
};