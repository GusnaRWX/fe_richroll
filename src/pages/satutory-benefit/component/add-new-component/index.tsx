import React from 'react';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import CreateNewComponentContainer from '@/containers/satutory-benefit/CreateNewComponentContainer';

export default function Index() {
  return (
    <>
      <MetaHead title='Satutory Benefit - Add Component' />
      <CreateNewComponentContainer />
    </>
  );
}
