import React, { useState } from 'react';
import { 
  Typography,
  Card,
  Grid,
  Box,
  Button as MuiButton } from '@mui/material';
import { Stepper } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import AttendanceContent from './AttendanceContent';
import GrossContent from './GrossContent';
import NetContent from './NetContent';
import DisbursementContent from './DisbursementContent';
import CompleteContent from './CompleteContent';
import CustomModal from '@/components/_shared/common/CustomModal';
import { ifThenElse } from '@/utils/helper';

const steps = [
  'Create Payroll',
  'Attendance',
  'Gross Payroll',
  'Net Payroll',
  'Disbursement',
  'Payroll Complete',
];

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const ContentWrapper = styled(Card)(({
  padding: '1rem',
  borderRadius: '0px',
  marginBottom: '1rem'
}));

function PayrollAssistantCreate() {
  const router = useRouter();
  const [value, setValue] = useState(1);
  const [open, setOpen] = useState(false);
  const [isExit, setIsExit] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    router.push('/payroll-disbursement/payroll-assistant');
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h6' color='#4B5563'><b>Payroll Assistant</b></Typography>
          <Typography variant='text-base' color='#4B5563'><b>Payroll 280123 — </b>1/03/2023 - 14/03/2023</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='outlined'
              size='small'
              color='primary'
              onClick={() => {
                if (value == 5) {
                  setIsExit(true);
                  setOpen(true);
                } else {
                  setOpen(true);
                }
              }}
            >{ifThenElse(value < 2, 'Cancel', 'Save & Exit')}</MuiButton>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              onClick={() => {
                if (value < 5) {
                  setValue(value + 1);
                }
                if (value == 5) {
                  setIsExit(false);
                  setOpen(true);
                }
              }}
            >{ifThenElse(value == 1, 'Generate Gross Payroll Report', ifThenElse(value == 2, 'Generate Net Payroll Report', ifThenElse(value == 3, 'Generate Disbursement Receipt', ifThenElse(value == 4, 'Generate Disbursement Files', 'Mark All Paid and Complete'))))}</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={value} steps={steps} />
        </Box>
      </ContentWrapper>
      
      {value == 1 && <AttendanceContent />}
      {value == 2 && <GrossContent isPreview={false} />}
      {value == 3 && <NetContent />}
      {value == 4 && <DisbursementContent />}
      {value == 5 && <CompleteContent />}

      <CustomModal
        open={open}
        handleClose={handleClose}
        title={ifThenElse(isExit, 'Save & Exit', 'Mark all paid and Complete')}
        width='543px'
        handleConfirm={handleConfirm}
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {
              ifThenElse(
                isExit,
                <Typography variant='text-base' color='#4B5563'>You will stop the process, and saved in Payroll Assistant.<br/>Are you sure to stop the process?</Typography>,
                <Typography variant='text-base' color='#4B5563'>All disbursement will marked paid and complete the Payroll Assistant process</Typography>
              )
            }
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}

export default PayrollAssistantCreate;