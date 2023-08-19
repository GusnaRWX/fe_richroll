import React from 'react';
import CreateCNBContainer from '@/containers/cnb/CreateCNBContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Kayaroll - Create Compensation & Benefits' />
      <CreateCNBContainer />
    </>
  );
}
