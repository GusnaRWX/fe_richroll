import React from 'react';
import ItpEditProfileContainer from '@/containers/income-tax-profile/ItpEditProfileContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const ItpProfile = () => {
  return (
    <>
      <MetaHead title='Income Tax Profile - Edit Profile' />
      <ItpEditProfileContainer />
    </>
  );
};

export default ItpProfile;