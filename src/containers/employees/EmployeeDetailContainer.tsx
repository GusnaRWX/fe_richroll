import React from 'react';
import EmployeeDetailComponent from '@/components/employees/detail/EmployeeDetailComponent';
import Layout from '@/components/_shared/_core/layout/Index';

function EmployeeDetailContainer() {
  return (
    <Layout>
      <EmployeeDetailComponent />
    </Layout>
  );
}

export default EmployeeDetailContainer;