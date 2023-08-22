import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button as MuiButton,
  Card,
  Typography,
  Tab,
  Tabs
} from '@mui/material';
import { styled } from '@mui/material/styles';
//import { Alert } from '@/components/_shared/common';
import { Company, CompanyEdit } from '@/types/component';
import CompanyInformationForm from './CompanyProfileInformationForm';
import CompanyBankForm from './CompanyProfileBankForm';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { patchCompanyProfileRequested, patchCompanyPaymentsRequested, getCompanyDetailRequested } from '@/store/reducers/slice/company/companySlice';
import { useRouter } from 'next/router';
import { getCompanyData, ifEmptyReplace, ifThenElse } from '@/utils/helper';
import { useFormik } from 'formik';
import { validationSchemeCompanyProfile, validationSchemeCompanyProfilePayment } from './validate';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted
} from '@/store/reducers/slice/options/optionSlice';
//import { Cancel } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const ContentWrapper = styled(Card)(({
  padding: '1rem'
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {
        value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )
      }
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const CompanyEditComponent = ({ companyType, companySector, bank, paymentMethod, countries }: CompanyEdit.Component) => {
  const [tabSelected, setTabSelected] = useState(0);
  //const [isError, setIsError] = useState(false);
  const [isInc, setIsInc] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const detail = useAppSelectors(state => state.company.detail);
  const companyPayments = useAppSelectors(state => state.company.companyPayment);
  const [images, setImages] = useState<string | null>(detail?.logo);
  const companyData = getCompanyData();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const t_companyProfile = 'company_management.company_profile';
  const t_companyProfileTabsOption = 'company_management.company_profile.tabs_option';

  const formikDetail = useFormik({
    initialValues: {
      picture: [],

      // Group Company Information
      companyType: '',
      companyName: '',
      companyNPWP: '',
      companySector: '',
      companyEmail: '',
      phoneNumberPrefix: '',
      phoneNumber: '',

      // Group Company Address
      countryCompanyAddress: '',
      provinceCompanyAddress: '',
      cityCompanyAddress: '',
      subDistrictCompanyAddress: '',
      addressCompanyAddress: '',
      zipCodeCompanyAddress: ''
    } as Company.Detail,
    validationSchema: validationSchemeCompanyProfile,
    validateOnChange: true,
    onSubmit: (values) => {
      handleSubmitDetail(values);
    }
  });

  const formikPayment = useFormik({
    initialValues: {
      // Group Bank Information
      bankBankInformation: '',
      bankAccountHolderNameBankInformation: '',
      bankAccoutNoBankInformation: '',
      bankCodeBankInformation: '',
      branchCodeBankInformation: '',
      branchNameBankInformation: '',
      swiftCodeBankInformation: '',

      // Group Payroll Information
      isMonthly: false,
      isWeekly: false,
      isBiWeekly: false,
      monthlyPeriodStart: '',
      monthlyPeriodEnd: '',
      monthlyPayrollDate: '',
      monthlyMethod: '',
      weeklyPeriod: '',
      weeklyMethod: '',
      biWeeklyPeriod: '',
      biWeeklyPeriodWeek: '',
      biWeeklyMethod: ''
    } as Company.Payment,
    validationSchema: validationSchemeCompanyProfilePayment,
    onSubmit: (values) => {
      handleSubmitPayment(values);
    }
  });

  const handleSubmitDetail = (val) => {
    const informationData = {
      typeID: val.companyType,
      name: val.companyName,
      taxIDNumber: ifEmptyReplace(val.companyNPWP, null),
      sectorID: val.companySector,
      email: val.companyEmail,
      phoneNumber: val.phoneNumber.toString(),
      phoneNumberPrefix: val.phoneNumberPrefix,
    };

    const addressData = {
      countryID: val.countryCompanyAddress,
      firstLevelCode: val.provinceCompanyAddress,
      secondLevelCode: val.cityCompanyAddress,
      thirdLevelCode: val.subDistrictCompanyAddress,
      fourthLevelCode: '',
      address: val.addressCompanyAddress,
      zipCode: val.zipCodeCompanyAddress,
    };

    const inputData = new FormData();
    inputData.append('logo', ifThenElse(val?.picture?.length, val?.picture[0], detail?.logo));
    for (const key in informationData) {
      inputData.append(`${key}`, informationData[key]);
    }
    inputData.append('address', JSON.stringify(addressData));

    dispatch({
      type: patchCompanyProfileRequested.toString(),
      payload: {
        id: companyData?.id,
        companyProfile: inputData
      }
    });
  };

  const handleSubmitPayment = (val) => {
    const bankData = {
      bankID: val.bankBankInformation,
      holder: val.bankAccountHolderNameBankInformation,
      accountNumber: val.bankAccoutNoBankInformation,
      bankCode: ifEmptyReplace(val.bankCodeBankInformation, null),
      branchCode: ifEmptyReplace(val.branchCodeBankInformation, null),
      branchName: ifEmptyReplace(val.branchNameBankInformation, null),
      swiftCode: ifEmptyReplace(val.swiftCodeBankInformation, null)
    };

    let payrollData = {};
    if (val.isMonthly) {
      payrollData = {
        ...payrollData, ...{
          monthly: {
            start: +val.monthlyPeriodStart,
            end: +val.monthlyPeriodEnd,
            payrollDate: +val.monthlyPayrollDate,
            methodID: val.monthlyMethod,
            type: 0
          }
        }
      };
    }

    if (val.isWeekly) {
      payrollData = {
        ...payrollData, ...{
          weekly: {
            start: +val.weeklyPeriod,
            methodID: val.weeklyMethod,
            type: 1
          }
        }
      };
    }

    if (val.isBiWeekly) {
      payrollData = {
        ...payrollData, ...{
          biWeekly: {
            start: +val.biWeeklyPeriod,
            end: +val.biWeeklyPeriodWeek,
            methodID: val.biWeeklyMethod,
            type: 2
          }
        }
      };
    }

    dispatch({
      type: patchCompanyPaymentsRequested.toString(),
      payload: {
        id: companyData?.id,
        payments: {
          bank: bankData,
          payrolls: payrollData
        }
      }
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    ifThenElse(newValue === 1,
      formikDetail.validateForm().then((a) => {
        const ifTrueDetail = () => {
          formikDetail.submitForm();
          //setIsError(false);
          setTabSelected(newValue);
          return true;
        };
        ifThenElse(
          Object.keys(a).length === 0,
          ifTrueDetail(),
          //setIsError(true)
          null
        );
      }),
      formikPayment.validateForm().then((a) => {
        const ifTruePayment = () => {
          //setIsError(false);
          setTabSelected(newValue);
          return true;
        };
        ifThenElse(
          Object.keys(a).length === 0,
          ifTruePayment(),
          //setIsError(true)
          null
        );
      })
    );
  };

  useEffect(() => {
    setImages(detail?.logo);
    formikDetail.setFieldValue('companyType', detail?.type?.id);
    formikDetail.setFieldValue('companyName', detail?.name);
    formikDetail.setFieldValue('companyNPWP', detail?.taxIDNumber);
    formikDetail.setFieldValue('companySector', detail?.sector?.id);
    formikDetail.setFieldValue('companyEmail', detail?.email);
    formikDetail.setFieldValue('phoneNumberPrefix', detail?.phoneNumberPrefix);
    formikDetail.setFieldValue('phoneNumber', detail?.phoneNumber);

    formikDetail.setFieldValue('countryCompanyAddress', detail?.address?.country?.id);
    formikDetail.setFieldValue('provinceCompanyAddress', detail?.address?.firstLevel?.code);
    formikDetail.setFieldValue('cityCompanyAddress', detail?.address?.secondLevel?.code);
    formikDetail.setFieldValue('subDistrictCompanyAddress', detail?.address?.thirdLevel?.code);
    formikDetail.setFieldValue('addressCompanyAddress', detail?.address?.address);
    formikDetail.setFieldValue('zipCodeCompanyAddress', detail?.address?.zipCode);

    formikPayment.setFieldValue('bankBankInformation', companyPayments?.bank?.bank?.id);
    formikPayment.setFieldValue('bankAccountHolderNameBankInformation', companyPayments?.bank?.holder);
    formikPayment.setFieldValue('bankAccoutNoBankInformation', companyPayments?.bank?.accountNumber);
    formikPayment.setFieldValue('bankCodeBankInformation', ifEmptyReplace(companyPayments?.bank?.bankCode, ''));
    formikPayment.setFieldValue('branchCodeBankInformation', ifEmptyReplace(companyPayments?.bank?.branchCode, ''));
    formikPayment.setFieldValue('branchNameBankInformation', ifEmptyReplace(companyPayments?.bank?.branchName, ''));
    formikPayment.setFieldValue('swiftCodeBankInformation', ifEmptyReplace(companyPayments?.bank?.swiftCode, ''));

    formikPayment.setFieldValue('isMonthly', companyPayments?.payrolls?.some(v => v.type === 0));
    formikPayment.setFieldValue('isWeekly', companyPayments?.payrolls?.some(v => v.type === 1));
    formikPayment.setFieldValue('isBiWeekly', companyPayments?.payrolls?.some(v => v.type === 2));
    formikPayment.setFieldValue('monthlyPeriodStart', ifThenElse(companyPayments?.payrolls?.some(v => v.type === 0), companyPayments?.payrolls?.find(v => v.type === 0)?.start, ''));
    formikPayment.setFieldValue('monthlyPeriodEnd', ifThenElse(companyPayments?.payrolls?.some(v => v.type === 0), companyPayments?.payrolls?.find(v => v.type === 0)?.end, ''));
    formikPayment.setFieldValue('monthlyPayrollDate', ifThenElse(companyPayments?.payrolls?.some(v => v.type === 0), companyPayments?.payrolls?.find(v => v.type === 0)?.payrollDate, ''));
    formikPayment.setFieldValue('monthlyMethod', ifThenElse(companyPayments?.payrolls?.some(v => v.type === 0), companyPayments?.payrolls?.find(v => v.type === 0)?.method?.id, ''));
    formikPayment.setFieldValue('weeklyPeriod', ifThenElse(companyPayments?.payrolls?.some(v => v.type === 1), companyPayments?.payrolls?.find(v => v.type === 1)?.start, ''));
    formikPayment.setFieldValue('weeklyMethod', ifThenElse(companyPayments?.payrolls?.some(v => v.type === 1), companyPayments?.payrolls?.find(v => v.type === 1)?.method?.id, ''));
    formikPayment.setFieldValue('biWeeklyPeriod', ifThenElse(companyPayments?.payrolls?.some(v => v.type === 2), companyPayments?.payrolls?.find(v => v.type === 2)?.start, ''));
    formikPayment.setFieldValue('biWeeklyPeriodWeek', ifThenElse(companyPayments?.payrolls?.some(v => v.type === 2), companyPayments?.payrolls?.find(v => v.type === 2)?.end, ''));
    formikPayment.setFieldValue('biWeeklyMethod', ifThenElse(companyPayments?.payrolls?.some(v => v.type === 2), companyPayments?.payrolls?.find(v => v.type === 2)?.method?.id, ''));
  }, [detail, companyPayments]);

  useEffect(() => {
    dispatch({
      type: getCompanyDetailRequested.toString(),
      payload: {
        id: companyData?.id
      }
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: administrativeFirstLevelRequested.toString(),
      payload: {
        countryId: detail?.address?.country?.id
      }
    });

    dispatch({
      type: administrativeSecondLevelRequested.toString(),
      payload: {
        countryId: detail?.address?.country?.id,
        firstLevelCode: detail?.address?.firstLevel?.code
      }
    });

    dispatch({
      type: administrativeThirdLevelRequsted.toString(),
      payload: {
        countryId: detail?.address?.country?.id,
        firstLevelCode: detail?.address?.firstLevel?.code,
        secondLevelCode: detail?.address?.secondLevel?.code
      }
    });
    setIsInc(isInc + 1);
  }, [detail]);

  useEffect(() => {
    window.onbeforeunload = function() {
      console.log('refresh');
      return false;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h5' color='primary.main'>{t(`${t_companyProfile}.title`)}</Typography>
          <Typography variant='text-base' color='#4B5563'>{companyData?.name}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='outlined'
              size='small'
              color='primary'
              onClick={() => { router.push('/company-management/company-profile'); }}
            >{t('button.cancel')}</MuiButton>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              sx={{ color: 'white' }}
              onClick={() => { ifThenElse(tabSelected === 0, formikDetail.submitForm(), formikPayment.submitForm()); }}
            >{t('button.save')}</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabSelected} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label={t(`${t_companyProfileTabsOption}.company_information`)} {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label={t(`${t_companyProfileTabsOption}.payment_information`)} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabSelected} index={0}>
            {/* {ifThenElse(isError, (
              <Alert
                severity='error'
                content='Please fill in all the mandatory fields'
                icon={<Cancel />}
              />
            ), null)} */}
            <CompanyInformationForm
              key={isInc}
              companyType={companyType}
              companySector={companySector}
              countries={countries}
              formik={formikDetail}
              images={images}
              setImages={setImages}
            />
          </TabPanel>
          <TabPanel value={tabSelected} index={1}>
            {/* {ifThenElse(isError, (
              <Alert
                severity='error'
                content='Please fill in all the mandatory fields'
                icon={<Cancel />}
              />
            ), null)} */}
            <CompanyBankForm
              formik={formikPayment}
              bank={bank}
              paymentMethod={paymentMethod}
            />
          </TabPanel>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default CompanyEditComponent;