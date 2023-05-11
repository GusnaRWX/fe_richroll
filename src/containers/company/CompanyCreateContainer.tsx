import React, { useEffect } from 'react';
import CompanyCreateComponent from '@/components/company/create/CompanyCreateComponent';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { companyTypeRequested, companySectorRequested, bankRequested, paymentMethodRequested } from '@/store/reducers/slice/company/companySlice';

const CompanyContainer = () => {
  const dispatch = useAppDispatch();

  const companyType = useAppSelectors(state => state.company.companyType);
  const companySector = useAppSelectors(state => state.company.companySector);
  const bank = useAppSelectors(state => state.company.bank);
  const paymentMethod = useAppSelectors(state => state.company.paymentMethod);

  useEffect(() => {
    dispatch({
      type: companyTypeRequested.toString()
    });
    dispatch({
      type: companySectorRequested.toString()
    });
    dispatch({
      type: bankRequested.toString()
    });
    dispatch({
      type: paymentMethodRequested.toString()
    });
  }, []);

  return <CompanyCreateComponent companyType={companyType} companySector={companySector} bank={bank} paymentMethod={paymentMethod} />;
};

export default CompanyContainer;