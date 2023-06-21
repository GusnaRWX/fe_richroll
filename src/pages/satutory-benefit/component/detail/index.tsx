import React from 'react';
import SatutoryBenefitComponentDetailContainer from '@/containers/satutory-benefit/SatutoryBenefitComponentDetailContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Satutory Benefit - Component Detail' />
      <SatutoryBenefitComponentDetailContainer />
    </>
  );
}
