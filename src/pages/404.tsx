import React from 'react';
import { Typography } from '@mui/material';
import Layout from '@/components/_shared/_core/layout/Index';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Kayaroll - Page Not Found' />
      <Layout>
        <Typography variant='text-xl'>Page Not Found</Typography>
      </Layout>
    </>
  );
}