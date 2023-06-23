import React from 'react';
import SatutoryBenefitProfileDetailContainer from '@/containers/satutory-benefit/SatutoryBenefitProfileDetailContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Satutory Benefit - Profile Detail' />
      <SatutoryBenefitProfileDetailContainer />
    </>
  );
}
