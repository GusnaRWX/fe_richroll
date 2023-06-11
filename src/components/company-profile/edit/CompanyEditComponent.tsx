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
import { Company, CompanyEdit } from '@/types/component';
import CompanyInformationForm from './CompanyProfileInformationForm';
import CompanyBankForm from './CompanyProfileBankForm';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { patchCompanyProfileRequested } from '@/store/reducers/slice/company/companySlice';
import { useRouter } from 'next/router';
import { getCompanyData, ifEmptyReplace, ifThenElse } from '@/utils/helper';
import { useFormik } from 'formik';
import { validationSchemeCompanyProfile } from './validate';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted
} from '@/store/reducers/slice/options/optionSlice';

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

const CompanyEditComponent = ({ detail, companyType, companySector, bank, paymentMethod, countries }: CompanyEdit.Component) => {
  const [tabSelected, setTabSelected] = useState(0);
  const companyPayments = useAppSelectors(state => state.company.companyPayment);
  console.log(companyPayments);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<string | null>(detail?.logo);
  const companyData = getCompanyData();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      picture: [],

      // Group Company Information
      companyType: detail?.type?.id,
      companyName: detail?.name,
      companyNPWP: detail?.taxIDNumber,
      companySector: detail?.sector?.id,
      companyEmail: detail?.email,
      phoneNumberPrefix: detail?.phoneNumberPrefix,
      phoneNumber: detail?.phoneNumber,

      // Group Company Address
      countryCompanyAddress: detail?.address?.country?.id,
      provinceCompanyAddress: detail?.address?.firstLevel?.code,
      cityCompanyAddress: detail?.address?.secondLevel?.code,
      subDistrictCompanyAddress: detail?.address?.thirdLevel?.code,
      addressCompanyAddress: detail?.address?.address,
      zipCodeCompanyAddress: detail?.address?.zipCode,

      // Group Bank Information
      bankBankInformation: companyPayments?.bank?.bank?.id,
      bankAccountHolderNameBankInformation: companyPayments?.bank?.holder,
      bankAccoutNoBankInformation: companyPayments?.bank?.accountNumber,
      bankCodeBankInformation: companyPayments?.bank?.bankCode || '',
      branchCodeBankInformation: companyPayments?.bank?.branchCode,
      branchNameBankInformation: companyPayments?.bank?.branchName,
      swiftCodeBankInformation: companyPayments?.bank?.swiftCode,

      // Group Payroll Information
      isMonthly: companyPayments?.payrolls?.some(v => v.type === 0),
      isWeekly: companyPayments?.payrolls?.some(v => v.type === 1),
      isBiWeekly: companyPayments?.payrolls?.some(v => v.type === 2),
      monthlyPeriodStart: ifThenElse(companyPayments?.payrolls?.some(v => v.type === 0), companyPayments?.payrolls?.find(v => v.type === 0)?.start, ''),
      monthlyPeriodEnd: ifThenElse(companyPayments?.payrolls?.some(v => v.type === 0), companyPayments?.payrolls?.find(v => v.type === 0)?.end, ''),
      monthlyPayrollDate: ifThenElse(companyPayments?.payrolls?.some(v => v.type === 0), companyPayments?.payrolls?.find(v => v.type === 0)?.payrollDate, ''),
      monthlyMethod: ifThenElse(companyPayments?.payrolls?.some(v => v.type === 0), companyPayments?.payrolls?.find(v => v.type === 0)?.method?.id, ''),
      weeklyPeriod: ifThenElse(companyPayments?.payrolls?.some(v => v.type === 1), companyPayments?.payrolls?.find(v => v.type === 1)?.start, ''),
      weeklyMethod: ifThenElse(companyPayments?.payrolls?.some(v => v.type === 1), companyPayments?.payrolls?.find(v => v.type === 1)?.method?.id, ''),
      biWeeklyPeriod: ifThenElse(companyPayments?.payrolls?.some(v => v.type === 2), companyPayments?.payrolls?.find(v => v.type === 2)?.start, ''),
      biWeeklyPeriodWeek: ifThenElse(companyPayments?.payrolls?.some(v => v.type === 2), companyPayments?.payrolls?.find(v => v.type === 2)?.end, ''),
      biWeeklyMethod: ifThenElse(companyPayments?.payrolls?.some(v => v.type === 2), companyPayments?.payrolls?.find(v => v.type === 2)?.method?.id, '')
    } as Company.Detail,
    validationSchema: validationSchemeCompanyProfile,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  console.log(formik.values.weeklyPeriod);

  const handleSubmit = (val) => {
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

    const bankData = {
      bankId: val.bankBankInformation,
      accountName: val.bankAccountHolderNameBankInformation,
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
        companyProfile: inputData,
        payments: {
          bank: bankData,
          payrolls: payrollData
        }
      }
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabSelected(newValue);
  };

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

  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h5' color='primary.main'>Company Profile</Typography>
          <Typography variant='text-base' color='#4B5563'>{companyData?.name}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='outlined'
              size='small'
              color='primary'
              onClick={() => { router.push('/company-management/company-profile'); }}
            >Cancel</MuiButton>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              sx={{ color: 'white' }}
              onClick={() => { formik.submitForm(); }}
            >Save</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabSelected} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label='Company Information' {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label='Payment Information' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabSelected} index={0}>
            <CompanyInformationForm
              companyType={companyType}
              companySector={companySector}
              countries={countries}
              formik={formik}
              images={images}
              setImages={setImages}
            />
          </TabPanel>
          <TabPanel value={tabSelected} index={1}>
            <CompanyBankForm
              formik={formik}
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