import React from 'react';
import CompanyProfileEditContainer from '@/containers/company-profile/CompanyProfileEditContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Edit Company Profile' />
      <CompanyProfileEditContainer />
    </>
  );
}

export default index;