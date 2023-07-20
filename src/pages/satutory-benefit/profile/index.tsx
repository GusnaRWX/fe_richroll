import React from 'react';
import SatutoryBenefitProfileContainer from '@/containers/satutory-benefit/SatutoryBenefitProfileContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function SatutoryBenefitProfile() {
  return (
    <>
      <MetaHead title='Satutory Benefit - Profile Dashboard' />
      <SatutoryBenefitProfileContainer />
    </>
  );
}
