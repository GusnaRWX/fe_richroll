import React from 'react';
import ItpProfileContainer from '@/containers/income-tax-profile/ItpProfileContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const ItpProfile = () => {
  return (
    <>
      <MetaHead title='Income Tax Profile - Profile Dashboard' />
      <ItpProfileContainer />
    </>
  );
};

export default ItpProfile;