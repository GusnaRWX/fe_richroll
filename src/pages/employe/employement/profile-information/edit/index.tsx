import React from 'react';
import EmploymentEditContainer from '@/containers/employe/EmploymentEditContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function edit() {
  return (
    <>
      <MetaHead title='Kayaroll - Employee Profile Edit'/>
      <EmploymentEditContainer />
    </>
  );
}

export default edit;