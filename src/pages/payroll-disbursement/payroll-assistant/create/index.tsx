import React from 'react';
import PayrollAssistantCreateContainer from '@/containers/payroll-assistant/PayrollAssistantCreateContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function PayrollAssistantCreate() {
  return (
    <>
      <MetaHead title='Kayaroll - Payroll Assistant Create' />
      <PayrollAssistantCreateContainer />
    </>
  );
}