import React, { useEffect } from 'react';
import { Box, Modal, IconButton, Grid, Avatar } from '@mui/material';
import styled from '@emotion/styled';
import { Text } from '../_shared/common';
import { Close } from '@mui/icons-material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from '../_shared/form';
import { useFormik } from 'formik';
import { AttendanceLeave } from '@/types/attendanceLeave';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

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
  handleClose: () => void;
  callback: (_data: AttendanceLeave.PutAttendance) => void;
  item: AttendanceLeave.AttendanceType | undefined;
}

const AttendanceEntriesEdit: React.FC<AttendanceEntriesEditProps> = ({
  open,
  handleClose,
  callback,
  item
}) => {

  const {t} = useTranslation();
  const t_editPopup = 'attendance_&_leave.attendance_entries.popup.edit';

  const formik = useFormik({
    initialValues: {
      clockIn: '',
      clockOut: ''
    } as AttendanceLeave.PutAttendance,
    onSubmit: (values) => {
      callback(values);
    }
  });

  useEffect(() => {
    if (!open) formik.resetForm();
    formik.setFieldValue('clockIn', dayjs(item?.clockIn));
    formik.setFieldValue('clockOut', dayjs(item?.clockOut));
  }, [open, item]);

  return (
    <Modal
      open={open}
      keepMounted={false}
      disableAutoFocus
    >
      <Box sx={modalStyle}>
        <ModalHeader>
          <Text title={t(`${t_editPopup}.title`)} fontWeight={600} fontSize='18px' />
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </ModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ padding: '16px 0px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #E5E7EB', paddingBottom: '15px' }}>
              <div>
                <Avatar
                  src={item?.employee?.picture || item?.employee?.name}
                  alt={item?.employee?.name}
                  sx={{
                    width: 72, height: 72
                  }}
                />
              </div>
              <div>
                <Text title={item?.employee?.name} fontWeight={700} fontSize='18px' />
                <Text title={item?.employee?.department?.name || '-'} fontWeight={400} fontSize='14px' />
              </div>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
              <Grid container justifyContent='space-between' gap={1}>
                <Grid item md={5.5}>
                  <Text title={t(`${t_editPopup}.from_input_label`)} fontWeight={400} sx={{ marginBottom: '6px' }} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      ampm={false}
                      format='HH:mm'
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          padding: '8.5px 14px',
                          border: 'none !important'
                        },
                        width: '100%'
                      }}
                      value={formik.values.clockIn}
                      onChange={(e) => formik.setFieldValue('clockIn', e)}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={5.5}>
                  <Text title={t(`${t_editPopup}.to_input_label`)} fontWeight={400} sx={{ marginBottom: '6px' }} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      ampm={false}
                      format='HH:mm'
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          padding: '8.5px 14px',
                          border: 'none !important'
                        },
                        width: '100%'
                      }}
                      value={formik.values.clockOut}
                      onChange={(e) => { formik.setFieldValue('clockOut', e); }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ padding: '16px 0px' }}>
            <Grid container direction='row' justifyContent='flex-end' alignItems='center' gap={2}>
              <Grid item>
                <Button label={t('button.cancel')} variant='outlined' onClick={handleClose} />
              </Grid>
              <Grid item>
                <Button label={t('button.save')} type='submit' />
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AttendanceEntriesEdit;