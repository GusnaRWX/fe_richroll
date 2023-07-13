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
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

  const validationSchema = Yup.object({
    basicDetail: Yup.object({
      satutoryName: Yup.string().required('This field is Required!'),
      country: Yup.string().required('This field is Required!'),
      province: Yup.string(),
      city: Yup.string(),
      subDistrict: Yup.string(),
      citation: Yup.string(),
      internalNotes: Yup.string(),
      externalNotes: Yup.string(),
    }),
    dta: Yup.object({
      bank: Yup.string().required('This Field is Required'),
      holder: Yup.string().required('This Field is Required'),
      no: Yup.string().required('This Field is Required'),
      bankCode: Yup.string(),
      branchCode: Yup.string(),
      branchName: Yup.string(),
      swiftCode: Yup.string(),
      notes: Yup.string(),
    }),
    rates: Yup.object({
      employeeData: Yup.object({
        start: Yup.string().required('This Field is Required'),
        end: Yup.string().required('This Field is Required'),
        rate: Yup.string().required('This Field is Required'),
        fixed: Yup.string().required('This Field is Required'),
        amountCap: Yup.string().required('This Field is Required'),
      }),
      employerData: Yup.object({
        start: Yup.string().required('This Field is Required'),
        end: Yup.string().required('This Field is Required'),
        rate: Yup.string().required('This Field is Required'),
        fixed: Yup.string().required('This Field is Required'),
        amountCap: Yup.string().required('This Field is Required'),
      })
    })
  });

  const formik = useFormik({
    initialValues: {
      basicDetail: {
        satutoryName: '',
        country: '',
        province: '',
        city: '',
        subDistrict: '',
        citation: '',
        internalNotes: '',
        externalNotes: '',
      },
      dta: {
        bank: '',
        holder: '',
        no: '',
        bankCode: '',
        branchCode: '',
        branchName: '',
        swiftCode: '',
        notes: '',
      },
      rates: {
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
      }
    },
    onSubmit: (value) => console.log(value),
    validationSchema: validationSchema
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // router.push('/income-tax-profile/deductable-component');
    formik.validateForm().then((res) => {
      if ('rates' in res) {
        console.log(res);
        console.log(formik.values.rates);
      } else {
        let payload = {};
        if (formik.values.rates.employerMatch && formik.values.rates.employer && formik.values.rates.employee) {
          payload= {
            employee: formik.values.rates.employeeData,
            employer: formik.values.rates.employeeData,
          };
        } else if (formik.values.rates.employee && formik.values.rates.employer) {
          payload = {
            employee: formik.values.rates.employeeData,
            employer: formik.values.rates.employerData,
          };
        } else if (formik.values.rates.employee) {
          payload = {
            employee: formik.values.rates.employeeData,
          };
        } else if (formik.values.rates.employer) {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          payload = {
            employer: formik.values.rates.employerData,
          };
        }
        console.log(payload);
      }
    });
  };

  const steps = [
    t(`${t_key}.wizard_option.basic_detail`),
    t(`${t_key}.wizard_option.designed_transfer_account`),
    t(`${t_key}.wizard_option.rate`),
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
          {value == 0 && <CreateBasicDetailComponent nextPage={setValue} formik={formik} />}
          {value == 1 && <CreateDesignedTransferAccount nextPage={setValue} formik={formik} />}
          {value == 2 && <CreateRates nextPage={setValue} formik={formik} />}
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