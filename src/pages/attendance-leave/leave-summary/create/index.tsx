import React from 'react';
import CreateLeaveSummaryContainer from '@/containers/attendance-leave/CreateLeaveApplicationContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Kayaroll - Create Leave Application' />
      <CreateLeaveSummaryContainer />
    </>
  );
}
