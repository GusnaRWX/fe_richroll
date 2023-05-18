import React from 'react';
import CustomModal from '@/components/_shared/common/CustomModal';
import {Grid, Typography } from '@mui/material';
import { DatePicker, Input, RadioGroup, Textarea } from '@/components/_shared/form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';



interface AnnualWorkCalendarCreateProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

function AnnualWorkCalendarCreateForm({open, handleClose, handleConfirm}: AnnualWorkCalendarCreateProps) {
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title='Create New Event'
      width='758px'
      handleConfirm={handleConfirm}
    >
      <Grid container spacing={2} mb='1rem' mt='1rem'>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Input
            name='nameEvent'
            withAsterisk
            customLabel='Name Of Event'
            placeholder='Input name of event'
            size='small'
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <RadioGroup
            label='Event Type'
            name='eventType'
            options={[
              {label: 'Public Holiday', value: '1'},
              {label: 'Company Holiday', value: '2'},
            ]}
            row
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb='1rem' mt='1rem'>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <DatePicker
            customLabel='Start Date'
            withAsterisk
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <DatePicker
            customLabel='End Date'
            withAsterisk
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
                  border: 'none !important'
                },
                width: '100%'
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography fontSize='16px'>End Time</Typography>
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
      <Grid container>
        <Grid sm={12} xs={12} md={12} lg={12} xl={12}>
          <Textarea
            name='notes'
            maxRows={7}
            minRows={7}
            customLabel='Notes'
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

export default AnnualWorkCalendarCreateForm;