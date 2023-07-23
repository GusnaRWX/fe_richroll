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
import CompleteContent from '@/components/payroll-assistant/create/CompleteContent';
import { patchPayrollDisbursementFinalRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import { useAppDispatch } from '@/hooks/index';

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

function DisbursementGenerateComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleFinalDisbursement = () => {
    dispatch({
      type: patchPayrollDisbursementFinalRequested.toString(),
      payload: {
        id: router.query.id,
        isAssist: false
      }
    });
  };
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6}>
          <BackWrapper >
            <IconButton
              parentColor='primary.500'
              icons={
                <ArrowBack sx={{ color: '#FFFFFF' }} />
              }
              onClick={() => { router.back(); }}
            />
            <Box>
              <Typography variant='h6' color='#4B5563'><b>Generate Disbursment Receipt</b></Typography>
              <Typography variant='text-base' color='#4B5563'><b>Payroll 280123 — </b>1/03/2023 - 14/03/2023</Typography>
            </Box>
          </BackWrapper>
        </Grid>
        <Grid item xs={6}>
          <ButtonWrapper>
            <MuiButton
              variant='outlined'
              size='small'
              color='primary'
              onClick={() => { router.push('/payroll-disbursement/disbursement'); }}
            >Cancel</MuiButton>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              onClick={handleFinalDisbursement}
              sx={{ color: 'white' }}
            >Save</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <CompleteContent />
    </>
  );
}

export default DisbursementGenerateComponent;