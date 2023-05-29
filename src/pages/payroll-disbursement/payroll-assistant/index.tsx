import React from 'react';
import PayrollAssistantContainer from '@/containers/payroll-assistant/PayrollAssistantContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function PayrollAssistant() {
  return (
    <>
      <MetaHead title='Kayaroll - Payroll Assistant' />
      <PayrollAssistantContainer />
    </>
  );
}