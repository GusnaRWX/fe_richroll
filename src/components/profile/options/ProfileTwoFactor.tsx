import { Card, Text } from '@/components/_shared/common';
import { Button } from '@/components/_shared/form';
import { Box } from '@mui/material';
import React from 'react';

const ProfileTwoFactor = () => {
  return (
    <Card
      sx={{
        padding: '10px 20px',
        mb: '20px'
      }}
    >
      <Box mb='17px'>
        <Text
          title='Two Factor Authentication'
          color='grey.600'
          variant='text-lg'
          fontWeight={700}
          sx={{ display: 'block' }}
        />
        <Text
          title='Add additional security to your account using two factor authentication.'
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Box mb='17px'>
        <Text
          title='You have not enabled two factor authentication.'
          color='grey.600'
          variant='text-base'
          fontWeight={700}
          sx={{ display: 'block' }}
        />
        <Text
          title={`When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.`}
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Button
        label='Enable'
        size='small'
        color='secondary'
        sx={{
          color: 'white',
          maxWidth: '77px'
        }}
      />
    </Card>
  );
};

export default ProfileTwoFactor;