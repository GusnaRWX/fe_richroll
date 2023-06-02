import React from 'react';
import DepartmentContainer from '@/containers/department/DepartmentContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Department' />
      <DepartmentContainer />
    </>
  );
}

export default index;