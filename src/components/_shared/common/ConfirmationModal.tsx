import React from 'react';
import { Modal, Box, IconButton, Typography, Button as MuiButton } from '@mui/material';
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
  p: 2
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

type Type = 'delete' | 'suspend' | 'reactivate'

interface ConfirmationModalProp {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  withCallback?: boolean;
  callback?: () => void;
  noChange?: boolean;
  type?: Type;
}


function ConfirmationModal({ open, handleClose, title, content, withCallback, callback, noChange, type }: ConfirmationModalProp) {
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
    <Modal
      open={open}
      onClose={handleClose}
      keepMounted
      disableAutoFocus
    >
      <Box sx={modalStyle}>
        <ModalHeader>
          <Typography component='h5' fontWeight='bold'>{title}</Typography>
          <IconButton
            onClick={handleClose}
          ><Close /></IconButton>
        </ModalHeader>
        <div style={{ paddingBottom: '1rem', paddingTop: '1rem', }}>
          <Typography component='span' fontSize='14px' color='#4B5563'>{content}</Typography>
        </div>
        <ModalFooter>
          <MuiButton variant='outlined' size='small' onClick={handleClose}>Cancel</MuiButton>
          {!type &&
            <MuiButton variant='contained' onClick={handleClick} size='small' color='primary'>Confirm</MuiButton>
          }
          {type === 'delete' &&
            <MuiButton variant='contained' onClick={handleClick} size='small' sx={{ background: '#FECACA', color: '#DC2626', ':hover': { background: '#FECACA', color: '#DC2626' } }}>Delete</MuiButton>
          }
          {type === 'suspend' &&
            <MuiButton variant='contained' onClick={handleClick} size='small' sx={{ background: '#FFEDD5', color: '#EA580C' }}>Suspend</MuiButton>
          }
          {type === 'reactivate' &&
            <MuiButton variant='contained' onClick={handleClick} size='small' sx={{ background: '#DCFCE7', color: '#16A34A' }}>Reactivate</MuiButton>
          }
        </ModalFooter>
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;