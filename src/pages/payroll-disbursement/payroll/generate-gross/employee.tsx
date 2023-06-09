import React from 'react';
import GenerateGrossEmployeeContainer from '@/containers/payroll/GenerateGrossEmployeeContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function GenerateGrossEmployee() {
  return (
    <>
      <MetaHead title='Kayaroll - Generate Gross Payroll - Employee' />
      <GenerateGrossEmployeeContainer />
    </>
  );
}