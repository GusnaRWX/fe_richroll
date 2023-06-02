import React from 'react';
import { Modal, IconButton, Box, Button as MuiButton, styled as MuiStyled } from '@mui/material';
import { Close } from '@mui/icons-material';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { AiOutlineCamera } from 'react-icons/ai';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '284px',
  bgcolor: 'background.paper',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  p: 2,
};

const ModalHeader = MuiStyled(Box)(({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
  borderBottom: '1px solid #E5E7EB',
  paddingBottom: '1rem'
}));

const ModalBtnWrapper = MuiStyled(Box)(({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  gap: '.5rem'
}));

interface FileUploadModalProps {
  open: boolean;
  handleClose?: () => void,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  onCapture?: () => void
}

function FileUploadModal({
  open,
  handleClose,
  onChange,
  onCapture
}: FileUploadModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      keepMounted
      disableAutoFocus
    >
      <Box sx={modalStyle}>
        <ModalHeader>Choose an action</ModalHeader>
        <IconButton onClick={handleClose} sx={{
          position: 'fixed',
          top: 10,
          right: 0
        }}>
          <Close />
        </IconButton>
        <ModalBtnWrapper>
          <input
            id='input-file'
            onChange={onChange}
            type='file'
            style={{ display: 'none' }}
            accept='image/file'
          />
          <label htmlFor='input-file'>
            <MuiButton sx={{ paddingLeft: '.9rem', paddingRight: '.9rem' }} component='span' fullWidth size='small' variant='outlined'>
              <BsFileEarmarkPlus /> &nbsp; Browse File
            </MuiButton>
          </label>
          <MuiButton onClick={onCapture} size='small' variant='outlined'>
            <AiOutlineCamera /> &nbsp; Take A Photo
          </MuiButton>
        </ModalBtnWrapper>
      </Box>
    </Modal>
  );
}

export default FileUploadModal;