import React from 'react';
import GenerateAttendanceContainer from '@/containers/attendance/GenerateAttendanceContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function GenerateAttendance() {
  return (
    <>
      <MetaHead title='Kayaroll - Generate Attendance' />
      <GenerateAttendanceContainer />
    </>
  );
}