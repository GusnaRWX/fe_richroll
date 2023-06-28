import React from 'react';
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

interface LeaveEntriesEmployeeCreateProps {
  selectedEmployee: any,
  openCreateModal: boolean;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: typeof store.dispatch
}

const LeaveEntriesEmployeeCreateComponent = ({
  selectedEmployee,
  openCreateModal,
  setOpenCreateModal,
  dispatch
}: LeaveEntriesEmployeeCreateProps) => {
  const formik = useFormik({
    initialValues: {
      leaveFrom: null,
      leaveTo: null,
      leaveType: '',
      leaveStatus: '',
      note: ''
    },
    validationSchema: validationSchemeCreateLeaveEntries,
    onSubmit: (values) => {
      const postValues = {
        employeeID: selectedEmployee?.id,
        start: dayjs(values.leaveFrom).toISOString(),
        end: dayjs(values.leaveTo).toISOString(),
        leaveType: values.leaveType,
        leaveStatus: values.leaveStatus,
        note: values.note
      };
      dispatch({
        type: postLeaveEntriesRequested.toString(),
        payload: postValues
      });
    }
  });


  return (
    <CustomModal
      open={openCreateModal}
      title='New Leave Entry'
      width='800px'
      keepMounted={false}
      submitText='Save'
      handleClose={() => { setOpenCreateModal(false); }}
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
        <Grid item md={5.5}>
          <DatePicker
            customLabel='Leave To'
            onChange={(date: unknown) => formik.setFieldValue('leaveTo', date, false)}
            value={formik.values.leaveTo as unknown as Date}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: '0 16px' }}>
        <Grid item>
          <CheckBox customLabel='Half-day Leave' disabled />
        </Grid>
      </Grid>
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
                return <Text title='Select Leave Type' color='greyy.400' />;
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