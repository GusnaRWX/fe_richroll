import React from 'react';
import DisbursementGenerateContainer from '@/containers/payroll-disbursement/DisbursementGenerateContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Generate() {
  return (
    <>
      <MetaHead title='Kayaroll - Disbursement Generate' />
      <DisbursementGenerateContainer />
    </>
  );
}