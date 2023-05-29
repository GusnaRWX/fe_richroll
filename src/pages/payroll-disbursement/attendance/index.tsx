import React from 'react';
import PayrollAttendanceContainer from '@/containers/payroll-attendance/PayrollAttendanceContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function PayrollAttendance() {
  return (
    <>
      <MetaHead title='Kayaroll - Payroll Attendance' />
      <PayrollAttendanceContainer />
    </>
  );
}