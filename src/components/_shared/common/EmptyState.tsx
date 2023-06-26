import React from 'react';
import { Image as Asset } from '@/utils/assetsConstant';
import Image from 'next/image';
import { Box, Grid } from '@mui/material';
import Text from './Text';

const EmptyState = () => {
  return (
    <Box padding='40px 0'>
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item md={12}>
          <Text title='There is no Entry' fontWeight={700} fontSize='20px' />
        </Grid>
        <Grid item>
          <Image
            src={Asset.EMPTY_STATE}
            alt='data-empty'
            height={266}
            width={400}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmptyState;