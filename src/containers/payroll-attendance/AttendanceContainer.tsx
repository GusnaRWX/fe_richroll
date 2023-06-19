import React from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import AttendanceComponent from '@/components/payroll-attendance/AttendanceComponent';

const AttendanceContainer = () => {
  return (
    <Layout>
      <AttendanceComponent />
    </Layout>);
};

export default AttendanceContainer;