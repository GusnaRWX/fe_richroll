import React from 'react';
import GenerateNetContainer from '@/containers/payroll/GenerateNetContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function GenerateNet() {
  return (
    <>
      <MetaHead title='Kayaroll - Generate Net Payroll' />
      <GenerateNetContainer />
    </>
  );
}