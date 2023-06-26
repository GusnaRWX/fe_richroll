import React from 'react';
import { Box, Grid } from '@mui/material';
import Layout from '@/components/_shared/_core/layout/Index';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import { Image as Asset } from '@/utils/assetsConstant';
import { Text } from '@/components/_shared/common';
import Image from 'next/image';

export default function Index() {
  return (
    <>
      <MetaHead title='Kayaroll - Page Not Found' />
      <Layout>
        <Box sx={{
          margin: '0',
          position: 'absolute',
          top: '50%',
          left: '50%',
          msTransform: 'translateY(-50%)',
          transform: 'translateY(-50%)'
        }}>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
          >
            <Grid item md={12}>
              <Text
                title='Ouch.. There is something Wrong'
                fontSize='20px'
                fontWeight={700}
                color='#6B7280'
              />
            </Grid>
            <Grid item >
              <Image
                src={Asset.NOT_FOUND}
                alt='page-not-found'
                height={400}
                width={400}
              />
            </Grid>
            <Grid item>
              <Text
                title='The page are not found'
                fontSize='20px'
                fontWeight={700}
                color='#6B7280'
              />
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
}