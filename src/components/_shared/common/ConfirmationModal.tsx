import React from 'react';
import {
  Modal,
  Box,
  IconButton,
  Typography,
  Button as MuiButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '543px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  paddingTop: '10px',
  p: 2,
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
  content: string;
  withCallback?: boolean;
  callback?: () => void;
  noChange?: boolean;
  forDeleteAction?: boolean;
}

function ConfirmationModal({
  open,
  handleClose,
  title,
  content,
  withCallback,
  callback,
  noChange,
  forDeleteAction,
}: ConfirmationModalProp) {
  const router = useRouter();
  const handleClick = () => {
    handleClose();
    if (!noChange) {
      router.back();
    }
    if (withCallback && callback) {
      callback();
    }
  };
  return (
    <Modal open={open} onClose={handleClose} keepMounted disableAutoFocus>
      <Box sx={modalStyle}>
        <ModalHeader>
          <Typography component='h5' fontWeight='bold'>
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </ModalHeader>
        <div style={{ paddingBottom: '1rem', paddingTop: '1rem' }}>
          <Typography component='span' fontSize='14px' color='#4B5563'>
            {content}
          </Typography>
        </div>
        <ModalFooter>
          <MuiButton variant='outlined' size='small' onClick={handleClose}>
            Cancel
          </MuiButton>
          {forDeleteAction ? (
            <MuiButton
              variant='contained'
              onClick={handleClick}
              size='small'
              color='red'
              sx={{ bgcolor: '#FECACA', color: '#DC2626' }}
            >
              Delete
            </MuiButton>
          ) : (
            <MuiButton
              variant='contained'
              onClick={handleClick}
              size='small'
              color='primary'
            >
              Confirm
            </MuiButton>
          )}
        </ModalFooter>
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;
