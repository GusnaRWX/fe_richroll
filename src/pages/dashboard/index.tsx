import DashboardContainer from '@/containers/dashboard/DashboardContainer';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function Index() {
  const {data} = useSession();
  console.log(data, 'data here');
  return <DashboardContainer />;
}