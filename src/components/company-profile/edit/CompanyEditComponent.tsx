import React, {useState} from 'react';
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
import { useAppDispatch } from '@/hooks/index';
import { patchCompanyProfileRequested } from '@/store/reducers/slice/company/companySlice';
import { useRouter } from 'next/router';
import { getCompanyData } from '@/utils/helper';
import { useFormik } from 'formik';
import { validationSchemeCompanyProfile } from './validate';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<string | null>(detail?.information?.imageUrl);
  const companyData = getCompanyData();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      picture: [],

      // Group Company Information
      companyType: detail?.information?.type?.id,
      companyName: detail?.information?.name,
      companyNPWP: detail?.information?.npwp,
      companySector: detail?.information?.sector?.id,
      companyEmail: detail?.information?.email,
      phoneNumberPrefix: detail?.information?.phoneNumberPrefix,
      phoneNumber: detail?.information?.phoneNumber,

      // Group Company Address
      countryCompanyAddress: detail?.address?.country?.id,
      provinceCompanyAddress: detail?.address?.firstLevel?.code,
      cityCompanyAddress: detail?.address?.secondLevel?.code,
      subDistrictCompanyAddress: detail?.address?.thirdLevel?.code,
      addressCompanyAddress: detail?.address?.address,
      zipCodeCompanyAddress: detail?.address?.zipCode,

      // Group Bank Information
      bankBankInformation: detail?.bank?.bank?.id,
      bankAccountHolderNameBankInformation: detail?.bank?.accountName,
      bankAccoutNoBankInformation: detail?.bank?.accountNumber,
      bankCodeBankInformation: detail?.bank?.bankCode,
      branchCodeBankInformation: detail?.bank?.branchCode,
      branchNameBankInformation: detail?.bank?.branchName,
      swiftCodeBankInformation: detail?.bank?.swiftCode,

      // Group Payroll Information
      isMonthly: !!detail?.payroll?.monthly,
      isWeekly: !!detail?.payroll?.weekly,
      isBiWeekly: !!detail?.payroll?.biWeekly,
      monthlyPeriodStart: detail?.payroll?.monthly ? detail?.payroll?.monthly?.periodStart : '',
      monthlyPeriodEnd: detail?.payroll?.monthly ? detail?.payroll?.monthly?.periodEnd : '',
      monthlyPayrollDate: detail?.payroll?.monthly ? detail?.payroll?.monthly?.payrollDate : '',
      monthlyMethod: detail?.payroll?.monthly ? detail?.payroll?.monthly?.method?.id : '',
      weeklyPeriod: detail?.payroll?.weekly ? detail?.payroll?.weekly?.period : '',
      weeklyMethod: detail?.payroll?.weekly ? detail?.payroll?.weekly?.method?.id : '',
      biWeeklyPeriod: detail?.payroll?.biWeekly ? detail?.payroll?.biWeekly?.period : '',
      biWeeklyPeriodWeek: detail?.payroll?.biWeekly ? detail?.payroll?.biWeekly?.periodWeek : '',
      biWeeklyMethod: detail?.payroll?.biWeekly ? detail?.payroll?.biWeekly?.method?.id : ''
    } as Company.Detail,
    validationSchema: validationSchemeCompanyProfile,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = (val) => {
    const informationData = {
      typeId: val.companyType,
      name: val.companyName,
      npwp: val.companyNPWP || null,
      sectorId: val.companySector,
      email: val.companyEmail,
      phoneNumber: val.phoneNumber,
      phoneNumberPrefix: val.phoneNumberPrefix,
    };

    const addressData = {
      countryId: val.countryCompanyAddress,
      firstLevelCode: val.provinceCompanyAddress,
      secondLevelCode: val.cityCompanyAddress,
      thirdLevelCode: val.subDistrictCompanyAddress,
      fourthLevelCode: null,
      address: val.addressCompanyAddress,
      zipCode: val.zipCodeCompanyAddress,
    };

    const bankData = {
      bankId: val.bankBankInformation,
      accountName: val.bankAccountHolderNameBankInformation,
      accountNumber: val.bankAccoutNoBankInformation,
      bankCode: val.bankCodeBankInformation || null,
      branchCode: val.branchCodeBankInformation || null,
      branchName: val.branchNameBankInformation || null,
      swiftCode: val.swiftCodeBankInformation || null
    };

    let payrollData = {};
    if (val.isMonthly) {
      payrollData = {...payrollData, ...{monthly: {
        periodStart: val.monthlyPeriodStart,
        periodEnd: val.monthlyPeriodEnd,
        payrollDate: val.monthlyPayrollDate,
        methodId: val.monthlyMethod,
      }}};
    } else {
      payrollData = {...payrollData, ...{monthly: null}};
    }

    if (val.isWeekly) {
      payrollData = {...payrollData, ...{weekly: {
        period: val.weeklyPeriod,
        methodId: val.weeklyMethod,
      }}};
    } else {
      payrollData = {...payrollData, ...{weekly: null}};
    }

    if (val.isBiWeekly) {
      payrollData = {...payrollData, ...{biWeekly: {
        period: val.biWeeklyPeriod,
        periodWeek: val.biWeeklyPeriodWeek,
        methodId: val.biWeeklyMethod,
      }}};
    } else {
      payrollData = {...payrollData, ...{biWeekly: null}};
    }

    const inputData = new FormData();
    inputData.append('picture', val?.picture?.length ? val?.picture[0] : detail?.information?.imageUrl);
    inputData.append('information', JSON.stringify(informationData));
    inputData.append('address', JSON.stringify(addressData));
    inputData.append('bank', JSON.stringify(bankData));
    inputData.append('payroll', JSON.stringify(payrollData));
    
    dispatch({
      type: patchCompanyProfileRequested.toString(),
      payload: {id: detail.id, data: inputData}
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabSelected(newValue);
  };

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