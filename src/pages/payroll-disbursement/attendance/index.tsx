import React from 'react';
import AttendanceContainer from '@/containers/attendance/AttendanceContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Attendance() {
  return (
    <>
      <MetaHead title='Kayaroll - Attendance' />
      <AttendanceContainer />
    </>
  );
}