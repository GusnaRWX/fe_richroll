import React from 'react';
import LeaveSummaryContainer from '@/containers/attendance-leave/LeaveSummaryContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Kayaroll - Attendance & Leave' />
      <LeaveSummaryContainer />
    </>
  );
}
