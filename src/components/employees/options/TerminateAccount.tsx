import React, {useState} from 'react';
import { Card, Text, CustomModal } from '@/components/_shared/common';
import { Box } from '@mui/material';
import { Button } from '@/components/_shared/form';
import { BsTrashFill } from 'react-icons/bs';

const TerminateAccount = () => {
  const [leave, setLeave] = useState(false);
  const handleOpen = () => {
    setLeave(true);
  };

  const handleClose = () => {
    setLeave(false);
  };

  return (
    <Card
      sx={{
        padding: '10px 20px',
        mb: '20px',
        border:'1px solid #DC2626'
      }}
    >
      <Box mb='17px'>
        <Text
          title='Terminate Account'
          color='red.600'
          variant='text-lg'
          fontWeight={700}
          sx={{ display: 'block' }}
        />
        <Text
          title='Permanently termination this account.'
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Box mb='17px'>
        <Text
          title='Once this account is terminated, all of its resources and data will be permanently deleted. Before terminating this account, please make sure.'
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Button
        label='Terminate'
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
        onClick={() => handleOpen}
      />
      <CustomModal
      open={leave}
      handleClose={handleClose}
      title='Update Event'
      width='758px'
    />
    </Card>
  );
};

export default TerminateAccount;