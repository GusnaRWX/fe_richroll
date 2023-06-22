import React from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import AttendanceEntriesComponent from '@/components/attendance-entries/AttendanceEntriesComponent';

const AttendanceEntriesContainer = () => {
  return (
    <Layout>
      <AttendanceEntriesComponent />
    </Layout>);
};

export default AttendanceEntriesContainer;