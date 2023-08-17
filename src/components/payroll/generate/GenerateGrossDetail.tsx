import React, {useEffect} from 'react';
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
import GrossContent from '@/components/payroll-assistant/create/GrossContent';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { putPayrollsGrossesFinalRequested, getDetailPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';

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

function GenerateGrossDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const tPath = 'payroll_and_disbursement.attendance_summary.generate_gross_payroll.';
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

  const handleConfirm = () => {
    dispatch({
      type: putPayrollsGrossesFinalRequested.toString(),
      payload: {
        data: {
          id: router.query.id
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
              <Typography variant='h6' color='#4B5563'><b>{t(`${tPath}title`)}</b></Typography>
              <Typography variant='text-base' color='#4B5563'><b>{name} — </b>{start} - {end}</Typography>
            </Box>
          </BackWrapper>
        </Grid>
      </Grid>

      <GrossContent isPreview={false} />

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
                  onClick={() => { router.push('/payroll-disbursement/attendance'); }}
                >{t('button.cancel')}</MuiButton>
                <MuiButton
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={handleConfirm}
                  sx={{ color: 'white' }}
                >{t('button.confirm')}</MuiButton>
              </ButtonWrapper>
            </Grid>
          </Grid>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default GenerateGrossDetail;