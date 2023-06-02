import React from 'react';
import DisbursementContainer from '@/containers/disbursement/DisbursementContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Disbursement() {
  return (
    <>
      <MetaHead title='Kayaroll - Disbursement' />
      <DisbursementContainer />
    </>
  );
}