import React from 'react';
import AttendanceGenerateContainer from '@/containers/payroll-attendance/AttendanceGenerateContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function AttendanceGenerate() {
  return (
    <>
      <MetaHead title='Kayaroll - Generate Attendance' />
      <AttendanceGenerateContainer />
    </>
  );
}