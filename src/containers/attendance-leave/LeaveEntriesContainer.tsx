import React from 'react';
import LeaveEntriesComponent from '@/components/leave-entries/LeaveEntriesComponent';
import Layout from '@/components/_shared/_core/layout/Index';
import { useAppSelectors } from '@/hooks/index';
import { OverlayLoading } from '@/components/_shared/common';

const LeaveEntriesContainer = () => {
  const { loading } = useAppSelectors(state => state.leaveEntries);
  return (
    <Layout>
      <OverlayLoading open={loading} />
      <LeaveEntriesComponent />
    </Layout>
  );
};

export default LeaveEntriesContainer;