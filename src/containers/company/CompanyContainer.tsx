import React, { useEffect } from 'react';
import CompanyComponent from '@/components/company/CompanyComponent';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { companiesRequested } from '@/store/reducers/slice/company/companySlice';

const CompanyContainer = () => {
  const dispatch = useAppDispatch();

  const selector = useAppSelectors(state => state.company.companies);

  useEffect(() => {
    dispatch({
      type: companiesRequested.toString()
    });
  }, []);

  return <CompanyComponent companies={selector} />;
};

export default CompanyContainer;