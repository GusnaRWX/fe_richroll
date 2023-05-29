import React from 'react';
import PayrollContainer from '@/containers/payroll/PayrollContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Payroll() {
  return (
    <>
      <MetaHead title='Kayaroll - Payroll' />
      <PayrollContainer />
    </>
  );
}