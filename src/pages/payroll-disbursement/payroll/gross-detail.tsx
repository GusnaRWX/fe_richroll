import React from 'react';
import GrossDetailContainer from '@/containers/payroll/GrossDetailContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function GrossDetail() {
  return (
    <>
      <MetaHead title='Kayaroll - Gross Detail' />
      <GrossDetailContainer />
    </>
  );
}