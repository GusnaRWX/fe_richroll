import React from 'react';
import { styled } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import type { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { RadioGroup, CheckBox, Input, Select } from '@/components/_shared/form';
import { Button as MuiButton, Grid, IconButton, InputAdornment, Typography, Box } from '@mui/material';

const FlexBoxRow = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem'
}));

const EditContentWrapper = {
  padding: '1rem',
  width: '560px',
  backgroundColor: '#FFFFFF'
};

const FlexHead = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem',
  borderBottom: '1px solid #E5E7EB',
  paddingBottom: '12px'
}));

const FlexFooter = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  borderTop: '1px solid #E5E7EB',
  paddingTop: '12px'
}));

interface EditFormWorkScheduleProps {
  scheduler: SchedulerHelpers;
}

function WorkScheduleEditForm({scheduler}: EditFormWorkScheduleProps) {
  return (
    <Box sx={EditContentWrapper}>
      <FlexHead>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
          Work Schedule
        </Typography>
        <IconButton onClick={() => scheduler.close()}>
          <Close />
        </IconButton>
      </FlexHead>
      <Box>
        <Grid container mb='1rem'>
          <Grid item sm={12}>
            <Typography mb='12px' color='primary' fontWeight='bold'>Work Hour Type</Typography>
            <RadioGroup
              withAsterisk={false}
              label=''
              name='type'
              options={[
                { label: 'Fixed Work Hour', value: 'fixed' },
                { label: 'Flexi Work Hour', value: 'flexi' }
              ]}
              row
              sx={{ fontSize: '12px' }}
            />
          </Grid>
        </Grid>
        <Typography mb='1rem' fontWeight='bold' color='primary'>Spesific Working Day</Typography>
        <Grid container mb='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Select
              customLabel='Works Days'
              variant='outlined'
              size='small'
              fullWidth
              name='flexiWorkDay'
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
        <Grid container mb='2rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography width='150px' fontSize='16px'>Work Hours</Typography>
            <FlexBoxRow>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  ampm={false}
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
                  ampm={false}
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
              type='number'
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
        />
        <Grid container spacing={2} mb='1rem'>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                ampm={false}
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
                ampm={false}
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
      </Box>
      <FlexFooter>
        <MuiButton variant='outlined' size='small' onClick={() => scheduler.close()}>Cancel</MuiButton>
        <MuiButton variant='contained' size='small' color='primary' onClick={() => scheduler.close()}>Save</MuiButton>
      </FlexFooter>
    </Box>
  );
}

export default WorkScheduleEditForm;