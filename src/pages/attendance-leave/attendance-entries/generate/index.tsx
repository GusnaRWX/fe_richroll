import React from 'react';
import AttendanceEntriesGenerateContainer from '@/containers/attendance-entries/AttendanceEntriesGenerateContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function AttendanceEntriesGenerate() {
  return (
    <>
      <MetaHead title='Kayaroll - Generate Attendance Entries' />
      <AttendanceEntriesGenerateContainer />
    </>
  );
}