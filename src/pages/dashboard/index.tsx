import React from 'react';
import DashboardContainer from '@/containers/dashboard/DashboardContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Kayaroll - Dashboard' />
      <DashboardContainer />
    </>
  );
}