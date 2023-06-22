import React from 'react';
import CreateNewProfileContainer from '@/containers/satutory-benefit/CreateNewProfileContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Satutory Benefit - Add Profile' />
      <CreateNewProfileContainer />
    </>
  );
}
