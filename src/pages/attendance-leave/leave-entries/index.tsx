import React from 'react';
import LeaveEntriesContainer from '@/containers/attendance-leave/LeaveEntriesContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const LeaveEntries = () => {
  return (
    <>
      <MetaHead title='Kayaroll - Attendance Leave Entries' />
      <LeaveEntriesContainer />
    </>
  );
};

export default LeaveEntries;