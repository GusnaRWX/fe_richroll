import { Typography, Card, Grid, Box, Button as MuiButton } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';

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

function PayrollComponent() {
  const router = useRouter();
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h5' color='primary.main'>Payroll Operation</Typography>
          <Typography variant='text-base' color='#4B5563'>Payroll</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='contained'
              size='small'
              color='secondary'
              sx={{ color: 'white' }}
              onClick={() => { router.push('/dashboard'); }}
            ><Edit fontSize='small' />&nbsp; Generate Attendance Report</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Typography variant='text-base' color='#4B5563'>onDevelopment</Typography>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default PayrollComponent;