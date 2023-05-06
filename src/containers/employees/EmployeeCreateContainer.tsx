import React from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import EmployeeCreateComponent from '@/components/employees/create/EmployeeCreateComponent';

function EmployeeCreateContainer() {
  return (
    <Layout>
      <EmployeeCreateComponent />
    </Layout>
  );
}

export default EmployeeCreateContainer;