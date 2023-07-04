import React from 'react';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import EditNewProfileContainer from '@/containers/satutory-benefit/EditNewProfileContainer';

export default function Index() {
  return (
    <>
      <MetaHead title='Satutory Benefit - Profile Edit' />
      <EditNewProfileContainer />
    </>
  );
}
