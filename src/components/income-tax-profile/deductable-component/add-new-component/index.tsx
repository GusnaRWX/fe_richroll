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
import { useTranslation, Trans } from 'react-i18next';
import { IconButton } from '@/components/_shared/form';
import { ArrowBack } from '@mui/icons-material';
import { Tax } from '@/types/tax';
import dynamic from 'next/dynamic';

const CreateBasicDetailComponent = dynamic(() => import('./ItpCreateBasicDetailComponent'), {
  ssr: false
});
const ItpCreateDesignedTransferAccountComponent = dynamic(() => import('./ItpCreateDesignedTransferAccountComponent'), {
  ssr: false
});
const ItpCreateRatesComponent = dynamic(() => import('./ItpCreateRatesComponent'), {
  ssr: false
});

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


function ItpCreateNewComponentComponent() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [isExit, setIsExit] = useState(true);
  const {t} = useTranslation();
  const t_key = 'income_tax_profile.deductable_component.add_new_component';

  // Basic Detail :
  const basicDetailRef = useRef<HTMLFormElement>(null);
  const [IsInBasicDetailValid, setIsInBasicDetailValid] = useState(false);
  const [ItpBasicDetail, setItpBasicDetail] = useState<Tax.ItpBasicDetailParams>({
    componentName: '',
    country: '',
    province: '',
    city: '',
    subDistrict: '',
    citation: '',
    internalNotes: '',
    externalNotes: '',
  });
  // Transfer Account :
  const dtaRef = useRef<HTMLFormElement>(null);
  const [IsInDtaValid, setIsInDtaValid] = useState(false);
  const [ItpDta, setItpDta] = useState<Tax.ItpDtaParams>({
    bank: '',
    holder: '',
    no: '',
    bankCode: '',
    branchCode: '',
    branchName: '',
    swiftCode: '',
    notes: '',
  });
  // Rates :
  const ratesRef = useRef<HTMLFormElement>(null);
  const [IsInRatesValid, setIsInRatesValid] = useState(false);
  const [ItpRates, setItpRates] = useState<Tax.ItpRatesParams>({
    type : false,
    deductableCondition : '',
    amount : '',
    factorUnitCondition : [
      {
        condition : '',
        factorUnitName : '',
        subCondition : [
          {
            condition: 'string',
            subName: 'string',
            subAmount: 'string',
          }
        ]
      }
    ],
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const inputData = new FormData();
    // basic detail
    inputData.append('componentName', ItpBasicDetail.componentName);
    inputData.append('country', ItpBasicDetail.country);
    inputData.append('province', ItpBasicDetail.province);
    inputData.append('city', ItpBasicDetail.city);
    inputData.append('subDistrict', ItpBasicDetail.subDistrict);
    inputData.append('citation', ItpBasicDetail.citation);
    inputData.append('internalNotes', ItpBasicDetail.internalNotes);
    inputData.append('externalNotes', ItpBasicDetail.externalNotes);
    // transfer account
    inputData.append('bank', ItpDta.bank);
    inputData.append('holder', ItpDta.holder);
    inputData.append('no', ItpDta.no);
    inputData.append('bankCode', ItpDta.bankCode);
    inputData.append('branchCode', ItpDta.branchCode);
    inputData.append('branchName', ItpDta.branchName);
    inputData.append('swiftCode', ItpDta.swiftCode);
    inputData.append('notes', ItpDta.notes);

    if(IsInBasicDetailValid === true && IsInDtaValid === true && IsInRatesValid === true) {
      console.log('Basic Detail :' , ItpBasicDetail, 'Designed Transfer Account :' , ItpDta, 'Rates :' , ItpRates);
    }else{
      console.log('data belum diisi');
    }

    setOpen(false);
    // router.push('/income-tax-profile/deductable-component');
  };


  const steps = [
    t(`${t_key}.form.wizard_option.basic_detail`),
    t(`${t_key}.form.wizard_option.designed_transfer_account`),
    t(`${t_key}.form.wizard_option.rates`),
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
                router.push('/income-tax-profile/deductable-component');
              }}
            />
            <Typography variant='h6' color='#4B5563'><b>{t(`${t_key}.title`)}</b></Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          {value === 2 ?
            <>
              <ButtonWrapper>
                <MuiButton
                  variant='outlined'
                  size='small'
                  color='primary'
                  onClick={() => {
                    if (value == 2) {
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
                  disabled={!IsInBasicDetailValid}
                  onClick={() => {
                    setIsExit(false);
                    setOpen(true);
                  }}
                >{t(`button.mark_complete`)}</MuiButton>
              </ButtonWrapper>
            </>
            :
            <>
            </>
          }
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
          {value == 0 &&
          <CreateBasicDetailComponent
            nextPage={setValue}
            refProp={basicDetailRef}
            setValues={setItpBasicDetail}
            infoValues={ItpBasicDetail}
            setIsInBasicDetailValid={setIsInBasicDetailValid}
          />}
          {value == 1 &&
          <ItpCreateDesignedTransferAccountComponent
            nextPage={setValue}
            refProp={dtaRef}
            setValues={setItpDta}
            infoValues={ItpDta}
            setIsInDtaValid={setIsInDtaValid}
          />}
          {value == 2 &&
          <ItpCreateRatesComponent
            nextPage={setValue}
            refProp={ratesRef}
            setValues={setItpRates}
            infoValues={ItpRates}
            setIsInRatesValid={setIsInRatesValid}
          />}
        </Box>
      </ContentWrapper>

      <CustomModal
        open={open}
        handleClose={handleClose}
        title={ifThenElse(isExit, t('button.cancel'),  t('button.mark_complete'))}
        width='543px'
        handleConfirm={handleConfirm}
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {
              ifThenElse(
                isExit,
                <Typography variant='text-base' color='#4B5563'><Trans>{`${t_key}.save_modal_text`}</Trans></Typography>,
                <Typography variant='text-base' color='#4B5563'>{t(`${t_key}.mark_modal_text` )}</Typography>
              )
            }
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}

export default ItpCreateNewComponentComponent;