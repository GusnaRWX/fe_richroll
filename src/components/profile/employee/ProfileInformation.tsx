import React from 'react';
import { Card, Text } from '@/components/_shared/common';
import { Grid } from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import { useAppSelectors } from '@/hooks/index';
import { useFormik } from 'formik';

const ProfileInformation = () => {
  const { profile } = useAppSelectors(state => state.me);
  const formik = useFormik({
    initialValues: {
      name: profile?.name || '',
      email: profile?.email || ''
    },
    onSubmit: (val) => console.log(val)
  });


  return (
    <Card sx={{
      padding: '10px 20px',
      marginBottom: '20px'
    }}>
      <Grid container flexDirection='row' justifyContent='space-between' alignItems='baseline'>
        <Grid item xs={12} md={3.5}>
          <Text
            title='Account Information'
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
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container flexDirection='column' rowGap={2}>
            <Grid item>
              <Input
                customLabel='Name'
                fullWidth
                size='small'
                name='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              // placeholder=''
              />
            </Grid>
            <Grid item>
              <Input
                customLabel='Email Address'
                fullWidth
                size='small'
                name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              // placeholder=''
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent='flex-end' mt='1.5rem'>
        <Grid item>
          <Button
            label='Save'
          />
        </Grid>
      </Grid>
    </Card>
  );

};

export default ProfileInformation;