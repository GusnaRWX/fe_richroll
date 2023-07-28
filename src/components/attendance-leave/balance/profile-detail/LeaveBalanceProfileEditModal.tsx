/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import { Button, Input } from '@/components/_shared/form';
import EditModalTable from './EditModalTable';
import { Close, Search } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';


const WrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const modalStyle = {
  width: '920px',
  height: '90%',
  bgcolor: 'background.paper',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  paddingTop: '10px',
  p: 2,
  display: 'flex',
  flexDirection: 'column',
};

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  gap: 1rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
`;

interface ConfirmationModalProp {
  open: boolean;
  handleClose: () => void;
  title: string;
}

function LeaveBalanceProfileEditModal({
  open,
  handleClose,
  title,
}: ConfirmationModalProp) {
  const router = useRouter();
  const submitRef = useRef();
  const employeeName = router.query.name;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        '.MuiModal-backdrop': {
          background: 'rgba(0,0,0,0.75)',
        },
      }}
      keepMounted
      disableAutoFocus
    >
      <Box sx={WrapperStyle}>
        <Box sx={modalStyle}>
          <ModalHeader>
            <Typography component='h5' fontWeight='bold'>
              {title}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </ModalHeader>
          <div style={{ flexGrow: '1', height: '1px', overflow: 'auto' }}>
            <Box
              sx={{
                display: 'flex',
                gap: '24px',
                mb: '24px',
                height: '20px',
                mt: '1rem',
              }}
            >
              <Typography
                style={{
                  color: '#9CA3AF',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom: '16px',
                }}
              >
                Employee Name
              </Typography>
              <Typography
                style={{
                  color: '#9CA3AF',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom: '16px',
                }}
              >
                :
              </Typography>
              <Typography
                style={{
                  color: '#4B5563',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom: '16px',
                }}
              >
                {employeeName}
              </Typography>
            </Box>
            <Input
              name='search'
              size='small'
              placeholder='Search'
              // onKeyDown={(e) => handleSearch(e)}
              type='text'
              sx={{ width: '320px', mb: '49px' }}
              InputProps={{
                startAdornment: <Search sx={{ color: '#9CA3AF' }} />,
              }}
            />
            <EditModalTable submitRef={submitRef} tabValue={0} />
          </div>
          <ModalFooter>
            <Button
              fullWidth={false}
              size='small'
              label='Close'
              color='primary'
              variant='outlined'
              onClick={() => handleClose()}
            />
            <Button
              fullWidth={false}
              size='small'
              label='Save'
              color='primary'
            />
          </ModalFooter>
        </Box>
      </Box>
    </Modal>
  );
}

export default LeaveBalanceProfileEditModal;
