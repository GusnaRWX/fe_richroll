import React from 'react';
import EmployeeDetailContainer from '@/containers/employees/EmployeeDetailContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Employee Details'/>
      <EmployeeDetailContainer />
    </>
  );
}

export default index;