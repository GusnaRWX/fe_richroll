import React from 'react';
import AttendanceEntriesContainer from '@/containers/attendance-entries/AttendanceEntriesContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function AttendanceEntries() {
  return (
    <>
      <MetaHead title='Kayaroll - Attendance Entries' />
      <AttendanceEntriesContainer />
    </>
  );
}