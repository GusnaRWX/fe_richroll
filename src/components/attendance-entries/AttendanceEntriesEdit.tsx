import React from 'react';
import { Box, Modal, IconButton, Grid } from '@mui/material';
import styled from '@emotion/styled';
import { Text } from '../_shared/common';
import { Close } from '@mui/icons-material';
import { Image as Assets } from '@/utils/assetsConstant';
import Image from 'next/image';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Textarea, Button } from '../_shared/form';
import { useFormik } from 'formik';
import { Dayjs } from 'dayjs';

interface AttendanceEntriesEditForm {
  from: Dayjs | null;
  to: Dayjs | null;
  notes: string
}

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

interface AttendanceEntriesEditProps {
  open: boolean;
  handleClose: () => void
}

const AttendanceEntriesEdit: React.FC<AttendanceEntriesEditProps> = ({
  open,
  handleClose
}) => {

  const formik = useFormik({
    initialValues: {
      from: null,
      to: null,
      notes: ''
    } as AttendanceEntriesEditForm,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <Modal
      open={open}
      keepMounted
      disableAutoFocus
    >
      <Box sx={modalStyle}>
        <ModalHeader>
          <Text title='Edit Leave Entry' fontWeight={600} fontSize='18px' />
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </ModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ padding: '16px 0px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div>
                <Image
                  src={Assets.EXAMPLE_EMPLOYE}
                  alt='user'
                  height={72}
                  width={72}
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <div>
                <Text title='Ratna Sinta' fontWeight={700} fontSize='18px' />
                <Text title='Assistent MANAGENTR' fontWeight={400} fontSize='14px' />
              </div>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
              <Grid container justifyContent='space-between' gap={1}>
                <Grid item md={5.5}>
                  <Text title='From' fontWeight={400} sx={{ marginBottom: '6px' }} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          padding: '8.5px 14px',
                          border: 'none !important'
                        },
                        width: '100%'
                      }}
                      value={formik.values.from}
                      onChange={(e) => { formik.setFieldValue('from', e, false); }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={5.5}>
                  <Text title='To' fontWeight={400} sx={{ marginBottom: '6px' }} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          padding: '8.5px 14px',
                          border: 'none !important'
                        },
                        width: '100%'
                      }}
                      value={formik.values.to}
                      onChange={(e) => { formik.setFieldValue('to', e, false); }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid container mt='10px'>
                <Grid item md={12}>
                  <Textarea
                    customLabel='Note'
                    placeholder='Add notes'
                    name='notes'
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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

export default AttendanceEntriesEdit;