import React, { useEffect, useState, useRef } from 'react';
import { Input, Select } from '@/components/_shared/form';
import { Button as MuiButton, Grid, InputAdornment, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Scheduler } from '@aldabil/react-scheduler';
import CustomModal from '@/components/_shared/common/CustomModal';
import { RadioGroup, CheckBox } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import type { SchedulerRef } from '@aldabil/react-scheduler/types';
import { useFormik } from 'formik';
import { workSchedule } from '@/types/workSchedule';
import { validationSchemaWorkScheduler } from './validate';
import dayjs from 'dayjs';


const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

const FlexBoxRow = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem'
}));


function WorkScheduleCreateForm() {
  const calendarRef = useRef<SchedulerRef>(null);
  const [profileName, setProfileName] = useState('');
  const [openForm, setOPenForm] = useState(false);
  const [hydrated, setHaydrated] = useState(false);
  const formik = useFormik({
    initialValues: {
      type: 'fixed',
      flexiWorkHour: '',
      flexiMinWorkHour: '7',
      fixedStartDay: '',
      fixedEndDay: '',
      fixedStartTime: '',
      fixedEndTime: '',
      fixedWorkDayType: '',
      flexiWorkDay: '',
      breakName: '',
      breakDuration: '',
      specifyBreakHour: false,
      breakStartTime: '',
      breakEndTime: ''
    } as workSchedule.initialValuesWorkScheduleForm,
    validationSchema: validationSchemaWorkScheduler,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });


  const handleFormOpen = () => {
    setOPenForm(true);
  };

  const handleFormClose = () => {
    setOPenForm(false);
  };

  const handleSubmit = (data) => {
    if (formik.dirty === true) {
      const payload = {
        type: data.type,
        flexiWorkHour: data.flexiWorkHour,
        flexiMinWorkHour: data.flexiMinWorkHour,
        fixedStartDay: data.fixedStartDay,
        fixedEndDay: data.fixedEndDay,
        fixedStartTime: dayjs(data.fixedStartTime).format('HH:mm:ss A'),
        fixedEndTime: dayjs(data.fixedEndTime).format('HH:mm:ss A'),
        fixedWorkDayType: data.fixedWorkDayType,
        flexiWorkDay: data.flexiWorkDay,
        breakName: data.breakName,
        breakDuration: data.breakDuration,
        specifyBreakHour: data.specifyBreakHour,
        breakStartTime: dayjs(data.breakStartTime).format('HH:mm:ss A'),
        breakEndTime: dayjs(data.breakEndTime).format('HH:mm:ss A')
      };
      console.log(payload);
      handleFormClose();
    }
  };

  const handleInput = (e) => {
    setProfileName(e.target.value);
  };

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <>
      <Grid container spacing={4} mb='1rem' alignItems='flex-end'>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          <Input
            name='profileName'
            withAsterisk={true}
            customLabel='Schedule Profile Name'
            placeholder='Input Profile Name'
            size='small'
            value={profileName}
            onChange={(e) => handleInput(e)}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <MuiButton onClick={handleFormOpen} variant='contained' size='small' sx={{ height: '2.5rem' }}><Add />&nbsp; Create Schedule</MuiButton>
        </Grid>
      </Grid>
      <Grid container spacing={2} mb='1rem'>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Input
            name='weeklyGross'
            withAsterisk={false}
            customLabel='Weekly Gross Hours'
            placeholder='Input Weekly Gross'
            size='small'
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography color='grey.500'>Hours/Week</Typography>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Input
            name='weeklyNet'
            withAsterisk={false}
            customLabel='Weekly Net Hours'
            placeholder='Input Weekly Net'
            size='small'
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography color='grey.500'>Hours/Week</Typography>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      <Scheduler
        view='week'
        disableViewNavigator={true}
        ref={calendarRef}
        events={[]}
        day={null}
        month={null}
        week={{
          weekDays: [0, 1,2,3,4,5,6],
          weekStartOn: 1,
          startHour: 1,
          endHour: 23,
          step: 60,
          cellRenderer: () => {
            return (
              <Button
                onClick={() => {
                  return null;
                }}
              />
            );
          }
        }}
      />
      <CustomModal
        open={openForm}
        handleClose={handleFormClose}
        title='Work Schedule Form'
        width='774px'
        handleConfirm={() => formik.submitForm()}
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item sm={5.8}>
            <Typography mb='12px' color='primary' fontWeight='bold'>Work Hour Type</Typography>
            <RadioGroup
              withAsterisk={false}
              label=''
              name='type'
              value={formik.values.type}
              onChange={formik.handleChange}
              options={[
                { label: 'Fixed Work Hour', value: 'fixed' },
                { label: 'Flexi Work Hour', value: 'flexi' }
              ]}
              row
              sx={{ fontSize: '12px' }}
            />
          </Grid>
        </Grid>
        {
          formik.values.type === 'flexi' && (
            <>
              <Typography mb='12px' fontWeight='bold' color='primary'>Working Hour Duration<AsteriskComponent>*</AsteriskComponent></Typography>
              <Grid mb='1rem' container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Input
                    name='flexiWorkHour'
                    withAsterisk={false}
                    customLabel='Working Hour'
                    type='number'
                    placeholder='Input Working Hour'
                    size='small'
                    value={formik.values.flexiWorkHour}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.flexiWorkHour && Boolean(formik.errors.flexiWorkHour)}
                    helperText={formik.touched.flexiWorkHour && formik.errors.flexiWorkHour}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Typography color='grey.500'>Hours/day</Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Input
                    name='flexiMinWorkHour'
                    withAsterisk={false}
                    customLabel='Minimun Working Hour'
                    size='small'
                    disabled
                    value={formik.values.flexiMinWorkHour}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Typography color='grey.500'>Hours/day</Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </>
          )
        }
        {
          formik.values.type === 'fixed' && (
            <>
              <Typography mb='12px' fontWeight='bold' color='primary'>Spesific Working Day<AsteriskComponent>*</AsteriskComponent></Typography>
              <Grid container spacing={2} alignItems='end' mb='1rem'>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Select
                    customLabel='Works Days'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='fixedStartDay'
                    value={formik.values.fixedStartDay}
                    onChange={formik.handleChange}
                    options={[
                      { label: 'Monday', value: 'Monday' },
                      { label: 'Tuesday', value: 'Tuesday' },
                      { label: 'Wendesday', value: 'Wendesday' },
                      { label: 'Thursday', value: 'Thursday' },
                      { label: 'Friday', value: 'Friday' },
                    ]}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Select
                    customLabel='To'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='fixedEndDay'
                    value={formik.values.fixedEndDay}
                    onChange={formik.handleChange}
                    options={[
                      { label: 'Monday', value: 'Monday' },
                      { label: 'Tuesday', value: 'Tuesday' },
                      { label: 'Wendesday', value: 'Wendesday' },
                      { label: 'Thursday', value: 'Thursday' },
                      { label: 'Friday', value: 'Friday' },
                    ]}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems='end' mb='1rem'>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Typography width='150px' fontSize='16px'>Work Hours</Typography>
                  <FlexBoxRow>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={formik.values.fixedStartTime}
                        onChange={(val) => formik.setFieldValue('fixedStartTime', val, true)}
                        sx={{
                          '& .MuiOutlinedInput-input': {
                            padding: '8.5px 14px',
                            border: 'none !important'
                          },
                          width: '100%'
                        }}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={formik.values.fixedEndTime}
                        onChange={(val) => formik.setFieldValue('fixedEndTime', val, true)}
                        sx={{
                          '& .MuiOutlinedInput-input': {
                            padding: '8.5px 14px',
                            border: 'none !important'
                          },
                          width: '100%'
                        }}
                      />
                    </LocalizationProvider>
                  </FlexBoxRow>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Select
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='fixedWorkDayType'
                    value={formik.values.fixedWorkDayType}
                    onChange={formik.handleChange}
                    options={[
                      { label: 'This Day Only', value: '1' },
                      { label: 'Full Week', value: '2' },
                      { label: 'Repeat during Weekend (Saturday-Sunday)', value: '3' },
                      { label: 'Repeat during Weekday (Monday-Friday)', value: '4' },
                      { label: 'Custom Repeat', value: '5' },
                    ]}
                  />
                </Grid>
              </Grid>
            </>
          )
        }
        {
          formik.values.type === 'flexi' && (
            <>
              <Typography mb='12px' fontWeight='bold' color='primary'>Spesific Working Day</Typography>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Select
                    customLabel='Works Days'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='flexiWorkDay'
                    value={formik.values.flexiWorkDay}
                    onChange={formik.handleChange}
                    options={[
                      { label: 'Monday', value: 'Monday' },
                      { label: 'Tuesday', value: 'Tuesday' },
                      { label: 'Wendesday', value: 'Wendesday' },
                      { label: 'Thursday', value: 'Thursday' },
                      { label: 'Friday', value: 'Friday' },
                      { label: 'Saturday', value: 'Saturday' },
                      { label: 'Sunday', value: 'Sunday' },
                      { label: 'Weekday (Monday - Monday)', value: 'Weekday' },
                      { label: 'Weekend (Saturday - Sunday)',  value: 'Weekend'},
                      { label: 'Full Week', value: 'Fullweek' }
                    ]}
                  />
                </Grid>
              </Grid>
            </>
          )
        }
        <Typography mb='12px' fontWeight='bold' color='primary'>Add Break</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Input
              name='breakName'
              withAsterisk={false}
              customLabel='Break Name'
              placeholder='Input Break Name'
              value={formik.values.breakName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size='small'
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Input
              name='breakDuration'
              withAsterisk={false}
              customLabel='Break Duration'
              placeholder='Input Break Duration'
              type='number'
              value={formik.values.breakDuration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size='small'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography color='grey.500'>Hours/day</Typography>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <CheckBox
          customLabel='Specify Break Hour'
          name='specifyBreakHour'
          value={formik.values.specifyBreakHour}
          onChange={formik.handleChange}
        />
        {
          formik.values.specifyBreakHour === true && (
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={formik.values.breakStartTime}
                    onChange={(val) => formik.setFieldValue('breakStartTime', val, true)}
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
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={formik.values.breakEndTime}
                    onChange={(val) => formik.setFieldValue('breakEndTime', val, true)}
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
          )
        }
      </CustomModal>
    </>
  );
}

export default WorkScheduleCreateForm;