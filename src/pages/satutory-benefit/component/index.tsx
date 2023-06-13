import React from 'react';
import SatutoryComponentContainer from '@/containers/satutory-benefit/SatutoryComponentContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Satutory Benefit - Component' />
      <SatutoryComponentContainer />
    </>
  );
}
