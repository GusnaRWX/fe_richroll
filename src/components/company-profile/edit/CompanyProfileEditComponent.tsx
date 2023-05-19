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
import { CompanyEdit } from '@/types/component';
import CompanyInformationForm from './CompanyProfileInformationForm';
import CompanyBankForm from './CompanyProfileBankForm';
import { useForm, useAppDispatch, useAppSelectors } from '@/hooks/index';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted
} from '@/store/reducers/slice/options/optionSlice';
import { patchCompanyProfileRequested } from '@/store/reducers/slice/company/companySlice';
import { base64ToFile } from '@/utils/helper';
import { useRouter } from 'next/router';
import { getCompanyData } from '@/utils/helper';

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

  const {
    administrativeFirst,
    administrativeSecond,
    administrativeThird
  } = useAppSelectors(state => state.option);

  const [initialValues] = useState({

    // Group Company Information
    companyType: detail?.information?.type?.id,
    companyName: detail?.information?.name,
    companyNPWP: detail?.information?.npwp,
    companySector: detail?.information?.sector?.id,
    companyEmail: detail?.information?.email,
    phoneNumberPrefix: detail?.information?.contact.slice(0,3),
    phoneNumber: detail?.information?.contact,

    // Group Company Address
    countryCompanyAddress: detail?.address?.country?.code,
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
    monthlyPeriodStart: detail?.payroll?.monthly?.periodStart,
    monthlyPeriodEnd: detail?.payroll?.monthly?.periodEnd,
    monthlyPayrollDate: detail?.payroll?.monthly?.payrollDate,
    monthlyMethod: detail?.payroll?.monthly?.method?.id,
    weeklyPeriod: detail?.payroll?.weekly?.period,
    weeklyMethod: detail?.payroll?.weekly?.method?.id,
    biWeeklyPeriod: detail?.payroll?.biWeekly?.period,
    biWeeklyPeriodWeek: detail?.payroll?.biWeekly?.periodWeek,
    biWeeklyMethod: detail?.payroll?.biWeekly?.method?.id
  });

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };

    // Group Company Information
    if ('companyType' in fieldOfValues)
      temp.companyType = fieldOfValues.companyType ? '' : 'This field is required';

    if ('companyName' in fieldOfValues)
      temp.companyName = fieldOfValues.companyName ? '' : 'This field is required';

    if ('companyNPWP' in fieldOfValues)
      temp.companyNPWP = fieldOfValues.companyNPWP ? '' : 'This field is required';

    if ('companySector' in fieldOfValues)
      temp.companySector = fieldOfValues.companySector ? '' : 'This field is required';

    if ('companyEmail' in fieldOfValues)
      temp.companyEmail = fieldOfValues.companyEmail ? '' : 'This field is required';

    if ('phoneNumberPrefix' in fieldOfValues)
      temp.phoneNumberPrefix = fieldOfValues.phoneNumberPrefix ? '' : 'This field is required';

    if ('phoneNumber' in fieldOfValues)
      temp.phoneNumber = fieldOfValues.phoneNumber ? '' : 'This field is required';


    // Group Company Address
    if ('countryCompanyAddress' in fieldOfValues)
      temp.countryCompanyAddress = fieldOfValues.countryCompanyAddress
        ? dispatch({
          type: administrativeFirstLevelRequested.toString(),
          payload: {
            countryId: fieldOfValues.countryCompanyAddress
          }
        })
        : 'This field is required';

    if ('provinceCompanyAddress' in fieldOfValues)
      temp.provinceCompanyAddress = fieldOfValues.provinceCompanyAddress
        ? dispatch({
          type: administrativeSecondLevelRequested.toString(),
          payload: {
            countryId: values.countryCompanyAddress,
            firstLevelCode: fieldOfValues.provinceCompanyAddress
          }
        })
        : 'This field is required';

    if ('cityCompanyAddress' in fieldOfValues)
      temp.cityCompanyAddress = fieldOfValues.cityCompanyAddress
        ? dispatch({
          type: administrativeThirdLevelRequsted.toString(),
          payload: {
            countryId: values.countryCompanyAddress,
            firstLevelCode: values.provinceCompanyAddress,
            secondLevelCode: fieldOfValues.cityCompanyAddress
          }
        })
        : 'This field is required';

    if ('subDistrictCompanyAddress' in fieldOfValues)
      temp.subDistrictCompanyAddress = fieldOfValues.subDistrictCompanyAddress ? '' : 'This field is required';

    if ('addressCompanyAddress' in fieldOfValues)
      temp.addressCompanyAddress = fieldOfValues.addressCompanyAddress ? '' : 'This field is required';

    if ('zipCodeCompanyAddress' in fieldOfValues)
      temp.zipCodeCompanyAddress = fieldOfValues.zipCodeCompanyAddress ? '' : 'This field is required';


    // Group Bank Information
    if ('bankBankInformation' in fieldOfValues)
      temp.bankBankInformation = fieldOfValues.bankBankInformation ? '' : 'This field is required';

    if ('bankAccountHolderNameBankInformation' in fieldOfValues)
      temp.bankAccountHolderNameBankInformation = fieldOfValues.bankAccountHolderNameBankInformation ? '' : 'This field is required';

    if ('bankAccoutNoBankInformation' in fieldOfValues)
      temp.bankAccoutNoBankInformation = fieldOfValues.bankAccoutNoBankInformation ? '' : 'This field is required';

    if ('bankCodeBankInformation' in fieldOfValues)
      temp.bankCodeBankInformation = fieldOfValues.bankCodeBankInformation ? '' : 'This field is required';

    if ('branchCodeBankInformation' in fieldOfValues)
      temp.branchCodeBankInformation = fieldOfValues.branchCodeBankInformation ? '' : 'This field is required';

    if ('branchNameBankInformation' in fieldOfValues)
      temp.branchNameBankInformation = fieldOfValues.branchNameBankInformation ? '' : 'This field is required';

    if ('swiftCodeBankInformation' in fieldOfValues)
      temp.swiftCodeBankInformation = fieldOfValues.swiftCodeBankInformation ? '' : 'This field is required';
      
      
    // Group Payroll Information
    if ('monthlyPeriodStart' in fieldOfValues && fieldOfValues.isMonthly)
      temp.monthlyPeriodStart = fieldOfValues.monthlyPeriodStart ? '' : 'This field is required';
      
    if ('monthlyPeriodEnd' in fieldOfValues && fieldOfValues.isMonthly)
      temp.monthlyPeriodEnd = fieldOfValues.monthlyPeriodEnd ? '' : 'This field is required';

    if ('monthlyPayrollDate' in fieldOfValues && fieldOfValues.isMonthly)
      temp.monthlyPayrollDate = fieldOfValues.monthlyPayrollDate ? '' : 'This field is required';

    if ('monthlyMethod' in fieldOfValues && fieldOfValues.isMonthly)
      temp.monthlyMethod = fieldOfValues.monthlyMethod ? '' : 'This field is required';

    if ('weeklyPeriod' in fieldOfValues && fieldOfValues.isWeekly)
      temp.weeklyPeriod = fieldOfValues.weeklyPeriod ? '' : 'This field is required';

    if ('weeklyMethod' in fieldOfValues && fieldOfValues.isWeekly)
      temp.weeklyMethod = fieldOfValues.weeklyMethod ? '' : 'This field is required';

    if ('biWeeklyPeriod' in fieldOfValues && fieldOfValues.isBiWeekly)
      temp.biWeeklyPeriod = fieldOfValues.biWeeklyPeriod ? '' : 'This field is required';

    if ('biWeeklyPeriodWeek' in fieldOfValues && fieldOfValues.isBiWeekly)
      temp.biWeeklyPeriodWeek = fieldOfValues.biWeeklyPeriodWeek ? '' : 'This field is required';

    if ('biWeeklyMethod' in fieldOfValues && fieldOfValues.isBiWeekly)
      temp.biWeeklyMethod = fieldOfValues.biWeeklyMethod ? '' : 'This field is required';


    setErrors({ ...temp });

    if (fieldOfValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
  };
  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const convertToBase64 = base64ToFile(images as string, 'example.png');

    const informationData = {
      typeId: values.companyType,
      name: values.companyName,
      npwp: values.companyNPWP,
      sectorId: values.companySector,
      email: values.companyEmail,
      contact: values.phoneNumberPrefix + values.phoneNumber,
    };

    const addressData = {
      countryId: values.countryCompanyAddress,
      firstLevelCode: values.provinceCompanyAddress,
      secondLevelCode: values.cityCompanyAddress,
      thirdLevelCode: values.subDistrictCompanyAddress,
      fourthLevelCode: null,
      address: values.addressCompanyAddress,
      zipCode: values.zipCodeCompanyAddress,
    };

    const bankData = {
      bankId: values.bankBankInformation,
      accountName: values.bankAccountHolderNameBankInformation,
      accountNumber: values.bankAccoutNoBankInformation,
      bankCode: values.bankCodeBankInformation,
      branchCode: values.branchCodeBankInformation,
      branchName: values.branchNameBankInformation,
      swiftCode: values.swiftCodeBankInformation
    };

    let payrollData = {};
    if (values.isMonthly) {
      payrollData = {...payrollData, ...{monthly: {
        periodStart: values.monthlyPeriodStart,
        periodEnd: values.monthlyPeriodEnd,
        payrollDate: values.monthlyPayrollDate,
        methodId: values.monthlyMethod,
      }}};
    }
    if (values.isWeekly) {
      payrollData = {...payrollData, ...{weekly: {
        period: values.weeklyPeriod,
        methodId: values.weeklyMethod,
      }}};
    }
    if (values.isBiWeekly) {
      payrollData = {...payrollData, ...{biWeekly: {
        period: values.biWeeklyPeriod,
        periodWeek: values.biWeeklyPeriodWeek,
        methodId: values.biWeeklyMethod,
      }}};
    }

    const inputData = new FormData();
    inputData.append('picture', values.picture[0] || convertToBase64);
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
              onClick={(e) => { handleSubmit(e); }}
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
              administrativeFirst={administrativeFirst}
              administrativeSecond={administrativeSecond}
              administrativeThird={administrativeThird}
              values={values}
              errors={errors}
              handleInputChange={handleInputChange}
              images={images}
              setImages={setImages}
            />
          </TabPanel>
          <TabPanel value={tabSelected} index={1}>
            <CompanyBankForm
              values={values}
              errors={errors}
              handleInputChange={handleInputChange}
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