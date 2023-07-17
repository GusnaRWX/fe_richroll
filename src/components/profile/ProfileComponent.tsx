import React from 'react';
import ProfileInformation from './information/ProfileInformation';
import { Box, Container } from '@mui/material';
import { Text } from '../_shared/common';
import ProfileUpdatePassword from './update-password/ProfileUpdatePassword';
import ProfileTwoFactor from './options/ProfileTwoFactor';
import ProfileDeleteAccount from './options/ProfileDeleteAccount';


const ProfileComponent = () => {
  return (
    <Container maxWidth='lg'>
      <Box mb='24px'>
        <Text
          title='Profile'
          variant='text-2xl'
          color='grey.600'
          fontWeight={700}
        />
      </Box>
      <ProfileInformation />
      <ProfileUpdatePassword />
      <ProfileTwoFactor />
      <ProfileDeleteAccount />
    </Container>
  );
};

export default ProfileComponent;