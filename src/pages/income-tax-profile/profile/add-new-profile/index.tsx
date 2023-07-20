import React from 'react';
import ItpAddNewProfileContainer from '@/containers/income-tax-profile/ItpAddNewProfileContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const ItpProfile = () => {
  return (
    <>
      <MetaHead title='Income Tax Profile - Add New Profile' />
      <ItpAddNewProfileContainer />
    </>
  );
};

export default ItpProfile;