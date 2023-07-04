import React, { useState } from 'react';
import { CustomModal, Text } from '../_shared/common';
import { Grid, Avatar } from '@mui/material';
import { Image as ImageType } from '@/utils/assetsConstant';
import { DatePicker, CheckBox, Select, Textarea } from '../_shared/form';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { LeaveTypeItems, LeaveTypeStatus } from '@/utils/options';
import { useFormik } from 'formik';
import { validationSchemeCreateLeaveEntries } from './validate';
import store from '@/store/index';
import dayjs from 'dayjs';
import { postLeaveEntriesRequested } from '@/store/reducers/slice/attendance-leave/leaveEntriesSlice';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface LeaveEntriesEmployeeCreateProps {
  selectedEmployee: any,
  openCreateModal: boolean;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: typeof store.dispatch,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedEmployee: any
}

const LeaveEntriesEmployeeCreateComponent = ({
  selectedEmployee,
  openCreateModal,
  setOpenCreateModal,
  dispatch,
  setOpenModal,
  setSelectedEmployee
}: LeaveEntriesEmployeeCreateProps) => {
  const [isHalfDay, setIsHalfDay] = useState(false);

  const formik = useFormik({
    initialValues: {
      leaveFrom: null,
      leaveTo: null,
      leaveType: '',
      leaveStatus: '',
      note: '',
      halfFrom: null,
      halfTo: null
    },
    validationSchema: validationSchemeCreateLeaveEntries,
    onSubmit: (values, { resetForm }) => {
      const postValues = {
        post: {
          employeeID: selectedEmployee?.id,
          start: values.halfFrom === null
            ? dayjs(values.leaveFrom).toISOString()
            : dayjs(dayjs(values.leaveFrom).format('YYYY-MM-DD') + ' ' + dayjs(values.halfFrom).format('HH:mm')).toISOString(),
          end: values.halfTo === null
            ? dayjs(values.leaveTo).toISOString()
            : dayjs(dayjs(values.leaveTo).format('YYYY-MM-DD') + ' ' + dayjs(values.halfTo).format('HH:mm')).toISOString(),
          leaveType: values.leaveType,
          leaveStatus: values.leaveStatus,
          note: values.note,
          isHalfday: isHalfDay
        },
        getEntries: {
          page: 1,
          itemPerPage: 5
        }
      };
      dispatch({
        type: postLeaveEntriesRequested.toString(),
        payload: postValues
      });
      setOpenCreateModal(false);
      setOpenModal(false);
      setSelectedEmployee(null);
      resetForm();
    }
  });

  return (
    <CustomModal
      open={openCreateModal}
      title='New Leave Entry'
      width='800px'
      keepMounted={false}
      submitText='Save'
      handleClose={() => {
        setOpenCreateModal(false);
        setSelectedEmployee(null);
        formik.resetForm();
        setIsHalfDay(false);
      }}
      handleConfirm={formik.handleSubmit}
    >
      <Grid container sx={{ padding: '8px 16px' }} alignItems='center'>
        <Grid item md={1.5}>
          <Avatar
            src={selectedEmployee?.user?.userInformation?.picture || ImageType.AVATAR_PLACEHOLDER}
            alt={selectedEmployee?.user?.name}
            sx={{
              width: 72, height: 72
            }}
          />
        </Grid>
        <Grid item md={6}>
          <Text title={selectedEmployee?.user?.name || ''} fontSize='18px' fontWeight={700} color='grey.600' />
          <Text title={selectedEmployee?.department?.name || ''} fontSize='14px' fontWeight={400} color='grey.600' />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: '0px 16px' }} justifyContent='space-between' alignItems='center'>
        <Grid item md={5.5}>
          <DatePicker
            customLabel='Leave From'
            onChange={(date: unknown) => formik.setFieldValue('leaveFrom', date, false)}
            value={formik.values.leaveFrom as unknown as Date}
          />
        </Grid>
        <Grid item>
          <AiOutlineSwapRight style={{ marginTop: '30px' }} />
        </Grid>
        <Grid item md={5.5} sx={{ marginBottom: formik.errors.leaveTo ? '-30px' : '' }}>
          <DatePicker
            customLabel='Leave To'
            onChange={(date: unknown) => formik.setFieldValue('leaveTo', date, true)}
            value={formik.values.leaveTo as unknown as Date}
            error={formik.errors.leaveTo}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: '0 16px' }}>
        <Grid item>
          <CheckBox customLabel='Half-day Leave' value={isHalfDay} onChange={() => { setIsHalfDay(prev => !prev); }} />
        </Grid>
      </Grid>
      {isHalfDay && (
        <Grid container justifyContent='space-between' alignItems='center' sx={{ padding: '0px 16px' }} mb='16px'>
          <Grid item md={5.5}>
            <Text title='From' color='grey.700' mb='6px' />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                format='HH:mm'
                value={formik.values.halfFrom}
                onChange={(val) => formik.setFieldValue('halfFrom', val, false)}
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
          <Grid item>
            <AiOutlineSwapRight style={{ marginTop: '30px' }} />
          </Grid>
          <Grid item md={5.5}>
            <Text title='To' color='grey.700' mb='6px' />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                format='HH:mm'
                value={formik.values.halfTo}
                onChange={(val) => formik.setFieldValue('halfTo', val, false)}
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
      )}
      <Grid container justifyContent='space-between' alignItems='center' sx={{ padding: '0px 16px' }}>
        <Grid item md={5.5}>
          <Select
            customLabel='Leave Type'
            options={LeaveTypeItems}
            variant='outlined'
            size='small'
            fullWidth
            name='leaveType'
            value={formik.values.leaveType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            displayEmpty
            renderValue={(value: unknown) => {
              if ((value as string).length === 0) {
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
        <Grid item md={5.5}>
          <Select
            customLabel='Status'
            options={LeaveTypeStatus}
            variant='outlined'
            size='small'
            fullWidth
            name='leaveStatus'
            value={formik.values.leaveStatus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            displayEmpty
            renderValue={(value: unknown) => {
              if ((value as string).length === 0) {
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
        <Grid item md={12}>
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
    </CustomModal>
  );
};

export default LeaveEntriesEmployeeCreateComponent;