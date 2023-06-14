import React from 'react';
import SatutoryBenefitComponentContainer from '@/containers/satutory-benefit/SatutoryBenefitComponentContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Satutory Benefit - Profile' />
      <SatutoryBenefitComponentContainer />
    </>
  );
}
