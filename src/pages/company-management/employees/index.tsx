import React from 'react';
import EmployeesContainer from '@/containers/employees/EmployeesContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Employee' />
      <EmployeesContainer />
    </>
  );
}

export default index;