import React, { useEffect, useState } from 'react';
import { Box, Avatar, Grid } from '@mui/material';
import { CustomModal, Text } from '../_shared/common';
import { Select, Textarea, DatePicker, CheckBox } from '../_shared/form';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AttendanceLeave } from '@/types/attendanceLeave';
import { LeaveTypeItems, LeaveTypeStatus } from '@/utils/options';
import { validationSchemeUpdateLeaveEntries } from './validate';
import { putLeaveEntriesRequested } from '@/store/reducers/slice/attendance-leave/leaveEntriesSlice';
import { useFormik } from 'formik';
import { useAppDispatch } from '@/hooks/index';
import dayjs from 'dayjs';
import { AiOutlineSwapRight } from 'react-icons/ai';
// import utc from 'dayjs/plugin/utc';

// dayjs.extend(utc);

interface LeaveEntriesEditProps {
  open: boolean;
  handleClose: () => void;
  selectedItem: AttendanceLeave.LeaveEntriesList | null,
  setSelectedItem: any
}

const LeaveEntriesEditComponent: React.FC<LeaveEntriesEditProps> = ({
  open,
  handleClose,
  selectedItem,
  setSelectedItem
}) => {
  const dispatch = useAppDispatch();

  const handleClear = () => {
    setSelectedItem(null);
    handleClose();
  };

  const [isHalfDay, setIsHalfDay] = useState<null | boolean>(null);

  const formik = useFormik({
    initialValues: {
      leaveType: '',
      leaveStatus: '',
      leaveFrom: null,
      leaveTo: null,
      note: '',
      halfTo: null,
      halfFrom: null
    },
    validationSchema: validationSchemeUpdateLeaveEntries,
    onSubmit: (values) => {
      const result = {
        put: {
          start: values.halfFrom === null
            ? dayjs(values.leaveFrom).toISOString()
            : dayjs(dayjs(values.leaveFrom).format('YYYY-MM-DD') + ' ' + dayjs(values.halfFrom).format('HH:mm')).toISOString(),
          end: values.halfTo === null
            ? dayjs(values.leaveTo).toISOString()
            : dayjs(dayjs(values.leaveTo).format('YYYY-MM-DD') + ' ' + dayjs(values.halfTo).format('HH:mm')).toISOString(),
          note: values.note,
          leaveType: values.leaveType,
          leaveStatus: values.leaveStatus,
          isHalfday: isHalfDay
        },
        getEntries: {
          page: 1,
          itemPerPage: 5
        }
      };
      dispatch({
        type: putLeaveEntriesRequested.toString(),
        payload: {
          payload: {
            id: selectedItem?.id,
            data: result.put
          },
          getEntries: result.getEntries
        }
      });
      handleClear();
    }
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
    formik.setFieldValue('leaveType', String(selectedItem?.leaveType));
    formik.setFieldValue('leaveStatus', String(selectedItem?.leaveStatus));
    formik.setFieldValue('leaveFrom', dayjs(selectedItem?.start));
    formik.setFieldValue('leaveTo', dayjs(selectedItem?.end));
    formik.setFieldValue('halfFrom', dayjs(selectedItem?.start));
    formik.setFieldValue('halfTo', dayjs(selectedItem?.end));
    formik.setFieldValue('note', selectedItem?.note);
    setIsHalfDay(selectedItem?.isHalfday as boolean);
  }, [open, selectedItem]);

  useEffect(() => {
    if (!isHalfDay) {
      formik.setFieldValue('halfFrom', null);
      formik.setFieldValue('halfTo', null);
    }
  }, [isHalfDay]);

  return (
    <CustomModal
      open={open}
      keepMounted={false}
      title='Edit Leave Entry'
      width='800px'
      submitText='Save'
      handleClose={() => {
        formik.resetForm();
        handleClose();
        setSelectedItem(null);
      }}
      handleConfirm={formik.handleSubmit}
    >
      <Grid container sx={{ padding: '8px 16px' }} alignItems='center'>
        <Grid item md={1.5}>
          <Avatar
            src={selectedItem?.employee?.picture}
            alt='employee'
            sx={{
              width: 72, height: 72
            }}
          />
        </Grid>
        <Grid item md={6}>
          <Text title={selectedItem?.employee?.name} fontWeight={700} fontSize='18px' />
          <Text title={selectedItem?.employee?.department} fontWeight={400} fontSize='14px' />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '24px' }}>
        <Grid container sx={{ padding: '0px 16px' }} justifyContent='space-between' alignItems='center'>
          <Grid item md={5.5}>
            <DatePicker
              customLabel='Leave From'
              onChange={(date: unknown) => formik.setFieldValue('leaveFrom', date, false)}
              value={dayjs(formik.values.leaveFrom) as unknown as Date}
            />
          </Grid>
          <Grid item>
            <AiOutlineSwapRight style={{ marginTop: '30px' }} />
          </Grid>
          <Grid item md={5.5} sx={{ marginBottom: formik.errors.leaveTo ? '-30px' : '' }}>
            <DatePicker
              customLabel='Leave To'
              onChange={(date: unknown) => formik.setFieldValue('leaveTo', date, true)}
              value={dayjs(formik.values.leaveTo) as unknown as Date}
              error={formik.errors.leaveTo}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '0 16px' }}>
          <Grid item>
            <CheckBox customLabel='Half-day Leave' checked={isHalfDay === true ? true : false} onChange={() => setIsHalfDay((prev) => !prev)} />
          </Grid>
        </Grid>
        {isHalfDay && (
          <Grid container justifyContent='space-between' alignItems='center' sx={{ padding: '0px 16px' }} mb='16px'>
            <Grid item md={5.5}>
              <Text title='From' color='grey.700' mb='6px' />
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
                  value={formik.values.halfFrom}
                  onChange={(val) => formik.setFieldValue('halfFrom', val, false)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <AiOutlineSwapRight style={{ marginTop: '30px' }} />
            </Grid>
            <Grid item md={5.5}>
              <Text title='To' color='grey.700' mb='6px' />
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
                  value={formik.values.halfTo}
                  onChange={(val) => formik.setFieldValue('halfTo', val, false)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        )}
        <Grid container justifyContent='space-between' sx={{ padding: '0px 16px' }} alignItems='center'>
          <Grid item sm={5.8}>
            <Select
              customLabel='Leave Type'
              options={LeaveTypeItems}
              variant='outlined'
              size='small'
              fullWidth
              name='leaveType'
              displayEmpty
              value={formik.values.leaveType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select Leave Type' color='grey.400' />;
                }
                const selected = LeaveTypeItems.find(item => item.value === value);
                if (selected) {
                  return `${selected.label}`;
                }
                return null;
              }}
            />
          </Grid>
          <Grid item sm={5.8}>
            <Select
              customLabel='Status'
              options={LeaveTypeStatus}
              variant='outlined'
              size='small'
              fullWidth
              name='leaveStatus'
              displayEmpty
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.leaveStatus}
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select Leave Status' color='grey.400' />;
                }
                const selected = LeaveTypeStatus.find(item => item.value === value);
                if (selected) {
                  return `${selected.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ padding: '0 16px' }} mt='16px'>
          <Grid item md={12} xs={12}>
            <Textarea
              placeholder='Add Notes'
              customLabel='Note'
              minRows={4}
              name='note'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.note}
            />
          </Grid>
        </Grid>
      </Box>
    </CustomModal>
  );
};

export default LeaveEntriesEditComponent;