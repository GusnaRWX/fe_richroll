import React from 'react';
import { Card, Text } from '@/components/_shared/common';
import { Grid } from '@mui/material';
import { Button } from '@/components/_shared/form';
import { BsTrashFill } from 'react-icons/bs';

const EmployeeDeleteAccount = () => {
  return (
    <Card sx={{
      padding: '10px 20px',
      marginBottom: '20px'
    }}>
      <Grid container flexDirection='row' justifyContent='space-between' alignItems='baseline'>
        <Grid item xs={12} md={3.5}>
          <Text
            title='Delete Account'
            color='grey.600'
            variant='text-lg'
            fontWeight={700}
            sx={{ display: 'block' }}
          />
          <Text
            title='Permanently delete your account'
            color='grey.400'
            variant='text-base'
            fontWeight={400}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Text
            title='Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you with to retain'
            color='grey.400'
            variant='text-base'
            fontWeight={400}
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent='flex-end'
        mt='1.5rem'
      >
        <Grid item>
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
        </Grid>
      </Grid>
    </Card>
  );
};

export default EmployeeDeleteAccount;