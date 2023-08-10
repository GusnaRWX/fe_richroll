import React, { useState, useRef } from 'react';
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

// Create Component Import :
import ItpCreateTaxBasicDetail from './ItpCreateTaxBasicDetail';
import ItpCreateTaxDeductableComponent from './ItpCreateTaxDeductableComponent';
import ItpCreateTaxRate from './ItpCreateTaxRate';
import ItpCreateTaxMultiplier from './ItpCreateTaxMultiplier';
import ItpCreateDesignedTransferAccount from './ItpCreateDesignedTransferAccount';

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

function ItpAddNewProfileComponent() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [isExit, setIsExit] = useState(true);
  const {t} = useTranslation();
  const t_key = 'income_tax_profile.profile.detail';
  const btnRef = useRef<HTMLButtonElement>(null);

  const [basicValue, setBasicValue] = useState({
    componentName: '',
    country: '',
    province: '',
    city: '',
    subDistrict: '',
    effectiveDate: '',
    citation: '',
    internalNotes: '',
    externalNotes: '',
  });

  const [rateValue, setRateValue] = useState({
    component: [{
      minIncome: '',
      maxIncome: '',
      rate: '',
      additionalAmount: ''
    }]
  });

  const [multiplierValue, setMultiplierValue] = useState({
    component: [
      {
        status: '',
        condition: [
          {
            conditionAction : '',
            conditionStatus : '',
            multiplier : '',
          }
        ]
      }
    ]
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


  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // router.push('/income-tax-profile/profile');
    console.log('basicValue: ', basicValue);
    console.log('rateValue: ', rateValue.component);
    console.log('dtaValue: ', dtaValue);
    console.log('multiplierValue: ', multiplierValue.component);
  };

  const steps = [
    t(`${t_key}.wizard_option.basic_detail`),
    t(`${t_key}.wizard_option.deductable_component`),
    t(`${t_key}.wizard_option.income_tax_rates`),
    t(`${t_key}.wizard_option.income_tax_multiplier`),
    t(`${t_key}.wizard_option.designed_transfer_account`),
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Box sx={{display:'flex', alignItems : 'center',gap:'16px'}}>
            <IconButton
              parentColor='primary.500'
              icons={<ArrowBack sx={{ color: '#FFFFFF' }} />}
              onClick={() => {
                router.push('/income-tax-profile/profile');
              }}
            />
            <Typography variant='h6' color='#4B5563'><b>{t('income_tax_profile.profile.add_new_title')}</b></Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='outlined'
              size='small'
              color='primary'
              onClick={() => {
                if (value == 4) {
                  setIsExit(true);
                  setOpen(true);
                } else {
                  setOpen(true);
                }
              }}
            >{t('button.cancel')}</MuiButton>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              onClick={() => {
                if (value < 4) {
                  setValue(value + 1);
                }
                if (value == 4) {
                  setIsExit(false);
                  setOpen(true);
                  btnRef.current?.click();
                }
              }}
            >{ifThenElse(value == 4, t(`button.mark_complete`),  t(`button.save`))}</MuiButton>
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
          {value == 0 && <ItpCreateTaxBasicDetail basicValue={basicValue} setValue={setBasicValue} nextStep={setValue} />}
          {value == 1 && <ItpCreateTaxDeductableComponent nextStep={setValue} />}
          {value == 2 && <ItpCreateTaxRate rateValue={rateValue} setValue={setRateValue} nextStep={setValue} />}
          {value == 3 && <ItpCreateTaxMultiplier nextStep={setValue} setValue={setMultiplierValue} multiplierValue={multiplierValue} />}
          {value == 4 && <ItpCreateDesignedTransferAccount dtaValue={dtaValue} setValue={setDtaValue} nextStep={setValue} refProp={btnRef} />}
        </Box>
      </ContentWrapper>

      <CustomModal
        open={open}
        handleClose={handleClose}
        title={ifThenElse(isExit, t('income_tax_profile.profile.modal.cancel.description'), t('income_tax_profile.profile.modal.mark_all.description'))}
        width='543px'
        handleConfirm={handleConfirm}
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {
              ifThenElse(
                isExit,
                <Typography variant='text-base' color='#4B5563'>
                  {t('income_tax_profile.profile.modal.cancel.description')}
                </Typography>,
                <Typography variant='text-base' color='#4B5563'>
                  {t('income_tax_profile.profile.modal.mark_all.description')}
                </Typography>
              )
            }
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}

export default ItpAddNewProfileComponent;