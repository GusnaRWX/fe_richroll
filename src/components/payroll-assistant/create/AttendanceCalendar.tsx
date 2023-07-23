import React, { useState, useEffect, useRef } from 'react';
import { Modal, Grid, Box, Typography, Button as MuiButton, Select, MenuItem, IconButton } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import { ConfirmationModal } from '@/components/_shared/common';
import { useAppSelectors } from '@/hooks/index';
import { Close, DeleteOutline } from '@mui/icons-material';
import type { SchedulerRef, SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Textarea } from '@/components/_shared/form';

type DayJS = dayjs.Dayjs | null | string;

const ValidationEditAttendanceSchedule = Yup.object({
  type: Yup.string().notRequired(),
  time: Yup.date().required('This field is required'),
  leaveStatus: Yup.string().notRequired(),
  note: Yup.string().notRequired()
});

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

interface AttendanceCalendarProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

interface InitialValuesType {
  type: string | number;
  time: DayJS;
  leaveStatus: string;
  note?: string | null;
}

interface CustomEditorProps {
  scheduler: SchedulerHelpers
}

const CustomEditor = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;
  const formik = useFormik({
    initialValues: {
      type: '',
      time: dayjs(event?.start),
      leaveStatus: '',
      note: event?.note || ''
    } as InitialValuesType,
    validationSchema: ValidationEditAttendanceSchedule,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <div style={{ width: '600px', padding: '1rem' }}>
      <div style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Edit Form</h3>
        <IconButton onClick={scheduler.close}>
          <Close />
        </IconButton>
      </div>
      <Grid container spacing={2} mb='1rem' mt='.2rem'>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography mb='6px'>Date</Typography>
          <Typography>{dayjs(event?.start).format('YYYY-MM-DD')}</Typography>
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
          <Typography>Attendance Type</Typography>
          <Select
            fullWidth
            size='small'
            value={formik.values.type}
            onChange={(e) => {formik.setFieldValue('type', e.target.value);}}
          >
            <MenuItem value={0}>Check In</MenuItem>
            <MenuItem value={0}>Check out</MenuItem>
            <MenuItem value={0}>Overtime</MenuItem>
            <MenuItem value={1}>Annual Leave</MenuItem>
            <MenuItem value={2}>Child Care leave</MenuItem>
            <MenuItem value={3}>Maternity Leave</MenuItem>
            <MenuItem value={4}>Paternity Leave</MenuItem>
            <MenuItem value={5}>Shared Parental Leave</MenuItem>
            <MenuItem value={6}>Sick Leave</MenuItem>
          </Select>
        </Grid>
      </Grid>
      {
        formik.values.type !== 0 && (
          <>
            <Grid container mb='1rem'>
              <Grid sm={12} xs={12} md={12} lg={12} xl={12}>
                <Typography mb='6px'>Status</Typography>
                <Select
                  fullWidth
                  size='small'
                  value={formik.values.leaveStatus}
                  onChange={(e) => {formik.setFieldValue('leaveStatus', e.target.value);}}
                >
                  <MenuItem value={'1'}>Paid</MenuItem>
                  <MenuItem value={'2'}>Unpaid</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container mb='1.5rem'>
              <Grid sm={12} xs={12} md={12} lg={12} xl={12}>
                <Textarea
                  name='note'
                  maxRows={7}
                  minRows={7}
                  customLabel='Notes'
                  value={formik.values.note || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
            </Grid>
          </>
        )
      }
      {
        formik.values.type == 0 && (
          <Grid container mb='1.5rem'>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography>Time</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      padding: '8.5px 14px',
                    },
                    width: '100%'
                  }}
                  ampm={false}
                  value={formik.values.time}
                  onChange={(val) => formik.setFieldValue('time', val)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        )
      }

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #E5E7EB',
          paddingTop: '1rem'
        }}>
        <MuiButton variant='contained' color='red' size='small'>
          <DeleteOutline />&nbsp;Delete
        </MuiButton>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}>
          <MuiButton variant='outlined' size='small'>Cancel</MuiButton>
          <MuiButton variant='contained' size='small'>Confirm</MuiButton>
        </div>
      </div>
    </div>
  );

};


function AttendanceCalendar({open, handleClose, handleConfirm}: AttendanceCalendarProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const { attendanceDetail } = useAppSelectors((state) => state.payroll);
  const calendarRef = useRef<SchedulerRef>(null);
  useEffect(() => {
    calendarRef?.current?.scheduler?.confirmEvent(attendanceDetail?.events, 'create');
  }, [attendanceDetail?.events]);

  const handleDelete = () => {
    const eventLength = calendarRef?.current?.scheduler?.events?.length;
    calendarRef?.current?.scheduler?.events?.splice(0, eventLength);
  };

  const onClose = () => {
    handleDelete();
    handleClose();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        keepMounted
        disableAutoFocus
        // onClose={onClose}
      >
        <Box sx={modalStyle} width='1300px'>
          <Grid container spacing={2} mb='1.5rem'>
            <Grid item xs={9}>
              <Typography variant='text-xl' fontWeight={700} color='#4B5563'>
                Employee Calender
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <MuiButton
                variant='outlined'
                size='small'
                color='primary'
                sx={{ mr: '1rem' }}
                onClick={onClose}
              >Cancel</MuiButton>
              <MuiButton
                variant='contained'
                size='small'
                color='primary'
                // onClick={handleConfirm}
                onClick={() => setDeleteConfirmation(true)}
              >Save</MuiButton>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={9} style={{ height: '700px', overflowY: 'scroll' }}>
              <Scheduler
                customEditor={(scheduler) => <CustomEditor scheduler={scheduler}/>}
                events={[]}
                // ref={calendarRef}
                ref={calendarRef}
                view='month'
                disableViewNavigator={true}
                day={null}
                height={750}
                deletable={true}
                week={null}
                month={{
                  weekDays: [0, 1,2,3,4,5,6],
                  weekStartOn: 1,
                  startHour: 1,
                  endHour: 23,
                  cellRenderer: () => {
                    return (
                      <MuiButton style={{ height: '150% !important' }} onClick={() => {
                        return null;
                      }}/>
                    );
                  }
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography component='div' variant='text-base' fontWeight={700} color='#374151' mb='1.5rem' sx={{ textAlign: 'center' }}>
                Attendance Summary
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Full Name
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                {attendanceDetail?.employee?.name}
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Attendance
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                {attendanceDetail?.attendance} Days
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Absent
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                {attendanceDetail?.absent} Days
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Paid Leave
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                {attendanceDetail?.paidLeave} Days
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Unpaid Leave
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                {attendanceDetail?.unpaidLeave} Days
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Gross Hours
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                {attendanceDetail?.totalHours} Hours
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Total Hours (Nett)
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                {attendanceDetail?.netHours} Hours
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Average Hours Work/Day
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                {attendanceDetail?.averageHours} Hours
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <ConfirmationModal
        open={deleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title='Confirm Data Submission'
        content='Are you sure you want to save this changes made into this attendance report? '
        withCallback
        noChange={true}
        callback={handleConfirm}
      />
    </>
  );
}

export default AttendanceCalendar;