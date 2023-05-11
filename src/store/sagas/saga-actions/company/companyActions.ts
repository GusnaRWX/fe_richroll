import { get } from '@/utils/services';

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