import React, { useEffect, useState, useRef } from 'react';
import { Input, Select, RadioGroup, CheckBox } from '@/components/_shared/form';
import { Button as MuiButton, Grid, InputAdornment, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Scheduler } from '@aldabil/react-scheduler';
import CustomModal from '@/components/_shared/common/CustomModal';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import type { SchedulerRef } from '@aldabil/react-scheduler/types';
import { useFormik } from 'formik';
import { Employees } from '@/types/employees';
import { validationSchemaWorkScheduler } from './validate';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { postSimulationEventRequested, getDetailWorkScheduleRequested, getViewWorkScheduleRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { useRouter } from 'next/router';

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

interface WorkScheduleFormProps {
  setData: React.Dispatch<React.SetStateAction<Employees.PostWorkSchedulePayloadType>>;
}

function EmployeeWorkScheduleEdit({ setData }: WorkScheduleFormProps) {
  const calendarRef = useRef<SchedulerRef>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { employee } = useAppSelectors((state) => state);
  const { listWorkSchedule } = useAppSelectors((state) => state.option);
  const [openForm, setOpenForm] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [isCustom, setIsCustom] = useState('');


  const formik = useFormik({
    initialValues: {
      workScheduleID: '',
      profileName: '',
      type: '0',
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
    } as Employees.InitialValuesWorkScheduleForm,
    validationSchema: validationSchemaWorkScheduler,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleConfirmOpen = () => {
    if (formik.values.workScheduleID !== 0){
      setConfirmation(true);
    }else{
      handleFormOpen();
    }
  };

  const handleFormOpen = () => {
    if (!formik.errors.profileName && formik.values.profileName !== '') {
      setOpenForm(true);
    } else {
      formik.setFieldError('profileName', 'This field is required');
      formik.setFieldTouched('profileName', true, true);
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const handleSubmit = (data) => {
    if (formik.dirty === true) {
      const payload = {
        name: data.profileName,
        scheduleType: parseInt(data.type),
        startHour: dayjs(data.fixedStartTime).format('YYYY-MM-DD HH:mm'),
        endHour: dayjs(data.fixedEndTime).format('YYYY-MM-DD HH:mm'),
        type: parseInt(data.fixedWorkDayType),
        breakHourName: data.breakName,
        breakDuration: data.breakDuration,
        specificBreakHour: data.specifyBreakHour,
        specificBreakStartHour: data.specifyBreakHour === true ? dayjs(data.breakStartTime).format('YYYY-MM-DD HH:mm') : data.breakDuration.toString(),
        specificBreakEndHour: data.specifyBreakHour === true ? dayjs(data.breakEndTime).format('YYYY-MM-DD HH:mm') : '',
        isWithBreak: data.breakName === '' ? false : true
      };
      const payloadFlexi = {
        name: data.profileName,
        scheduleType: parseInt(data.type),
        startHour: data.flexiWorkHour.toString(),
        endHour: '',
        type: 5,
        startDay: parseInt(data.flexiWorkDay),
        endDay: 0,
        breakHourName: data.breakName,
        breakDuration: data.breakDuration,
        specificBreakHour: false,
        specificBreakStartHour: data.breakDuration.toString(),
        specificBreakEndHour: '',
        isWithBreak: data.breakName === '' ? false : true
      };
      handleDynamicDay(payload, data, data.fixedWorkDayType);
      dispatch({
        type: postSimulationEventRequested.toString(),
        payload: data.type === '0' ? payload : payloadFlexi
      });

      setOpenForm(false);
    }
  };

  const handleDeleteEventSchedule = () => {
    const eventLength = calendarRef?.current?.scheduler?.events?.length;
    calendarRef?.current?.scheduler?.events?.splice(0, eventLength);
  };

  const handleConfirmation = () => {
    if (isCustom === '1'){
      setConfirmation(false);
    }else if(isCustom === '0'){
      handleFormOpen();
      setConfirmation(false);
    }
  };

  const handleDynamicDay = (payload, data, type) => {
    switch (type) {
      case '0': {
        const tempData = {
          startDay: data.type === '0' ? parseInt(data.fixedStartDay) : parseInt(data.flexiWorkDay),
        };
        return Object.assign(payload, tempData);
      }
        break;
      case '1': {
        const tempData = {
          startDay: 0,
          endDay: 6
        };
        return Object.assign(payload, tempData);
      }
        break;
      case '2': {
        const tempData = {
          startDay: 7,
          endDay: 0
        };
        return Object.assign(payload, tempData);
      }
        break;
      case '3': {
        const tempData = {
          startDay: 8,
          endDay: 0
        };
        return Object.assign(payload, tempData);
      }
        break;
      case '4': {
        const tempData = {
          startDay: data.type === '0' ? parseInt(data.fixedStartDay) : parseInt(data.flexiWorkDay),
          endDay: data.type === '0' ? parseInt(data.fixedEndDay) : 0,
        };
        return Object.assign(payload, tempData);
      }
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch({
      type: getViewWorkScheduleRequested.toString(),
      payload: router.query.id
    });
  }, []);

  useEffect(() => {
    calendarRef?.current?.scheduler?.confirmEvent(employee?.workScheduleDetail?.events, 'create');
    formik.setFieldValue('profileName', employee?.workScheduleDetail?.name);
    formik.setFieldValue('workScheduleID', employee?.workScheduleDetail.workScheduleId);
    setData({
      workScheduleID: employee?.workScheduleDetail.workScheduleId,
      name: employee?.workScheduleDetail?.name,
      grossHours: employee?.workScheduleDetail?.grossHour,
      netHours: employee?.workScheduleDetail?.netHour,
      items: employee?.workScheduleDetail?.events
    });
  }, [employee?.workScheduleDetail?.events]);

  useEffect(() => {
    calendarRef?.current?.scheduler?.confirmEvent(employee?.events, 'create');
    const dataValues: Array<Employees.ItemsWorkScheduleType> = [];
    employee?.events.map((item) => {
      dataValues.push({
        day: item.day,
        eventId: item.event_id,
        label: item.title,
        name: item.name,
        start: dayjs(item.start).format('YYYY-MM-DD HH:mm'),
        end: dayjs(item.end).format('YYYY-MM-DD HH:mm'),
        isBreak: item.isBreak,
        isDuration: item.isDuration,
        color: item.color,
        duration: item.duration,
        allDay: item.allDay,
        scheduleType: item.scheduleType,
        type: item.type
      });
    });
    if (formik.values.workScheduleID !== 0) {
      setData({
        workScheduleID: formik.values.workScheduleID,
        name: formik.values.profileName,
        grossHours: employee?.grossHour,
        netHours: employee?.netHour,
        isCustom: isCustom === '' || isCustom === '1' ? false : true,
        items: dataValues
      });
    }else {
      setData({
        name: formik.values.profileName,
        grossHours: employee?.grossHour,
        netHours: employee?.netHour,
        isCustom: isCustom === '' || isCustom === '1' ? false : true,
        items: dataValues
      });
    }


  }, [employee?.events]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }


  return (
    <>
      <Grid container spacing={4} mb='1rem' alignItems='center'>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          <Select
            name='workScheduleID'
            withAsterisk={true}
            customLabel='Schedule Profile Name'
            size='small'
            fullWidth
            value={formik.values.workScheduleID}
            onChange={(e) => {
              formik.setFieldValue('workScheduleID', e.target.value);
              if (e.target.value !== 0){
                dispatch({
                  type: getDetailWorkScheduleRequested.toString(),
                  payload: e.target.value
                });
              }else{
                handleDeleteEventSchedule();
              }
              const itemSelected = listWorkSchedule.find((el) => el.value === e.target.value);
              formik.setFieldValue('profileName', itemSelected?.label);
            }}
            error={compareCheck(formik.touched.workScheduleID, Boolean(formik.errors.workScheduleID))}
            helperText={ifThenElse(formik.touched.workScheduleID, formik.errors.workScheduleID, '')}
            options={listWorkSchedule}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} mt={formik.errors.profileName ? '0px' : '28px'}>
          <MuiButton onClick={handleConfirmOpen} variant='contained' size='small' sx={{ height: '2.5rem' }}><Add />&nbsp; Create Schedule</MuiButton>
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
            type='number'
            value={employee?.grossHour}
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
            value={employee?.netHour}
            type='number'
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
        disableViewNavigator={false}
        ref={calendarRef}
        events={[]}
        navigation={false}
        day={null}
        month={null}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
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
        open={confirmation}
        handleClose={() => setConfirmation(false)}
        title='Modify Default Work Schedule'
        width='774px'
        handleConfirm={() => handleConfirmation()}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography mb='12px'>Do you want use Work Schedule Profile?</Typography>
            <RadioGroup
              withAsterisk={false}
              label=''
              name='isCustom'
              value={isCustom}
              onChange={(e) => {
                setIsCustom(e.target.value);
              }}
              row
              options={[
                { label: 'Yes', value: '1' },
                { label: 'No', value: '0' }
              ]}
            />
          </Grid>
        </Grid>
      </CustomModal>
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
                { label: 'Fixed Work Hour', value: '0' },
                { label: 'Flexi Work Hour', value: '1' }
              ]}
              row
              sx={{ fontSize: '12px' }}
            />
          </Grid>
        </Grid>
        {
          formik.values.type === '1' && (
            <>
              <Typography mb='12px' fontWeight='bold' color='primary'>Working Hour Duration<AsteriskComponent>*</AsteriskComponent></Typography>
              <Grid mb='1rem' container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Input
                    name='flexiWorkHour'
                    withAsterisk={false}
                    customLabel='Working Hour'
                    type='number'
                    fullWidth
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
          formik.values.type === '0' && (
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
                    disabled={formik.values.fixedWorkDayType !== '4' && formik.values.fixedWorkDayType !== '0'}
                    value={formik.values.fixedStartDay}
                    onChange={formik.handleChange}
                    options={[
                      { label: 'Monday', value: '0' },
                      { label: 'Tuesday', value: '1' },
                      { label: 'Wendesday', value: '2' },
                      { label: 'Thursday', value: '3' },
                      { label: 'Friday', value: '4' },
                      { label: 'Saturday', value: '5' },
                      { label: 'Sunday', value: '6' }
                    ]}
                    sx={{
                      backgroundColor: formik.values.fixedWorkDayType !== '4' && formik.values.fixedWorkDayType !== '0' ? '#c3c3c5' : ''
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Select
                    customLabel='To'
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='fixedEndDay'
                    disabled={formik.values.fixedWorkDayType !== '4'}
                    value={formik.values.fixedEndDay}
                    onChange={formik.handleChange}
                    options={[
                      { label: 'Monday', value: '0' },
                      { label: 'Tuesday', value: '1' },
                      { label: 'Wendesday', value: '2' },
                      { label: 'Thursday', value: '3' },
                      { label: 'Friday', value: '4' },
                      { label: 'Saturday', value: '5' },
                      { label: 'Sunday', value: '6' }
                    ]}
                    sx={{
                      backgroundColor: formik.values.fixedWorkDayType !== '4' ? '#c3c3c5' : ''
                    }}
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
                      { label: 'This Day Only', value: '0' },
                      { label: 'Full Week', value: '1' },
                      { label: 'Repeat during Weekend (Saturday-Sunday)', value: '2' },
                      { label: 'Repeat during Weekday (Monday-Friday)', value: '3' },
                      { label: 'Custom Repeat', value: '4' },
                    ]}
                  />
                </Grid>
              </Grid>
            </>
          )
        }
        {
          formik.values.type === '1' && (
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
                      { label: 'Monday', value: '0' },
                      { label: 'Tuesday', value: '1' },
                      { label: 'Wendesday', value: '2' },
                      { label: 'Thursday', value: '3' },
                      { label: 'Friday', value: '4' },
                      { label: 'Saturday', value: '5' },
                      { label: 'Sunday', value: '6' },
                      { label: 'Weekday (Saturday - Sunday)', value: '7' },
                      { label: 'Weekend (Monday - Friday)', value: '8' },
                      { label: 'Full Week', value: '9' }
                    ]}
                  />
                </Grid>
              </Grid>
            </>
          )
        }
        <Typography mt='12px' mb='12px' fontWeight='bold' color='primary'>Add Break</Typography>
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
        {
          formik.values.type === '0' && (
            <>
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
            </>
          )
        }
      </CustomModal>
    </>
  );
}

export default EmployeeWorkScheduleEdit;