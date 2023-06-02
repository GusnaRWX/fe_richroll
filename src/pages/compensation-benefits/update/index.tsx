import React from 'react';
import UpdateCNBContainer from '@/containers/cnb/UpdateCNBContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Kayaroll - Create Company Profile' />
      <UpdateCNBContainer />
    </>
  );
}
