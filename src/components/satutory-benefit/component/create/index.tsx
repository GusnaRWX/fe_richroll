import React, { useState } from 'react';
import {
  Typography,
  Card,
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import CustomModal from '@/components/_shared/common/CustomModal';
import { ifThenElse } from '@/utils/helper';

// Import Create Component :
import CreateBasicDetailComponent from './CreateBasicDetail';
import CreateDesignedTransferAccount from './CreateDesignedTransferAccount';
import CreateRates from './CreateRates';

const steps = [
  'Basic Detail',
  'Designed Detail Component',
  'Rates',
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

function CreateNewComponent() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [isExit, setIsExit] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    router.push('/income-tax-profile/deductable-component');
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h6' color='#4B5563'><b>Add New Component</b></Typography>
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
                if (value < 2) {
                  setValue(value + 1);
                }
                if (value == 2) {
                  setIsExit(false);
                  setOpen(true);
                }
              }}
            >{ifThenElse(value == 0, 'Create Designed Transfer Account', ifThenElse(value == 1, 'Create Rates',  'Mark All Paid and Complete'))}</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={value} alternativeLabel sx={{ marginTop: '45px' }}>
            {steps.map((label) => (
              <Step key={label} sx={{
                '> .MuiStepConnector-root': {
                  left: 'calc(-50% + 10px)',
                  right: 'calc(50% + 10px)',
                  '> .MuiStepConnector-line': {
                    borderTopWidth: '2px',
                    marginTop: '-20px !important'
                  }
                },
                '> .Mui-active > .MuiStepConnector-line, > .Mui-completed > .MuiStepConnector-line': {
                  borderColor: '#1C2C56'
                },
                '> .Mui-disabled > .MuiStepConnector-line': {
                  borderColor: '#D1D5DB'
                },
              }}>
                <StepLabel
                  sx={{
                    '& .Mui-completed, & .Mui-disabled': {
                      color: '#D1D5DB !important',
                    },
                    '& .MuiStepLabel-alternativeLabel': {
                      fontWeight: '400 !important',
                      marginTop: '-20px !important'
                    },
                  }}
                  StepIconComponent={({ active, completed }) => {
                    return ifThenElse(
                      active,
                      <Box sx={{ width: '12px', height: '12px', border: '2px solid #1C2C56', borderRadius: '12px', background: '#FFF', top: '6px', position: 'relative' }}></Box>,
                      ifThenElse(
                        completed,
                        <Box sx={{ width: '12px', height: '12px', borderRadius: '12px', background: '#1C2C56', top: '6px', position: 'relative' }}></Box>,
                        <Box sx={{ width: '12px', height: '12px', borderRadius: '12px', background: '#D1D5DB', top: '6px', position: 'relative' }}></Box>
                      )
                    );
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{mt:'16px'}}>
          {value == 0 && <CreateBasicDetailComponent />}
          {value == 1 && <CreateDesignedTransferAccount/>}
          {value == 2 && <CreateRates />}
        </Box>
      </ContentWrapper>



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

export default CreateNewComponent;