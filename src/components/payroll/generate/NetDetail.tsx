import React from 'react';
import {
  Typography,
  Grid,
  Box,
  Button as MuiButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { IconButton } from '@/components/_shared/form';
import { ArrowBack } from '@mui/icons-material';
//import DisbursementContent from '@/components/payroll-assistant/create/DisbursementContent';
import NetContent from '@/components/payroll-assistant/create/NetContent';

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const BackWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem',
  marginTop: '.1rem'
}));

function NetDetail() {
  const router = useRouter();
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <BackWrapper >
            <IconButton
              parentColor='primary.500'
              icons={
                <ArrowBack sx={{ color: '#FFFFFF' }} />
              }
              onClick={() => {router.push('/payroll-disbursement/payroll');}}
            />
            <Box>
              <Typography variant='h6' color='#4B5563'><b>Generate Net Payroll 280323</b></Typography>
              <Typography variant='text-base' color='#4B5563'><b>Payroll 280123 — </b>1/03/2023 - 14/03/2023</Typography>
            </Box>
          </BackWrapper>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              onClick={() => {router.push('/payroll-disbursement/disbursement/generate');}}
            >Generate Disbursement Receipt</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <NetContent isPreview={true}/>
      {/* <DisbursementContent /> */}
    </>
  );
}

export default NetDetail;