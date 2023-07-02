import React from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import CNBComponent from '@/components/cnb';
import { OverlayLoading } from '@/components/_shared/common';
import { useAppSelectors } from '@/hooks/index';

const CNBContainer = () => {
  const { loading } = useAppSelectors(state => state.compensation);
  return (
    <Layout>
      <OverlayLoading open={loading} />
      <CNBComponent />
    </Layout>
  );
};

export default CNBContainer;
