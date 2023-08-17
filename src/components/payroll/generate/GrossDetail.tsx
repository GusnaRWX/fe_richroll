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
import GrossContent from '@/components/payroll-assistant/create/GrossContent';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { postNetPayrollRequested, getDetailPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';

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

function GrossDetail() {
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

  const handleGenerateNet = () => {
    dispatch({
      type: postNetPayrollRequested.toString(),
      payload: {
        id: router.query.id,
        data: {
          assistantID: ''
        },
        isAssist: false
      }
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
              onClick={() => {router.push('/payroll-disbursement/payroll');}}
            />
            <Box>
              <Typography variant='h6' color='#4B5563'><b>Gross Payroll Report</b></Typography>
              <Typography variant='text-base' color='#4B5563'><b>{name} — </b>{start} - {end}</Typography>
            </Box>
          </BackWrapper>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              onClick={() => {handleGenerateNet();}}
            >Generate Net Payroll Report</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <GrossContent isPreview={true} />
    </>
  );
}

export default GrossDetail;