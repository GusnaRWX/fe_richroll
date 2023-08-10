import React from 'react';
import { Card, Text } from '@/components/_shared/common';
import { Box, Grid } from '@mui/material';
import { Input, Button, DatePicker } from '@/components/_shared/form';
import { useAppSelectors } from '@/hooks/index';
import { useFormik } from 'formik';
import { ifThenElse } from '@/utils/helper';
import dayjs from 'dayjs';

const ProfileInformation = () => {
  const { profile } = useAppSelectors(state => state.me);

  const formik = useFormik({
    initialValues: {
      fullName: ''
    },
    onSubmit: (_val) => {
      console.log(_val);
    }
  });

  return (
    <Card sx={{
      padding: '10px 20px',
      marginBottom: '20px'
    }}>
      <Box mb='17px'>
        <Text
          title='Profile Information'
          color='grey.600'
          variant='text-lg'
          fontWeight={700}
          sx={{ display: 'block' }}
        />
        <Text
          title={`Update your account's profile information and email address.`}
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        rowGap={2}
        mb='16px'
      >
        <Grid item xs={12} sm={5.9}>
          <Input
            size='small'
            fullWidth
            disabled
            customLabel='Email'
            name='email'
            value={profile.email}
          />
        </Grid>
        <Grid item xs={12} sm={5.9}>
          <Input
            size='small'
            fullWidth
            customLabel='Full Name'
            name='fullName'
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={5.9}>
          <DatePicker
            customLabel='Date of Birth'
            disabled
            value={ifThenElse(dayjs(profile.dateOfBirth).isValid(), dayjs(profile.dateOfBirth), null)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent='flex-end'
        mt='1.5rem'
      >
        <Grid>
          <Button
            label='Save'
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileInformation;