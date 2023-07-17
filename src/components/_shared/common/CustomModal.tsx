import React from 'react';
import { Modal, Box, IconButton, Typography, Button as MuiButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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


interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
  title: string;
  children;
  width: string;
  submitText?: string;
  ConfirmationDisable?: boolean;
  keepMounted?: boolean;
  deleteText?: string;
  withFooter?: boolean;
}


function CustomModal({
  open,
  handleClose,
  handleConfirm,
  title,
  children,
  width,
  submitText,
  ConfirmationDisable,
  keepMounted,
  deleteText,
  withFooter = true }: CustomModalProps) {
  const {t} = useTranslation();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      keepMounted={keepMounted}
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
        {
          withFooter && (
            <ModalFooter>
              <MuiButton variant='outlined' size='small' onClick={handleClose}>{t('button.cancel')}</MuiButton>
              {submitText !== 'Suspend' && submitText !== 'Delete' && submitText !== 'Reactivate' &&
                <MuiButton variant='contained' disabled={ConfirmationDisable} onClick={handleConfirm} size='small' color='primary'>{submitText || t('button.confirm')}</MuiButton>
              }
              {submitText === 'Suspend' &&
                <MuiButton variant='contained' disabled={ConfirmationDisable} onClick={handleConfirm} size='small' sx={{ background: '#FFEDD5', color: '#EA580C' }}>{t('button.suspend')}</MuiButton>
              }
              {submitText === 'Delete' &&
                <MuiButton variant='contained' disabled={ConfirmationDisable} onClick={handleConfirm} size='small' sx={{ background: '#FECACA', color: '#DC2626' }}>{deleteText || t('button.delete')}</MuiButton>
              }
              {submitText === 'Reactivate' &&
                <MuiButton variant='contained' disabled={ConfirmationDisable} onClick={handleConfirm} size='small' sx={{ background: '#DCFCE7', color: '#16A34A' }}>Reactivate</MuiButton>
              }
              {submitText === 'Reactivate' &&
                <MuiButton variant='contained' disabled={ConfirmationDisable} onClick={handleConfirm} size='small' sx={{ background: '#DCFCE7', color: '#16A34A' }}>Reactivate</MuiButton>
              }
            </ModalFooter>
          )
        }
      </Box>
    </Modal>
  );
}

export default CustomModal;