import React from 'react';
import CompanyContainer from '@/containers/company/CompanyContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const Company = () => {
  return (
    <>
      <MetaHead title='Kayaroll - Company' />
      <CompanyContainer />
    </>
  );
};

export default Company;