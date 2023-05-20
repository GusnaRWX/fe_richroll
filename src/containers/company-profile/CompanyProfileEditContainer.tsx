import React, {useEffect} from 'react';
import CompanyEditComponent from '@/components/company-profile/edit/CompanyEditComponent';
import Layout from '@/components/_shared/_core/layout/Index';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { companyTypeRequested, companySectorRequested, bankRequested, paymentMethodRequested, getCompanyDetailRequested } from '@/store/reducers/slice/company/companySlice';
import { countriesRequested } from '@/store/reducers/slice/options/optionSlice';
import { getCompanyData } from '@/utils/helper';

function CompanyProfileEditContainer() {
  const dispatch = useAppDispatch();
  const companyData = getCompanyData();

  const companyType = useAppSelectors(state => state.company.companyType);
  const companySector = useAppSelectors(state => state.company.companySector);
  const bank = useAppSelectors(state => state.company.bank);
  const paymentMethod = useAppSelectors(state => state.company.paymentMethod);
  const { countries } = useAppSelectors(state => state.option);
  const data = useAppSelectors(state => state.company.detail);

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
    dispatch({
      type: countriesRequested.toString()
    });
    dispatch({
      type: getCompanyDetailRequested.toString(),
      payload: {
        id: companyData?.id
      }
    });
  }, []);
  return (
    <Layout>
      <CompanyEditComponent detail={data} companyType={companyType} companySector={companySector} bank={bank} paymentMethod={paymentMethod} countries={countries} />
    </Layout>
  );
}

export default CompanyProfileEditContainer;