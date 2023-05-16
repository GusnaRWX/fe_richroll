import React from 'react';
import { Modal, CircularProgress, Box } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'transparent',
  borderRadius: '8px',
  paddingTop: '10px',
  display: 'flex',
  flexDIrection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  p:2
};

interface LoadingModalProps {
  open: boolean;
}

function OverlayLoading({open}: LoadingModalProps) {
  return (
    <Modal
      open={open}
      keepMounted
      disableAutoFocus
    >
      <Box sx={modalStyle}>
        <CircularProgress size={60}/>
      </Box>
    </Modal>
  );
}

export default OverlayLoading;