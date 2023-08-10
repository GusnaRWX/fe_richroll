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
import { compareCheck, ifThenElse } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

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
  const {t} = useTranslation();
  const t_leaveEntriesEmployeeCreate = 'attendance_&_leave.leave_entries.popup.select_employee';

  const formik = useFormik({
    initialValues: {
      leaveFrom: null,
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
            ? dayjs(values.leaveFrom).toISOString()
            : dayjs(dayjs(values.leaveFrom).format('YYYY-MM-DD') + ' ' + dayjs(values.halfTo).format('HH:mm')).toISOString(),
          leaveType: values.leaveType,
          leaveStatus: values.leaveStatus,
          note: values.note,
          isHalfday: isHalfDay
        }
      };
      dispatch({
        type: postLeaveEntriesRequested.toString(),
        payload: postValues
      });
      setOpenCreateModal(false);
      setOpenModal(false);
      setSelectedEmployee(null);
      setIsHalfDay(false);
      resetForm();
    }
  });

  return (
    <CustomModal
      open={openCreateModal}
      title={t(`${t_leaveEntriesEmployeeCreate}.title`)}
      width='800px'
      keepMounted={false}
      submitText={t('button.save')}
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
      <Grid container sx={{ padding: '0px 16px', height: '100px' }} justifyContent='space-between' alignItems='center'>
        <Grid item md={6} sx={{ marginBottom: formik.errors.leaveFrom ? '-30px' : '' }}>
          <DatePicker
            customLabel={t(`${t_leaveEntriesEmployeeCreate}.select_date`)}
            onChange={(date: unknown) => formik.setFieldValue('leaveFrom', date, false)}
            value={formik.values.leaveFrom as unknown as Date}
            error={formik.errors.leaveFrom}
          />
        </Grid>
        {/* <Grid item>
          <AiOutlineSwapRight style={{ marginTop: '30px' }} />
        </Grid>
        <Grid item md={5.5} sx={{ marginBottom: formik.errors.leaveTo ? '-30px' : '' }}>
          <DatePicker
            customLabel={t(`${t_leaveEntriesEmployeeCreate}.leave_to_input_label`)}
            onChange={(date: unknown) => formik.setFieldValue('leaveTo', date, true)}
            value={formik.values.leaveTo as unknown as Date}
            error={formik.errors.leaveTo}
            minDate={formik.values.leaveTo as unknown as Date}
          />
        </Grid> */}
      </Grid>
      <Grid container sx={{ padding: '0 16px' }}>
        <Grid item>
          <CheckBox customLabel={t(`${t_leaveEntriesEmployeeCreate}.half_day_leave`)} value={isHalfDay} onChange={() => { setIsHalfDay(prev => !prev); }} />
        </Grid>
      </Grid>
      {isHalfDay && (
        <Grid container justifyContent='space-between' alignItems='center' sx={{ padding: '0px 16px' }} mb='16px'>
          <Grid item md={5.5}>
            <Text title={t(`${t_leaveEntriesEmployeeCreate}.from_input_label`)} color='grey.700' mb='6px' />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                ampm={false}
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
            <Text title={t(`${t_leaveEntriesEmployeeCreate}.to_input_label`)} color='grey.700' mb='6px' />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                ampm={false}
                format='HH:mm'
                minTime={formik.values.halfFrom}
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
            customLabel={t(`${t_leaveEntriesEmployeeCreate}.leave_type_input_label`)}
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
                return <Text title={t(`${t_leaveEntriesEmployeeCreate}.leave_type_input_placeholder`)} color='grey.400' />;
              }
              const selected = LeaveTypeItems.find(item => item.value === value);
              if (selected) {
                return `${selected.label}`;
              }
              return null;
            }}
            error={compareCheck(formik.touched.leaveType, Boolean(formik.errors.leaveType))}
            helperText={ifThenElse(compareCheck(formik.touched.leaveType, Boolean(formik.errors.leaveType)), formik.errors.leaveType, '')}
          />
        </Grid>
        <Grid item md={5.5}>
          <Select
            customLabel={t(`${t_leaveEntriesEmployeeCreate}.status_input_label`)}
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
                return <Text title={t(`${t_leaveEntriesEmployeeCreate}.status_input_placeholder`)} color='grey.400' />;
              }
              const selected = LeaveTypeStatus.find(item => item.value === value);
              if (selected) {
                return `${selected.label}`;
              }
              return null;
            }}
            error={compareCheck(formik.touched.leaveStatus, Boolean(formik.errors.leaveStatus))}
            helperText={ifThenElse(compareCheck(formik.touched.leaveStatus, Boolean(formik.errors.leaveStatus)), formik.errors.leaveStatus, '')}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ padding: '0 16px' }} mt='16px'>
        <Grid item md={12}>
          <Textarea
            placeholder={t(`${t_leaveEntriesEmployeeCreate}.note_input_placeholder`)}
            customLabel={t(`${t_leaveEntriesEmployeeCreate}.note_input_label`)}
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