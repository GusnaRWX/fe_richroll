import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Box,
  Button as MuiButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { IconButton, CheckBox } from '@/components/_shared/form';
import { ArrowBack } from '@mui/icons-material';
//import DisbursementContent from '@/components/payroll-assistant/create/DisbursementContent';
import NetContent from '@/components/payroll-assistant/create/NetContent';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { postPayrollDisbursementIdRequested, getDetailPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';

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

const SeperateWrapper = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  padding: '12px',
  boxShadow: '0px 1px 3px 0px #0000001A',
  marginBottom: '1rem'
});

function NetDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSeperate, setIsSeperate] = useState(false);
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

  const handleGenerateDisbursementReciept = () => {
    dispatch({
      type: postPayrollDisbursementIdRequested.toString(),
      payload: {
        id: router.query.id,
        body: {
          isSeparate: isSeperate
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
              onClick={() => { router.push('/payroll-disbursement/payroll'); }}
            />
            <Box>
              <Typography variant='h6' color='#4B5563'><b>Generate Net Payroll 280323</b></Typography>
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
              onClick={handleGenerateDisbursementReciept}
            >Generate Disbursement Receipt</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <SeperateWrapper>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <CheckBox
              customLabel='Separate Non-Taxable Transaction'
              onChange={(e) => { setIsSeperate(e.target.checked); }}
            />
          </Grid>
        </Grid>
      </SeperateWrapper>
      <NetContent isPreview={true} />
      {/* <DisbursementContent /> */}
    </>
  );
}

export default NetDetail;