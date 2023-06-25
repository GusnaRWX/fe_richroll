import React from 'react';
import { Box, Modal, IconButton, Avatar, Grid } from '@mui/material';
import styled from '@emotion/styled';
import { Text } from '../_shared/common';
import { Close } from '@mui/icons-material';
import { Image } from '@/utils/assetsConstant';
import { Button, Select, Textarea } from '../_shared/form';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

interface LeaveEntriesEditProps {
  open: boolean;
  handleClose: () => void
}

const LeaveEntriesEditComponent: React.FC<LeaveEntriesEditProps> = ({
  open,
  handleClose
}) => {
  return (
    <Modal
      open={open}
      keepMounted={false}
      disableAutoFocus
    >
      <Box sx={modalStyle}>
        <ModalHeader>
          <Text title='Edit Leave Entry' fontWeight={600} fontSize='18px' />
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </ModalHeader>
        <form>
          <Box sx={{ padding: '16px 0px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #E5E7EB', paddingBottom: '15px' }}>
              <div>
                <Avatar
                  src={Image.EXAMPLE_EMPLOYE}
                  alt='employee'
                  sx={{
                    width: 72, height: 72
                  }}
                />
              </div>
              <div>
                <Text title='Asep Kusnandar' fontWeight={700} fontSize='18px' />
                <Text title='Manajer' fontWeight={400} fontSize='14px' />
              </div>
            </Box>
            <Box sx={{ marginTop: '24px' }}>
              <Grid container justifyContent='space-between' gap={1} mb='16px'>
                <Grid item sm={5.8}>
                  <Select
                    customLabel='Leave Type'
                    options={[
                      { value: '0', label: 'Sick Leave' }
                    ]}
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                </Grid>
                <Grid item sm={5.8}>
                  <Select
                    customLabel='Status'
                    options={[
                      { value: '0', label: 'Paid' }
                    ]}
                    variant='outlined'
                    size='small'
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent='space-between' gap={1}>
                <Grid item md={5.8}>
                  <Text title='Leave From' fontWeight={400} sx={{ marginBottom: '6px' }} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      format='HH:mm'
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          padding: '8.5px 14px',
                          border: 'none !important'
                        },
                        width: '100%'
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={5.8}>
                  <Text title='Leave To' fontWeight={400} sx={{ marginBottom: '6px' }} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      format='HH:mm'
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          padding: '8.5px 14px',
                          border: 'none !important'
                        },
                        width: '100%'
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid container gap={1} mt='16px'>
                <Grid item md={12}>
                  <Textarea
                    placeholder='Add Notes'
                    customLabel='Note'
                    minRows={4}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ padding: '16px 0px' }}>
            <Grid container direction='row' justifyContent='flex-end' alignItems='center' gap={2}>
              <Grid item>
                <Button label='Cancel' variant='outlined' onClick={handleClose} />
              </Grid>
              <Grid item>
                <Button label='Save' type='submit' />
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default LeaveEntriesEditComponent;