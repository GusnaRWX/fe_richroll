import React, { useState, useEffect, useRef } from 'react';
import { Modal, Grid, Box, Typography, Button as MuiButton, Select, MenuItem, IconButton, InputAdornment } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import { ConfirmationModal } from '@/components/_shared/common';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { Close } from '@mui/icons-material';
import type { SchedulerRef, SchedulerHelpers, ProcessedEvent } from '@aldabil/react-scheduler/types';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Textarea, Input } from '@/components/_shared/form';
import { getPayloadAttendancePayroll } from '@/utils/helper';
import { putPayrollAttendanceScheduleRequested } from '@/store/reducers/slice/payroll/payrollSlice';

type DayJS = dayjs.Dayjs | null | string;

const ValidationEditAttendanceSchedule = Yup.object({
  type: Yup.string().notRequired(),
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
  payrollID?: unknown;
  attendanceID?: string | number;
  employeeID?: string | number;
}

interface InitialValuesType {
  color: string;
  end: DayJS;
  id: string;
  isHalfDay: boolean;
  isOvertime: boolean;
  leaveStatus: string | number;
  leaveType: string | number;
  multiplier: number;
  name: string;
  note?: string | null;
  start: DayJS;
  title: string;
  duration: number;
  event_id: string | number;
}

interface PayloadValuesType {
  id: string | number,
  name: string,
  start: DayJS
  end: DayJS,
  leaveType: string | number,
  isOvertime: boolean,
  multiplier: string | number,
  note: string,
  leaveStatus: string | number,
  color: string,
  isHalfDay: boolean
}

interface CustomEditorProps {
  scheduler: SchedulerHelpers
}

const CustomEditor = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;
  const checkingLeaveType = () => {
    if (event?.leaveType == 0 && event?.isOvertime == true){
      return 9;
    }else if (event?.leaveType == 0 && event?.name == 'Clock In') {
      return 7;
    }else if (event?.leaveType == 0 && event?.name == 'Clock Out') {
      return 8;
    }else{
      return event?.leaveType;
    }
  };
  const formik = useFormik({
    initialValues: {
      color: event?.color,
      end: dayjs(event?.end),
      id: event?.id,
      isHalfDay: event?.isHalfDay,
      isOvertime: event?.isOvertime,
      leaveStatus: event?.leaveStatus,
      leaveType: checkingLeaveType(),
      multiplier: event?.multiplier,
      name: event?.name,
      note: event?.note || '',
      start: dayjs(event?.start),
      title: event?.title,
      duration: dayjs(event?.end.toUTCString()).diff(event?.start.toUTCString(), 'hours') || 0,
      event_id: event?.event_id
    } as InitialValuesType,
    validationSchema: ValidationEditAttendanceSchedule,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    }
  });
  console.log('here this event : ', event);

  const handleSubmit = async (data: InitialValuesType) => {
    try {
      scheduler.loading(true);
      const added_update_event = (
        await new Promise((res) => {
          setTimeout(() => {
            res(getPayloadAttendancePayroll(data, event));
          }, 1000);
        })
      ) as unknown as ProcessedEvent;
      scheduler.onConfirm(added_update_event, 'edit');
      scheduler.close();
    }finally{
      scheduler.loading(false);
    }
  };

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
            disabled
            value={formik.values.leaveType}
            onChange={(e) => {formik.setFieldValue('leaveType', e.target.value);}}
            sx={{ backgroundColor: '#c5c5c5' }}
          >
            <MenuItem value={7}>Clock In</MenuItem>
            <MenuItem value={8}>Clock out</MenuItem>
            <MenuItem value={9}>Overtime</MenuItem>
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
        (formik.values.leaveType !== 7 && formik.values.leaveType !== 8 && formik.values.leaveType !== 9) && (
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
                  <MenuItem value={1}>Paid</MenuItem>
                  <MenuItem value={2}>Unpaid</MenuItem>
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
        (formik.values.leaveType == 7 || formik.values.leaveType == 8 || formik.values.leaveType == 9) && (
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
                  value={formik.values.start}
                  onChange={(val) => formik.setFieldValue('start', val)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        )
      }
      {
        formik.values.leaveType === 9 && (
          <Grid container spacing={2} mb='1rem'>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Input
                withAsterisk={false}
                size='small'
                type='number'
                name='duration'
                customLabel='Duration'
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
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Input
                withAsterisk={false}
                size='small'
                name='multiplier'
                customLabel='Multiplier'
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
        )
      }
      {
        formik.values.isHalfDay == true && (
          <Grid container mb='1.5rem' spacing={2}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Typography>Start</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      padding: '8.5px 14px',
                    },
                    width: '100%'
                  }}
                  ampm={false}
                  value={formik.values.start}
                  onChange={(val) => formik.setFieldValue('start', val)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Typography>End</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      padding: '8.5px 14px',
                    },
                    width: '100%'
                  }}
                  ampm={false}
                  value={formik.values.end}
                  onChange={(val) => formik.setFieldValue('end', val)}
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
          justifyContent: 'flex-end',
          borderTop: '1px solid #E5E7EB',
          paddingTop: '1rem'
        }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}>
          <MuiButton variant='outlined' size='small' onClick={() => scheduler.close()}>Cancel</MuiButton>
          <MuiButton variant='contained' size='small' onClick={() => formik.handleSubmit()}>Confirm</MuiButton>
        </div>
      </div>
    </div>
  );

};


function AttendanceCalendar({open, handleClose, handleConfirm, payrollID, attendanceID, employeeID}: AttendanceCalendarProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const dispatch = useAppDispatch();

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

  const handleSave = () => {
    const tempData: Array<PayloadValuesType> = [];
    calendarRef?.current?.scheduler?.events.map((item) => {
      tempData.push({
        color: item?.color || '',
        end: dayjs(item.end).toISOString(),
        id: item?.id,
        isHalfDay: item?.isHalfDay,
        isOvertime: item?.isOvertime,
        leaveStatus: item?.leaveStatus,
        leaveType: item?.leaveType,
        multiplier: item?.multiplier,
        name: item?.name,
        note: item?.note || '',
        start: dayjs(item.start).toISOString()
      });
    });
    dispatch({
      type: putPayrollAttendanceScheduleRequested.toString(),
      payload: {
        id: payrollID,
        attendanceID: attendanceID,
        employeeID: employeeID,
        data: {
          items: tempData
        }
      }
    });
    onClose();
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
        callback={() => {
          handleConfirm();
          handleSave();
        }}
      />
    </>
  );
}

export default AttendanceCalendar;