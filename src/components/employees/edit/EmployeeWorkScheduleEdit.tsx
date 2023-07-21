import React, { useEffect, useState, useRef } from 'react';
import { Input, Select, RadioGroup, IconButton } from '@/components/_shared/form';
import { Button as MuiButton, Grid, InputAdornment, Typography, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Scheduler } from '@aldabil/react-scheduler';
import CustomModal from '@/components/_shared/common/CustomModal';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import type { ProcessedEvent, SchedulerRef } from '@aldabil/react-scheduler/types';
import { FieldArray, Formik, Form as FormikForm } from 'formik';
import { Employees } from '@/types/employees';
import { validationSchemaWorkScheduler } from './validate';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { getDetailWorkScheduleRequested, getViewWorkScheduleRequested, clearGrossNet, postSimulationEventRequested, postCalculateEventRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';

import { AiOutlineSwapRight } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { workSchedule } from '@/types/workSchedule';
import { useRouter } from 'next/router';

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

// const FlexBoxRow = styled('div')(() => ({
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'flex-start',
//   gap: '1rem'
// }));

interface WorkScheduleFormProps {
  setData: React.Dispatch<React.SetStateAction<Employees.PostWorkSchedulePayloadType>>;
}

const ArrDays = [
  {
    label: 'Mon',
    value: 0,
    checked: false
  },
  {
    label: 'Tue',
    value: 1,
    checked: false
  },
  {
    label: 'Wed',
    value: 2,
    checked: false
  },
  {
    label: 'Thu',
    value: 3,
    checked: false
  },
  {
    label: 'Fri',
    value: 4,
    checked: false
  },
  {
    label: 'Sat',
    value: 5,
    checked: false
  },
  {
    label: 'Sun',
    value: 6,
    checked: false
  },
];

function EmployeeWorkScheduleEdit({ setData }: WorkScheduleFormProps) {
  const calendarRef = useRef<SchedulerRef>(null);
  const dispatch = useAppDispatch();
  const { employee } = useAppSelectors((state) => state);
  const { listWorkSchedule } = useAppSelectors((state) => state.option);
  const [openForm, setOpenForm] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [isCustom, setIsCustom] = useState('');
  const [tempDay, setDayTemp] = useState<Array<number>>([]);
  const [workScheduleName, setWorkScheduleName] = useState('');
  const [workScheduleID, setWorkScheduleID] = useState(employee?.workScheduleId);
  const router = useRouter();

  const initialValues: Employees.InitialValuesWorkScheduleForm = {
    workScheduleID: employee?.workScheduleId,
    profileName: '',
    type: 0,
    dayType: 0,
    day: [],
    startHour: dayjs(new Date()),
    endHour: dayjs(new Date()),
    flexiWorkHour: 0,
    breakItem: []
  };


  const handleConfirmOpen = (formik) => {
    if (formik.values.workScheduleID !== 0) {
      setConfirmation(true);
    } else {
      handleFormOpen();
    }
  };

  const handleConfirmation = () => {
    if (isCustom === '1') {
      setConfirmation(false);
    } else if (isCustom === '0') {
      handleFormOpen();
      setConfirmation(false);
    }
  };

  const handleFormOpen = () => {
    setOpenForm(true);
  };

  const onSelectedDay = (formik, item, e) => {
    if (e.target.checked) {
      const temp: Array<number> = [...tempDay, item?.value];
      setDayTemp(temp);
      formik.setFieldValue('day', temp);
    } else {
      const temp = tempDay.filter(v => v !== item?.value);
      setDayTemp(temp);
      formik.setFieldValue('day', temp);
    }
  };

  const onSelecWorkDay = (formik, val) => {
    switch (val) {
      case '0': {
        const temp: Array<number> = [0, 1, 2, 3, 4, 5, 6];
        formik.setFieldValue('day', temp);
        return setDayTemp(temp);
      }
      case '1': {
        const temp: Array<number> = [0, 1, 2, 3, 4];
        formik.setFieldValue('day', temp);
        return setDayTemp(temp);
      }
      case '2': {
        const temp: Array<number> = [5, 6,];
        formik.setFieldValue('day', temp);
        return setDayTemp(temp);
      }
      case '3': {
        const temp: Array<number> = [];
        formik.setFieldValue('day', temp);
        return setDayTemp(temp);
      }
      default: {
        return setDayTemp([]);
      }
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const checkValDay = (value) => {
    return tempDay.some(v => v === value);
  };

  const handleSubmit = (formik, data) => {
    if (formik.dirty === true) {
      const tempData: Array<workSchedule.BreakItemType> = [];
      data.breakItem.map((item) => {
        tempData.push({
          name: item.name,
          start: dayjs(item.start).format('HH:mm'),
          end: dayjs(item.end).format('HH:mm')
        });
      });
      const payload = {
        name: workScheduleName,
        scheduleType: Number(data.type),
        type: Number(data.dayType),
        days: data.day,
        start: dayjs(data.startHour).format('HH:mm'),
        end: dayjs(data.endHour).format('HH:mm'),
        breaks: tempData
      };
      const payloadFlexi = {
        name: workScheduleName,
        scheduleType: Number(data.type),
        type: Number(data.dayType),
        days: data.day,
        start: data.flexiWorkHour,
        end: '',
        breaks: []
      };
      dispatch({
        type: postSimulationEventRequested.toString(),
        payload: Number(data.type) === 0 ? payload : payloadFlexi
      });
      setOpenForm(false);
    }
  };

  const handleDeleteEventSchedule = () => {
    const eventLength = calendarRef?.current?.scheduler?.events?.length;
    calendarRef?.current?.scheduler?.events?.splice(0, eventLength);
  };

  // useEffect(() => {
  //   handleDeleteEventSchedule();
  // }, []);

  useEffect(() => {
    dispatch({
      type: getViewWorkScheduleRequested.toString(),
      payload: router.query.id
    });
  }, []);

  useEffect(() => {
    if (calendarRef?.current) {
      const mergeData = [...calendarRef?.current?.scheduler?.events as ProcessedEvent[] || [] as ProcessedEvent[]];
      const newData = [...mergeData.filter((e) => {
        const found = employee?.events.some((el) => dayjs(el.start).format('YYYY-MM-DD') === dayjs(e.start).format('YYYY-MM-DD'));
        if (found) {
          return false;
        }
        return true;
      }), ...employee?.events as ProcessedEvent[]];
      dispatch({ type: postCalculateEventRequested.toString(),
        payload: {
          items: newData
        }
      });
      handleDeleteEventSchedule();
      calendarRef?.current?.scheduler?.confirmEvent(newData, 'create');
      const dataValues: Array<Employees.ItemsWorkScheduleType> = [];
      newData?.map((item) => {
        dataValues.push({
          day: item.day,
          eventId: item.event_id,
          label: item.title,
          name: item.name,
          start: dayjs(item.start).toISOString(),
          end: dayjs(item.end).toISOString(),
          isBreak: item.isBreak,
          isDuration: item.isDuration,
          color: item.color,
          duration: Number(item.duration),
          allDay: item.allDay,
          scheduleType: item.scheduleType,
          type: item.type
        });
      });
      if (Number(workScheduleID) != 0) {
        setData({
          workScheduleID: String(workScheduleID),
          name: workScheduleName,
          grossHours: employee?.grossHour,
          netHours: employee?.netHour,
          items: dataValues
        });
      } else {
        setData({
          name: workScheduleName,
          grossHours: employee?.grossHour,
          netHours: employee?.netHour,
          items: dataValues
        });
      }
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
      {/* <OverlayLoading open={employee?.isLoading}/> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaWorkScheduler}
        onSubmit={(formik, values) => {
          handleSubmit(formik, values);
        }}
      >
        {
          (formik) => (
            <>
              <FormikForm>
                <Grid container spacing={3} mb='1rem' alignItems='center'>
                  <Grid item xs={6.5} sm={6.5} md={6.5} lg={6.5} xl={6.5}>
                    <Select
                      name='workScheduleID'
                      withAsterisk={true}
                      customLabel='Schedule Profile Name'
                      size='small'
                      fullWidth
                      value={workScheduleID}
                      onChange={(e) => {
                        formik.setFieldValue('workScheduleID', e.target.value);
                        setWorkScheduleID(e.target.value as string);
                        const itemSelected = listWorkSchedule.find((el) => el.value === e.target.value);
                        setWorkScheduleName(itemSelected?.label);
                        if (e.target.value !== 0) {
                          handleDeleteEventSchedule();
                          dispatch({
                            type: getDetailWorkScheduleRequested.toString(),
                            payload: e.target.value
                          });
                        } else {
                          handleDeleteEventSchedule();
                          dispatch({
                            type: clearGrossNet.toString()
                          });
                        }
                        formik.setFieldValue('profileName', itemSelected?.label);
                      }}
                      error={compareCheck(formik.touched.workScheduleID, Boolean(formik.errors.workScheduleID))}
                      helperText={ifThenElse(formik.touched.workScheduleID, formik.errors.workScheduleID, '')}
                      options={listWorkSchedule}
                    />
                  </Grid>
                  <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5} mt={formik.errors.profileName ? '0px' : '28px'}>
                    <MuiButton onClick={() => { handleConfirmOpen(formik); }} variant='contained' size='small' sx={{ height: '2.5rem' }}><Add />&nbsp; Add schedule</MuiButton>
                  </Grid>
                  <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
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
                  <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
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
                  ref={calendarRef}
                  events={[]}
                  editable={false}
                  deletable={false}
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
                          onClick={(e) => {
                            e.preventDefault();
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
                  submitText='Save'
                  handleConfirm={() => {
                    // formik.submitForm()
                    handleSubmit(formik, formik.values);
                    formik.resetForm();
                  }}
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
                          { label: 'Fixed Work Hour', value: 0 },
                          { label: 'Flexi Work Hour', value: 1 }
                        ]}
                        row
                        sx={{ fontSize: '12px' }}
                      />
                    </Grid>
                  </Grid>
                  <Typography mb='12px' fontWeight='bold' color='primary'>Spesific Working Day&nbsp;<AsteriskComponent>*</AsteriskComponent></Typography>
                  <Grid container spacing={2} alignItems='end'>
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} alignSelf='center'>
                      <Typography>Work Days&nbsp;<AsteriskComponent>*</AsteriskComponent></Typography>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                      <RadioGroup
                        withAsterisk={false}
                        label=''
                        row
                        name='dayType'
                        value={formik.values.dayType}
                        onChange={(e) => { formik.setFieldValue('dayType', e.target.value); onSelecWorkDay(formik, e.target.value); }}
                        options={[
                          { label: 'Daily', value: '0' },
                          { label: 'Weekday', value: '1' },
                          { label: 'Weekend', value: '2' },
                          { label: 'Custom', value: '3' }
                        ]}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems='end' mb='1rem'>
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} alignSelf='center'></Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                      <FormGroup row={true}>
                        {
                          ArrDays.map((item) => (
                            <FormControlLabel
                              sx={{ marginRight: '1.7rem' }}
                              key={item.label}
                              value={item.value}
                              control={
                                <Checkbox
                                  onChange={(e) => onSelectedDay(formik, item, e)}
                                  checked={checkValDay(item?.value)}
                                />
                              }
                              label={item.label}
                            />
                          ))
                        }
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} mb='2rem'>
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} alignSelf='center'>
                      <Typography>Work Hour&nbsp;<AsteriskComponent>*</AsteriskComponent></Typography>
                    </Grid>
                    {
                      formik.values.type == '0' && (
                        <>
                          <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                ampm={false}
                                value={formik.values.startHour}
                                onChange={(val) => formik.setFieldValue('startHour', val, true)}
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
                          <Grid item xs={.5} sm={.5} md={.5} lg={.5} xl={.5} alignSelf='center'>
                            <AiOutlineSwapRight />
                          </Grid>
                          <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                ampm={false}
                                value={formik.values.endHour}
                                onChange={(val) => formik.setFieldValue('endHour', val, true)}
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
                        </>
                      )
                    }
                    {
                      formik.values.type == '1' && (
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <Input
                            withAsterisk={false}
                            size='small'
                            type='number'
                            name='flexiWorkHour'
                            value={formik.values.flexiWorkHour}
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
                      )
                    }
                  </Grid>
                  {
                    formik.values.type == '0' && (
                      <FieldArray
                        name='breakItem'
                        render={(data) => {
                          return (
                            <>
                              <Typography mb='12px' fontWeight='bold' color='primary'>Add Break</Typography>
                              {
                                formik.values.breakItem.length > 0 && (
                                  <>
                                    <Grid container spacing={2}>
                                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}><Typography>Break Name</Typography></Grid>
                                      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}><Typography>Start Time</Typography></Grid>
                                      <Grid item xs={.5} sm={.5} md={.5} lg={.5} xl={.5}><Typography></Typography></Grid>
                                      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}><Typography>End Time</Typography></Grid>
                                      <Grid item xs={1} sm={1} md={1} lg={1} xl={1}></Grid>
                                    </Grid>
                                    {
                                      formik?.values?.breakItem.map((item, index) => (
                                        <Grid key={index} container spacing={2} mb='1rem'>
                                          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                            <Input
                                              withAsterisk={false}
                                              size='small'
                                              value={item?.name}
                                              onChange={(e) => { formik.setFieldValue(`breakItem.${index}.name`, e.target.value); }}
                                            />
                                          </Grid>
                                          <Grid item xs={3.1} sm={3.1} md={3.1} lg={3.1} xl={3.1}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                              <TimePicker
                                                ampm={false}
                                                value={item?.start}
                                                minTime={formik.values.startHour}
                                                maxTime={formik.values.endHour}
                                                onChange={(val) => formik.setFieldValue(`breakItem.${index}.start`, val, true)}
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
                                          <Grid item xs={.5} sm={.5} md={.5} lg={.5} xl={.5} alignSelf='center'>
                                            <AiOutlineSwapRight />
                                          </Grid>
                                          <Grid item xs={3.1} sm={3.1} md={3.1} lg={3.1} xl={3.1}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                              <TimePicker
                                                ampm={false}
                                                value={item?.end}
                                                minTime={formik.values.startHour}
                                                maxTime={formik.values.endHour}
                                                onChange={(val) => formik.setFieldValue(`breakItem.${index}.end`, val, true)}
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
                                          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                                            <IconButton
                                              parentColor='red.100'
                                              onClick={() => { data.remove(index); }}
                                              icons={
                                                <BsTrashFill fontSize={20} color='#EF4444'/>
                                              }
                                            />
                                          </Grid>
                                        </Grid>
                                      ))
                                    }
                                  </>
                                )
                              }
                              <MuiButton
                                size='medium'
                                sx={{ marginBottom: '1rem', color: '#FFFFFF' }}
                                variant='contained'
                                color='secondary'
                                onClick={() => {
                                  data.insert(
                                    formik.values.breakItem.length + 1,
                                    {
                                      name: '',
                                      start: dayjs(new Date()),
                                      end: dayjs(new Date())
                                    }
                                  );
                                }}
                              >
                                <Add />Add Break
                              </MuiButton>
                            </>
                          );
                        }}
                      />
                    )
                  }
                </CustomModal>
              </FormikForm>
            </>
          )
        }
      </Formik>
    </>
  );
}

export default EmployeeWorkScheduleEdit;