import React from 'react';
import { Modal, Box, IconButton, Typography, Button as MuiButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import styled from '@emotion/styled';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  paddingTop: '10px',
  p:2
};

const ModalHeader = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 margin: 0;
 border-bottom: 1px solid #E5E7EB;
 padding-bottom: .5rem;
`;

const ModalFooter = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
margin: 0;
gap: 1rem;
border-top: 1px solid #E5E7EB;
 padding-top: 1rem;
`;


interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  children;
  width: string;
}


function CustomModal({open, handleClose, handleConfirm, title, children, width}: CustomModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      keepMounted
      disableAutoFocus
    >
      <Box sx={modalStyle} width={width}>
        <ModalHeader>
          <Typography component='h5' fontWeight='bold'>{title}</Typography>
          <IconButton
            onClick={handleClose}
          ><Close /></IconButton>
        </ModalHeader>
        {children}
        <ModalFooter>
          <MuiButton variant='outlined' size='small' onClick={handleClose}>Cancel</MuiButton>
          <MuiButton variant='contained' onClick={handleConfirm} size='small' color='primary'>Confirm</MuiButton>
        </ModalFooter>
      </Box>
    </Modal>
  );
}

export default CustomModal;