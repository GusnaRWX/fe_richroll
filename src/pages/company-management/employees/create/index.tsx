import React from 'react';
import EmployeeCreateContainer from '@/containers/employees/EmployeeCreateContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Employees Create' />
      <EmployeeCreateContainer />
    </>
  );
}

export default index;