import React from 'react';
import CompanyProfileContainer from '@/containers/company-profile/CompanyProfileContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Company Profile' />
      <CompanyProfileContainer />
    </>
  );
}

export default index;