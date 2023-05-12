import React from 'react';
import EmployeesComponent from '@/components/employees/EmployeesComponent';
import Layout from '@/components/_shared/_core/layout/Index';


function EmployeesContainer() {
  return (
    <Layout>
      <EmployeesComponent />
    </Layout>
  );
}

export default EmployeesContainer;