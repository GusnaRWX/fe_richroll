import React from 'react';
import EmployeeEditContainer from '@/containers/employees/EmployeeEditContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Edit Employee' />
      <EmployeeEditContainer />
    </>

  );
}

export default index;