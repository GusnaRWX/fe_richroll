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
import { useTranslation } from 'react-i18next';
import { IconButton } from '@/components/_shared/form';
import { ArrowBack } from '@mui/icons-material';

// Import Create Component :
import CreateBasicDetailComponent from './CreateBasicDetail';
import CreateDesignedTransferAccount from './CreateDesignedTransferAccount';
import CreateRates from './CreateRates';

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
  // Translation key :
  const {t} = useTranslation();
  const t_buttonKey = 'satutory_benefit.component.button';
  const t_key = 'satutory_benefit.component.form_&_detail';

  const router = useRouter();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [isExit, setIsExit] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // router.push('/income-tax-profile/deductable-component');
    let payload = {};
    if (ratesValue.employerMatch && ratesValue.employer && ratesValue.employee) {
      payload= {
        employee: ratesValue.employeeData,
        employer: ratesValue.employeeData,
      };
    } else if (ratesValue.employee && ratesValue.employer && !ratesValue.employerMatch) {
      payload = {
        employee: ratesValue.employeeData,
        employer: ratesValue.employerData,
      };
    } else if (ratesValue.employee) {
      payload = {
        employee: ratesValue.employeeData,
      };
    } else if (ratesValue.employer) {
      payload = {
        employer: ratesValue.employerData,
      };
    }
    console.log('basicDetail: ', basicDetailValue);
    console.log('dta: ', dtaValue);
    console.log('rates: ', payload);
  };

  const steps = [
    t(`${t_key}.wizard_option.basic_detail`),
    t(`${t_key}.wizard_option.designed_transfer_account`),
    t(`${t_key}.wizard_option.rate`),
  ];

  const [basicDetailValue, setBasicDetailValue] = useState({
    satutoryName: '',
    country: '',
    province: '',
    city: '',
    subDistrict: '',
    citation: '',
    internalNotes: '',
    externalNotes: '',
  });

  const [dtaValue, setDtaValue] = useState({
    bank: '',
    holder: '',
    no: '',
    bankCode: '',
    branchCode: '',
    branchName: '',
    swiftCode: '',
    notes: '',
  });

  const [ratesValue, setRatesValue] = useState({
    employee: true,
    employer: false,
    employerMatch: true,
    employeeData: {
      start: 0,
      end: 0,
      rate: '',
      fixed: 0,
      amountCap: 0,
    },
    employerData: {
      start: 0,
      end: 0,
      rate: '',
      fixed: 0,
      amountCap: 0,
    },
  });

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Box sx={{display:'flex', alignItems : 'center',gap:'16px'}}>
            <IconButton
              parentColor='primary.500'
              icons={<ArrowBack sx={{ color: '#FFFFFF' }} />}
              onClick={() => {
                router.push('/satutory-benefit/component');
              }}
            />
            <Typography variant='h6' color='#4B5563'><b>{t(`${t_key}.dashboard_title`)}</b></Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            {value === 2 ?
              <>
                <MuiButton
                  variant='outlined'
                  size='small'
                  color='primary'
                  onClick={() => {
                    setIsExit(true);
                    setOpen(true);
                  }}
                >{t(`button.cancel`)}</MuiButton>
                <MuiButton
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={() => {
                    setIsExit(false);
                    setOpen(true);
                  }}
                >{t(`button.save`)}</MuiButton>
              </>
              : <></>}
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
          {value == 0 && <CreateBasicDetailComponent nextPage={setValue} basicValue={basicDetailValue} setValue={setBasicDetailValue} />}
          {value == 1 && <CreateDesignedTransferAccount nextPage={setValue} dtaValue={dtaValue} setValue={setDtaValue} />}
          {value == 2 && <CreateRates nextPage={setValue} ratesValue={ratesValue} setValue={setRatesValue} />}
        </Box>
      </ContentWrapper>



      <CustomModal
        open={open}
        handleClose={handleClose}
        title={ifThenElse(isExit, t(`${t_buttonKey}.cancel`), t(`${t_buttonKey}.save`))}
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