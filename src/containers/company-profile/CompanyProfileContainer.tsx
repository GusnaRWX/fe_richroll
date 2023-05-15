import React, {useEffect} from 'react';
import CompanyProfileComponent from '@/components/company-profile/CompanyProfileComponent';
import Layout from '@/components/_shared/_core/layout/Index';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { companiesRequested } from '@/store/reducers/slice/company/companySlice';

function CompanyProfileContainer() {
  const dispatch = useAppDispatch();

  const selector = useAppSelectors(state => state.company.companies);

  useEffect(() => {
    dispatch({
      type: companiesRequested.toString()
    });
  }, []);

  return (
    <Layout>
      <CompanyProfileComponent companies={selector} />
    </Layout>
  );
}

export default CompanyProfileContainer;