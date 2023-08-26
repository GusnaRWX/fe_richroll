/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import { Input, RadioGroup, IconButton, Button } from '@/components/_shared/form';
import {
  Box,
  Button as MuiButton,
  Grid,
  InputAdornment,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  createFilterOptions
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Scheduler } from '@aldabil/react-scheduler';
import CustomModal from '@/components/_shared/common/CustomModal';
import { Text } from '@/components/_shared/common';
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
import { getDetailWorkScheduleRequested, postSimulationEventRequested, postCalculateEventRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { AiOutlineSwapRight, AiOutlinePlus } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { workSchedule } from '@/types/workSchedule';
import { useTranslation } from 'react-i18next';
import { Option } from '@/types/option';

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

interface WorkScheduleFormProps {
  prevPage: () => void;
  setData: React.Dispatch<React.SetStateAction<Employees.PostWorkSchedulePayloadType>>;
  workData: Employees.PostWorkSchedulePayloadType,
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

function WorkScheduleForm({ setData, prevPage }: WorkScheduleFormProps) {
  const calendarRef = useRef<SchedulerRef>(null);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const t_employeeWorkSchedule = 'company_management.employees.form_&_detail.work_schedule_section';
  const t_updateWorkScheduleConfirmation = 'company_management.employees.popup.confirmation_before_add_schedule';
  const t_employeeWorkScheduleForm = 'company_management.employees.popup.add_schedule';
  const { employee } = useAppSelectors((state) => state);
  const { listWorkSchedule } = useAppSelectors((state) => state.option);
  const [openForm, setOpenForm] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [isCustom, setIsCustom] = useState(0);
  const [tempDay, setDayTemp] = useState<Array<number>>([]);
  const [workScheduleID, setWorkScheduleID] = useState('');
  const [workScheduleName, setWorkScheduleName] = useState('');
  const [customProfile, setCustomProfile] = useState(false);
  const filter = createFilterOptions<Option.FreesoloType>();
  const initialValues: Employees.InitialValuesWorkScheduleForm = {
    workScheduleID: '',
    profileName: '',
    type: 0,
    dayType: 0,
    day: [],
    startHour: dayjs(new Date()),
    endHour: dayjs(new Date()),
    flexiWorkHour: 0,
    breakItem: []
  };

  console.log(listWorkSchedule);

  const handleChangeTemplate = (e, value, formik) => {
    if (value?.inputValue) {
      setCustomProfile(true);
      formik.setFieldValue('profileName', value?.inputValue);
      setWorkScheduleName(value?.inputValue);
    }else{
      console.log(value);
      setCustomProfile(false);
      formik.setFieldValue('workScheduleID', value?.value);
      setWorkScheduleID(value?.value as string);
      if (value?.value) {
        dispatch({
          type: getDetailWorkScheduleRequested.toString(),
          payload: value?.value
        });
      } else {
        handleDeleteEventSchedule();
      }
      const itemSelected = listWorkSchedule.find((el) => el.value === value?.value);
      formik.setFieldValue('profileName', itemSelected?.label);
      setWorkScheduleName(itemSelected?.label);
    }
  };

  const handleConfirmOpen = () => {
    if (!customProfile) {
      setConfirmation(true);
    } else {
      handleFormOpen();
    }
  };

  const handleConfirmation = () => {
    if (isCustom === 1) {
      setConfirmation(false);
    } else if (isCustom === 0) {
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
      setDayTemp([]);
      setOpenForm(false);
    }
  };

  const handleDeleteEventSchedule = () => {
    const eventLength = calendarRef?.current?.scheduler?.events?.length;
    calendarRef?.current?.scheduler?.events?.splice(0, eventLength);
  };

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
      dispatch({
        type: postCalculateEventRequested.toString(),
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
      if (!customProfile) {
        setData({
          isCustom: customProfile,
          workScheduleID: String(workScheduleID),
          name: workScheduleName,
          grossHours: employee?.grossHour,
          netHours: employee?.netHour,
          items: dataValues
        });
      } else {
        setData({
          isCustom: customProfile,
          name: workScheduleName,
          grossHours: employee?.grossHour,
          netHours: employee?.netHour,
          items: dataValues
        });
      }
    }
  }, [employee?.events]);

  const handleBack = (e) => {
    e.preventDefault();
    prevPage();
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      {/* <OverlayLoading open={employee?.isLoading} /> */}
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
                  <Grid item xs={9} sm={9} md={9} lg={5.3} xl={5.3}>
                    <Text title={t(`${t_employeeWorkSchedule}.schedule_profile_name`)}/>
                    <Autocomplete
                      id='input_workschedule_id'
                      freeSolo
                      value={formik.values.profileName}
                      size='small'
                      onChange={(e, value) => {handleChangeTemplate(e, value, formik);}}
                      onBlur={formik.handleBlur}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        const { inputValue } = params;
                        const isExis = options?.some((option) => inputValue === option?.label);
                        if(inputValue !== '' && !isExis) {
                          filtered?.push({
                            inputValue,
                            label: (
                              <Box
                                component='span'
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px'
                                }}
                              >
                                <AiOutlinePlus />
                                {t('button.add_new')} {inputValue}
                              </Box>
                            ) as unknown as Element
                          });
                        }
                        return filtered;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      options={listWorkSchedule.map(val => {
                        return {
                          label: val?.label,
                          value: val?.value
                        };
                      }) as Option.FreesoloType[]}
                      getOptionLabel={(option: any) => {
                        if (typeof option === 'string') {
                          return option;
                        }

                        if(option?.inputValue) {
                          return option.inputValue;
                        }

                        return option?.label;
                      }}
                      renderOption={(props, option) => (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <li {...props} style={{ width: '100%' }}>{option?.label}</li>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <Input
                          name='workScheduleID'
                          {...params}
                        />
                      )}
                    />
                    {/* <Select
                      name='workScheduleID'
                      withAsterisk={true}
                      customLabel={t(`${t_employeeWorkSchedule}.schedule_profile_name`)}
                      size='small'
                      fullWidth
                      value={formik.values.workScheduleID || workScheduleID}
                      onChange={(e) => {
                        formik.setFieldValue('workScheduleID', e.target.value);
                        setWorkScheduleID(e.target.value as string);
                        if (e.target.value !== 0) {
                          dispatch({
                            type: getDetailWorkScheduleRequested.toString(),
                            payload: e.target.value
                          });
                        } else {
                          handleDeleteEventSchedule();
                        }
                        const itemSelected = listWorkSchedule.find((el) => el.value === e.target.value);
                        formik.setFieldValue('profileName', itemSelected?.label);
                        setWorkScheduleName(itemSelected?.label);
                      }}
                      error={compareCheck(formik.touched.workScheduleID, Boolean(formik.errors.workScheduleID))}
                      helperText={ifThenElse(formik.touched.workScheduleID, formik.errors.workScheduleID, '')}
                      options={listWorkSchedule}
                    /> */}
                  </Grid>
                  <Grid item xs={3} sm={3} md={3} lg={1.7} xl={1.7} mt={formik.errors.profileName ? '0px' : '28px'}>
                    <MuiButton onClick={() => { handleConfirmOpen(); }} variant='contained' size='small' sx={{ height: '2.5rem' }}><Add />&nbsp; {t('button.add_schedule')}</MuiButton>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={2.5} xl={2.5}>
                    <Input
                      name='weeklyGross'
                      withAsterisk={false}
                      customLabel={t(`${t_employeeWorkSchedule}.weekly_gross_hours`)}
                      size='small'
                      disabled
                      type='number'
                      value={employee?.grossHour}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Typography color='grey.500'>{t(`${t_employeeWorkSchedule}.hours_week`)}</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={2.5} xl={2.5}>
                    <Input
                      name='weeklyNet'
                      withAsterisk={false}
                      customLabel={t(`${t_employeeWorkSchedule}.weekly_net_hours`)}
                      size='small'
                      disabled
                      value={employee?.netHour}
                      type='number'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Typography color='grey.500'>{t(`${t_employeeWorkSchedule}.hours_week`)}</Typography>
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
                  day={null}
                  editable={false}
                  deletable={false}
                  month={null}
                  week={{
                    weekDays: [0, 1, 2, 3, 4, 5, 6],
                    weekStartOn: 1,
                    startHour: 1,
                    endHour: 23,
                    step: 60,
                    cellRenderer: () => {
                      return (
                        <MuiButton
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
                  title={t(`${t_updateWorkScheduleConfirmation}.title`)}
                  width='774px'
                  handleConfirm={() => handleConfirmation()}
                >
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography mb='12px'>{t(`${t_updateWorkScheduleConfirmation}.desc`)}</Typography>
                      <RadioGroup
                        withAsterisk={false}
                        label=''
                        name='isCustom'
                        value={isCustom}
                        onChange={(e) => {
                          setIsCustom(Number(e.target.value));
                        }}
                        row
                        options={[
                          { label: 'Yes', value: 1 },
                          { label: 'No', value: 0 }
                        ]}
                      />
                    </Grid>
                  </Grid>
                </CustomModal>
                <CustomModal
                  open={openForm}
                  handleClose={handleFormClose}
                  title={t(`${t_employeeWorkScheduleForm}.title`)}
                  width='774px'
                  submitText={t('button.save')}
                  handleConfirm={() => {
                    handleSubmit(formik, formik.values);
                    formik.resetForm();
                    formik.setFieldValue('workScheduleID', workScheduleID);
                    formik.setFieldValue('profileName', workScheduleName);
                  }}
                >
                  <Grid container mt='1rem' mb='1rem'>
                    <Grid item sm={5.8}>
                      <Typography mb='12px' color='primary' fontWeight='bold'>{t(`${t_employeeWorkScheduleForm}.work_hour_type`)}</Typography>
                      <RadioGroup
                        withAsterisk={false}
                        label=''
                        name='type'
                        value={formik.values.type}
                        onChange={(e) => { formik.setFieldValue('type', e.target.value); }}
                        options={[
                          { label: 'Fixed Work Hour', value: 0 },
                          { label: 'Flexi Work Hour', value: 1 }
                        ]}
                        row
                        sx={{ fontSize: '12px' }}
                      />
                    </Grid>
                  </Grid>
                  <Typography mb='12px' fontWeight='bold' color='primary'>{t(`${t_employeeWorkScheduleForm}.spesific_working_day_section.title`)}&nbsp;<AsteriskComponent>*</AsteriskComponent></Typography>
                  <Grid container spacing={2} alignItems='end'>
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} alignSelf='center'>
                      <Typography>{t(`${t_employeeWorkScheduleForm}.spesific_working_day_section.works_day`)}s&nbsp;<AsteriskComponent>*</AsteriskComponent></Typography>
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
                      <Typography>{t(`${t_employeeWorkScheduleForm}.spesific_working_day_section.works_hour`)}&nbsp;<AsteriskComponent>*</AsteriskComponent></Typography>
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
                                minTime={formik.values.startHour}
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
                            name='flexiWorkHour'
                            value={formik.values.flexiWorkHour}
                            onChange={(e) => { formik.setFieldValue('flexiWorkHour', e.target.value); }}
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
                              <Typography mb='12px' fontWeight='bold' color='primary'>{t(`${t_employeeWorkScheduleForm}.break_section.title`)}</Typography>
                              {
                                formik.values.breakItem.length > 0 && (
                                  <>
                                    <Grid container spacing={2}>
                                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}><Typography>{t(`${t_employeeWorkScheduleForm}.break_section.break_name`)}</Typography></Grid>
                                      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}><Typography>{t(`${t_employeeWorkScheduleForm}.break_section.start_time`)}</Typography></Grid>
                                      <Grid item xs={.5} sm={.5} md={.5} lg={.5} xl={.5}><Typography></Typography></Grid>
                                      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}><Typography>{t(`${t_employeeWorkScheduleForm}.break_section.end_time`)}</Typography></Grid>
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
                                                onChange={(val) => formik.setFieldValue(`breakItem.${index}.start`, val)}
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
                                                onChange={(val) => formik.setFieldValue(`breakItem.${index}.end`, val)}
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
                                                <BsTrashFill fontSize={20} color='#EF4444' />
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
                                <Add />{t('button.add_break')}
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
      <Grid
        container
        justifyContent='flex-end'
        alignItems='end'
        gap={2}
      >
        <Grid item>
          <Button onClick={handleBack} label='Back' variant='outlined' />
        </Grid>
        <Grid item>
          <Button color='primary' type='submit' label='Next' />
        </Grid>
      </Grid>
    </>
  );
}

export default WorkScheduleForm;