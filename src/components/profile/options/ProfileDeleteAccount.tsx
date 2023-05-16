import React from 'react';
import { Card, Text } from '@/components/_shared/common';
import { Box } from '@mui/material';
import { Button } from '@/components/_shared/form';
import { BsTrashFill } from 'react-icons/bs';

const ProfileDeleteAccount = () => {
  return (
    <Card
      sx={{
        padding: '10px 20px',
        mb: '20px'
      }}
    >
      <Box mb='17px'>
        <Text
          title='Delete Account'
          color='red.600'
          variant='text-lg'
          fontWeight={700}
          sx={{ display: 'block' }}
        />
        <Text
          title='Permanently delete your account.'
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Box mb='17px'>
        <Text
          title='Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.'
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Button
        label='Delete Account'
        size='small'
        sx={{
          color: '#DC2626',
          background: '#FECACA',
          maxWidth: '159px',
          ':hover': {
            color: '#DC2626',
            background: '#FECACA',
          }
        }}
        startIcon={<BsTrashFill size={12} />}
      />
    </Card>
  );
};

export default ProfileDeleteAccount;