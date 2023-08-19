import React from 'react';
import CNBContainer from '@/containers/cnb/CNBContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Kayaroll - Compensation & Benefits' />
      <CNBContainer />
    </>
  );
}
