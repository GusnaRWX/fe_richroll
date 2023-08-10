import React from 'react';
import NetDetailContainer from '@/containers/payroll/NetDetailContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function NetDetail() {
  return (
    <>
      <MetaHead title='Kayaroll - Net Detail' />
      <NetDetailContainer />
    </>
  );
}