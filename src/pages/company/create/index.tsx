import React from 'react';
import CompanyCreateContainer from '@/containers/company/CompanyCreateContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const CompanyCreate = () => {
  return (
    <>
      <MetaHead title='Kayaroll - Create Company' />
      <CompanyCreateContainer />
    </>
  );
};

export default CompanyCreate;