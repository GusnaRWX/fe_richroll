import React from 'react';
import PayrollAssistantViewContainer from '@/containers/payroll-assistant/PayrollAssistantViewContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function PayrollAssistantView() {
  return (
    <>
      <MetaHead title='Kayaroll - Payroll Assistant View' />
      <PayrollAssistantViewContainer />
    </>
  );
}