import React from 'react';
import ItpProfileDetailContainer from '@/containers/income-tax-profile/ItpProfileDetailContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const ItpProfileDetail = () => {
  return (
    <>
      <MetaHead title='Income Tax Profile - Profile Dashboard' />
      <ItpProfileDetailContainer />
    </>
  );
};

export default ItpProfileDetail;