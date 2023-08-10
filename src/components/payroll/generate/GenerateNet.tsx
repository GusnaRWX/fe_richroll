import React from 'react';
import {
  Typography,
  Card,
  Grid,
  Box,
  Button as MuiButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { IconButton } from '@/components/_shared/form';
import { ArrowBack } from '@mui/icons-material';
import NetContent from '@/components/payroll-assistant/create/NetContent';
import { useAppDispatch } from '@/hooks/index';
import { patchNetPayrollFinalRequested } from '@/store/reducers/slice/payroll/payrollSlice';

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

const ContentWrapper = styled(Card)(({
  padding: '1rem'
}));

function GenerateNet() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSave = () => {
    dispatch({
      type: patchNetPayrollFinalRequested.toString(),
      payload: {
        data: {
          id: router.query.id
        }
      },
      isAssist: false
    });
  };
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
              onClick={() => {router.push('/payroll-disbursement/payroll/gross-detail');}}
            />
            <Box>
              <Typography variant='h6' color='#4B5563'><b>Generate Net Payroll 280323</b></Typography>
              <Typography variant='text-base' color='#4B5563'><b>Payroll 280123 — </b>1/03/2023 - 14/03/2023</Typography>
            </Box>
          </BackWrapper>
        </Grid>
      </Grid>

      <NetContent isPreview={false}/>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <ButtonWrapper>
                <MuiButton
                  variant='outlined'
                  size='small'
                  color='primary'
                  onClick={() => {router.push('/payroll-disbursement/payroll');}}
                >Cancel</MuiButton>
                <MuiButton
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={() => {handleSave();}}
                  sx={{ color: 'white' }}
                >Save</MuiButton>
              </ButtonWrapper>
            </Grid>
          </Grid>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default GenerateNet;