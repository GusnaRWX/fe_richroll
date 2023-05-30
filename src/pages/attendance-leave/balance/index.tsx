import React from 'react';
import LeaveBalanceContainer from '@/containers/attendance-leave/LeaveBalanceContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Kayaroll - Leave Balance' />
      <LeaveBalanceContainer />
    </>
  );
}
