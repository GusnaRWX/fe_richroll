import { Text } from '@/components/_shared/common';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const PersonalInformationEmergencyTabComponent = () => {
  return (
    <>
      <Typography component='h3' fontWeight='bold' fontSize={18} color='primary'>Emergency Contact</Typography>
      <Box sx={{ marginTop: '1rem', marginBottom: '2rem', width: '100%' }}>
        <Typography component='h3' fontWeight='bold' fontSize={18} color='primary'>Primary</Typography>
        <Grid container spacing={2} sx={{ marginTop: '.5rem', marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Full Name'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={'Sumanya'}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Relationship'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={'Parent'}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
            <Text
              title='Contact Number'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={'12313123123'}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: '2rem', width: '100%' }}>
        <Typography component='h3' fontWeight='bold' fontSize={18} color='primary'>Secondary</Typography>
        <Grid container spacing={2} sx={{ marginTop: '.5rem', marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Full Name'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={'Sumanya'}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Relationship'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={'Parent'}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
            <Text
              title='Contact Number'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title='1230131'
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonalInformationEmergencyTabComponent;