import React from 'react';
import CustomModal from '@/components/_shared/common/CustomModal';
import {Grid, Typography } from '@mui/material';
import { DatePicker, Input, RadioGroup, Textarea } from '@/components/_shared/form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useFormik } from 'formik';
import { AnnualWorkSchedule } from '@/types/annualWorkSchedule';
import { validationCreateAnnualWorkCalendar } from './validate';
import { useAppDispatch } from '@/hooks/index';
import { postAnnualScheduleRequested } from '@/store/reducers/slice/company-management/annual-work-schedule/annualSchedule';
import dayjs from 'dayjs';
import { getCompanyData } from '@/utils/helper';
import { useTranslation } from 'react-i18next';



interface AnnualWorkCalendarCreateProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

function AnnualWorkCalendarCreateForm({open, handleClose, handleConfirm}: AnnualWorkCalendarCreateProps) {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const t_addCalendarItem = 'company_management.annual_work_calendar.popup.add_calendar_item';
  const formik = useFormik({
    initialValues: {
      name: '',
      type: '0',
      startDate: dayjs(new Date()),
      endDate: dayjs(new Date()),
      startHours: dayjs(new Date()),
      endHours: dayjs(new Date()),
      notes: ''
    } as AnnualWorkSchedule.InitialValues,
    validationSchema: validationCreateAnnualWorkCalendar,
    onSubmit: (values) => {
      dispatch({
        type: postAnnualScheduleRequested.toString(),
        payload: {
          companyID: getCompanyData()?.id?.toString(),
          name: values?.name,
          eventType: values?.type as number,
          startDate: dayjs(values?.startDate).toISOString(),
          endDate: dayjs(values?.endDate).toISOString(),
          startHour: dayjs(dayjs(values?.startDate).format('YYYY-MM-DD') + ' ' + dayjs(values?.startHours).format('HH:mm')).toISOString(),
          endHour: dayjs(dayjs(values?.endDate).format('YYYY-MM-DD') + ' ' + dayjs(values?.endHours).format('HH:mm')).toISOString(),
          isWithTime: true,
          note: values.notes
        }
      });
      formik.resetForm();
      handleConfirm();
    }
  });
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={t(`${t_addCalendarItem}.create_title`)}
      width='758px'
      handleConfirm={formik.handleSubmit}
    >
      <Grid container spacing={2} mb='1rem' mt='1rem'>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Input
            name='name'
            withAsterisk
            customLabel={t(`${t_addCalendarItem}.name_of_event`)}
            placeholder={t(`${t_addCalendarItem}.name_of_event_placeholder`)}
            size='small'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <RadioGroup
            label={t(`${t_addCalendarItem}.event_type`)}
            name='type'
            options={[
              {label: 'Public Holiday', value: '0'},
              {label: 'Company Holiday', value: '1'},
            ]}
            row
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb='1rem' mt='1rem'>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <DatePicker
            customLabel={t(`${t_addCalendarItem}.start_date`)}
            withAsterisk
            value={formik.values.startDate as unknown as Date}
            onChange={(val) => formik.setFieldValue('startDate', val)}
            error={formik.touched.startDate && formik.errors.startDate ? String(formik.errors.startDate) : ''}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <DatePicker
            customLabel={t(`${t_addCalendarItem}.end_date`)}
            withAsterisk
            value={formik.values.endDate as unknown as Date}
            onChange={(val) => formik.setFieldValue('endDate', val)}
            error={formik.touched.endDate && formik.errors.endDate ? String(formik.errors.endDate) : ''}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb='1rem' mt='1rem'>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography fontSize='16px'>Start Time</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              sx={{
                '& .MuiOutlinedInput-input': {
                  padding: '8.5px 14px',
                },
                width: '100%'
              }}
              ampm={false}
              value={formik.values.startHours}
              onChange={(val) => formik.setFieldValue('startHours', val)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography fontSize='16px'>{t(`${t_addCalendarItem}.end_time`)}</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              sx={{
                '& .MuiOutlinedInput-input': {
                  padding: '8.5px 14px',
                  border: 'none !important'
                },
                width: '100%'
              }}
              ampm={false}
              value={formik.values.endHours}
              onChange={(val) => formik.setFieldValue('endHours', val)}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container>
        <Grid sm={12} xs={12} md={12} lg={12} xl={12}>
          <Textarea
            name='notes'
            maxRows={7}
            minRows={7}
            customLabel={t(`${t_addCalendarItem}.notes`)}
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

export default AnnualWorkCalendarCreateForm;