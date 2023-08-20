import React, {useEffect} from 'react';
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
import { patchPayrollDisbursementFinalRequested, getDetailPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';

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
  const { name, start, end } = useAppSelectors((state) => state.payroll);

  useEffect(() => {
    if (router.query.id) {
      dispatch({
        type: getDetailPayrollRequested.toString(),
        payload: {
          id: router.query.id
        }
      });
    }
  }, [router.query.id]);

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
              <Typography variant='text-base' color='#4B5563'><b>{name} — </b>{start} - {end}</Typography>
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