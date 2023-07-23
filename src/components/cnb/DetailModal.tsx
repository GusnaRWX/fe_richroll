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
import { useTranslation } from 'react-i18next';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '543px',
  bgcolor: 'background.paper',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  paddingTop: '10px',
  p: 2,
  maxHeight: '100%',
  overflowY: 'auto',
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
  content: string | React.ReactNode;
}

function DetailModal({
  open,
  handleClose,
  title,
  content,
}: ConfirmationModalProp) {
  const { t } = useTranslation();

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
          {content}
        </div>
        <ModalFooter>
          <MuiButton variant='outlined' size='small' onClick={handleClose}>
            {t('button.close')}
          </MuiButton>
        </ModalFooter>
      </Box>
    </Modal>
  );
}

export default DetailModal;
