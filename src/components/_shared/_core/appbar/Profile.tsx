import React from 'react';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import { IconButton } from '@/components/_shared/form';
import ExpandLess from '@mui/icons-material/ExpandLess';

const Profile = () => {
  return (
    <Grid
      container
      alignItems='center'
      gap={1.2}
    >
      <Grid item>
        <Image
          src={ImageType.EXAMPLE_USER}
          height={32}
          width={32}
          alt='current-user'
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction='column'
        >
          <Grid item>
            <Typography
              fontSize={14}
              fontWeight={700}
            >
              Hi, Budi
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              fontSize={12}
            >
              HR Admin
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <IconButton icons={<ExpandLess />} />
      </Grid>
    </Grid>
  );
};

export default Profile;