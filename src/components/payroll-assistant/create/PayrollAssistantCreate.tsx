import React, { useState } from 'react';
import { Typography, Card, Grid, Box, Button as MuiButton } from '@mui/material';
import { DatePicker, Input } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import AttendanceTable from './AttendanceTable';
import CustomModal from '@/components/_shared/common/CustomModal';

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const ContentWrapper = styled(Card)(({
  padding: '1rem'
}));

function CompanyProfileCreate() {
  const router = useRouter();
  // const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    router.push('/payroll-disbursement/payroll-assistant/create');
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h5' color='primary.main'>Payroll Assistant</Typography>
          <Typography variant='text-base' color='#4B5563'>Payroll 280123 — 1/03/2023 - 14/03/2023</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='outlined'
              size='small'
              color='primary'
              onClick={() => { setOpen(true); }}
            >Cancel</MuiButton>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              onClick={() => { setOpen(true); }}
            >Next</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>

        </Box>
      </ContentWrapper>
      
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <AttendanceTable />
        </Box>
      </ContentWrapper>

      <CustomModal
        open={open}
        handleClose={handleClose}
        title='Create New Payroll'
        width='543px'
        handleConfirm={handleConfirm}
        submitText='Submit'
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Input
              name='nameEvent'
              withAsterisk
              customLabel='Name'
              placeholder='Input Name'
              size='small'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mb='1rem'>
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
      </CustomModal>
    </>
  );
}

export default CompanyProfileCreate;