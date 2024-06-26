import React, { useState, useEffect } from 'react';
import { CustomModal } from '../_shared/common';
import {
  Avatar,
  Typography,
  Grid,
  InputAdornment
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styled from '@emotion/styled';
import { Input } from '../_shared/form';
import { AttendanceLeave } from '@/types/attendanceLeave';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const AvatarWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin-bottom: 1rem;
 margin-top: 1rem;
 border-bottom: 1px solid #D1D5DB;
 gap: 1rem;
 padding-bottom: 1rem;
`;

const NameWrapper = styled.div`
 display: flex;
 flex-direction: column;
`;

interface EditProps {
  editOpen: boolean;
  handleEditClose: () => void;
  callback: (_data: AttendanceLeave.PutOvertime) => void;
  item: AttendanceLeave.OvertimeType | undefined;
}

function OvertimeSummaryEditForm({editOpen, handleEditClose, callback, item}: EditProps) {
  const [hydrated, setHaydrated] = useState(false);
  const {t} = useTranslation();
  const t_editOvertimeSummary = 'attendance_&_leave.overtime_summary.popup.update';

  const formik = useFormik({
    initialValues: {
      start: '',
      duration: '',
      multiplier: ''
    } as AttendanceLeave.PutOvertime,
    onSubmit: (values) => {
      callback(values);
    }
  });

  useEffect(() => {
    if (!open) formik.resetForm();
    formik.setFieldValue('start', dayjs(item?.start));
    formik.setFieldValue('duration', item?.duration);
    formik.setFieldValue('multiplier', item?.multiplier);
  }, [open, item]);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <CustomModal
      open={editOpen}
      handleClose={handleEditClose}
      title={t(`${t_editOvertimeSummary}.title`)}
      width='650px'
      handleConfirm={formik.handleSubmit}
      submitText={t('button.save')}
    >
      <AvatarWrapper>
        <Avatar
          src={item?.employee?.picture || item?.employee?.name}
          alt={item?.employee?.name}
          sx={{
            width: '74px',
            height: '74px'
          }}
        />
        <NameWrapper>
          <Typography fontSize='18px'>{item?.employee?.name}</Typography>
          <Typography fontSize='14px'>{item?.employee?.department === null ? '-' : item?.employee?.department}</Typography>
        </NameWrapper>
      </AvatarWrapper>
      <Grid container mb='1rem' spacing={2}>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Typography mb='7px' fontSize='16px'>{t(`${t_editOvertimeSummary}.start_time_input_label`)}</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              format='HH:mm'
              ampm={false}
              sx={{
                '& .MuiOutlinedInput-input': {
                  padding: '8.5px 14px',
                },
                width: '100%'
              }}
              value={formik.values.start}
              onChange={(e) => formik.setFieldValue('start', e)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Input
            withAsterisk={false}
            size='small'
            type='number'
            name='duration'
            customLabel={t(`${t_editOvertimeSummary}.duration_input_label`)}
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography color='grey.500'>Hours</Typography>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Input
            withAsterisk={false}
            size='small'
            name='multiplier'
            customLabel={t(`${t_editOvertimeSummary}.multiplier_input_label`)}
            type='number'
            value={formik.values.multiplier}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            inputProps={{
              step: 0.1
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography color='grey.500'>x</Typography>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

export default OvertimeSummaryEditForm;