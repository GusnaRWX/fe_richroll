import React, { useState } from 'react';
import { Card, Text } from '@/components/_shared/common';
import { Box, Grid } from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import { useAppSelectors, useForm } from '@/hooks/index';

const ProfileInformation = () => {
  const { profile } = useAppSelectors(state => state.me);

  const [initialState] = useState({
    fullName: ''
  });

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };

    if ('fullName' in fieldOfValues)
      temp.fullName = fieldOfValues.fullName;

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '');

    setErrors({
      ...temp
    });

  };

  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialState, true, validate);


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
            value={values.fullName}
            onChange={handleInputChange}
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