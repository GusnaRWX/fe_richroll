import React, { useState } from 'react';
import { Input, Select } from '@/components/_shared/form';
import { Button as MuiButton, Grid, InputAdornment, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Scheduler } from '@aldabil/react-scheduler';
import CustomModal from '@/components/_shared/common/CustomModal';
import {RadioGroup, CheckBox} from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const eventsData = [
  {
    event_id: 1,
    title: 'Event 1',
    start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    disabled: true,
    admin_id: [1, 2, 3, 4]
  },
  {
    event_id: 2,
    title: 'Event 2',
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 2,
    color: '#50b500'
  },
  {
    event_id: 3,
    title: 'Event 3',
    start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 1,
    editable: false,
    deletable: false
  },
  {
    event_id: 4,
    title: 'Event 4',
    start: new Date(
      new Date(new Date(new Date().setHours(9)).setMinutes(30)).setDate(
        new Date().getDate() - 2
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    admin_id: 2,
    color: '#900000'
  },
  {
    event_id: 5,
    title: 'Event 5',
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
        new Date().getDate() - 2
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    admin_id: 2,
    editable: true
  },
  {
    event_id: 6,
    title: 'Event 6',
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
        new Date().getDate() - 4
      )
    ),
    end: new Date(new Date(new Date().setHours(14)).setMinutes(0)),
    admin_id: 2
  }
];

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
  const [profileName, setProfileName] = useState('');
  const [openForm, setOPenForm] = useState(false);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [initialValues, setInitialValues] = useState({
    type: '',
    startDays: '',
    endDays: '',
    workHour: '',
    dayType: '',
    breakName: '',
    breakDuration: '',
    specifyBreak: false,
    breakHour: ''
  });

  const handleFormOpen = () => {
    setOPenForm(true);
  };

  const handleFormClose = () => {
    setOPenForm(false);
  };

  const handleInput = (e) => {
    setProfileName(e.target.value);
  };
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
      <Scheduler events={eventsData}/>
      <CustomModal
        open={openForm}
        handleClose={handleFormClose}
        title='Work Schedule Form'
        width='774px'
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item sm={5.8}>
            <Typography mb='12px' color='primary' fontWeight='bold'>Work Hour Type</Typography>
            <RadioGroup
              withAsterisk={false}
              label=''
              name='type'
              options={[
                { label: 'Fixed Work Hour', value: 'fixed' },
                { label:'Flexi Work Hour', value:'flexi' }
              ]}
              row
              sx={{ fontSize: '12px' }}
            />
          </Grid>
        </Grid>
        <Typography mb='12px' fontWeight='bold' color='primary'>Spesific Working Day<AsteriskComponent>*</AsteriskComponent></Typography>
        <Grid container spacing={2} alignItems='end' mb='1rem'>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Select
              customLabel='Works Days'
              variant='outlined'
              size='small'
              fullWidth
              name='startDay'
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
              name='endDay'
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
              name='endDay'
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
        <Typography mb='12px' fontWeight='bold' color='primary'>Add Break</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Input
              name='breakName'
              withAsterisk={false}
              customLabel='Break Name'
              placeholder='Input Break Name'
              size='small'
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Input
              name='breakDuration'
              withAsterisk={false}
              customLabel='Break Duration'
              placeholder='Input Break Duration'
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
          name='isSpecifyBreak'
        />
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
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
      </CustomModal>
    </>
  );
}

export default WorkScheduleCreateForm;