import React from 'react';
import GenerateGrossDetailContainer from '@/containers/payroll/GenerateGrossDetailContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function GenerateGrossDetail() {
  return (
    <>
      <MetaHead title='Kayaroll - Generate Gross Payroll - Detail' />
      <GenerateGrossDetailContainer />
    </>
  );
}