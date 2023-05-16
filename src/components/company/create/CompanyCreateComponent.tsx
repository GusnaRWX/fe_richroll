import React, {useState} from 'react';
import {
  Box,
  BoxProps,
  AppBar,
  Toolbar,
  Card,
  CardProps,
  Divider,
  Typography,
  Tab,
  Tabs
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { CompanyCreate } from '@/types/component';
import { Image as ImageType } from '@/utils/assetsConstant';
import { IconButton } from '@/components/_shared/form';
import { BsBellFill } from 'react-icons/bs';
import LocalizationMenu from '@/components/_shared/_core/localization/Index';
import Profile from '@/components/_shared/_core/appbar/Profile';
import CompanyInformationForm from './CompanyInformationForm';
import CompanyBankForm from './CompanyBankForm';
import { useForm, useAppDispatch, useAppSelectors } from '@/hooks/index';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted
} from '@/store/reducers/slice/options/optionSlice';
import { postCompanyProfileRequested } from '@/store/reducers/slice/company/companySlice';

const WrapperAuth = styled(Box)<BoxProps>(({ theme }) => ({
  background: theme.palette.secondary[100],
  minHeight: '100vh'
}));

const WrapperCard = styled(Card)<CardProps>(() => ({
  paddingTop: '100px',
  background: 'none',
  borderRadius: 'none',
  boxShadow: 'none',
  paddingLeft: '135px',
  paddingRight: '135px'
}));

const WrapperCardContent = styled(Box)<BoxProps>(() => ({
  borderRadius: '8px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.05)',
  background: 'white',
  padding: '24px'
}));

const WrapperNavbarContent = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
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

const Navbar = () => {
  return (
    <AppBar
      component='nav'
      sx={{
        background: '#FFFFFF',
        color: 'primary.main',
      }}
    >
      <WrapperNavbarContent>
        <Box>
          <Image
            src={ImageType.KAYAROLL_LOGO}
            width={151}
            height={40}
            alt='kayaroll'
          />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: { sm: 1 } }}>
          <IconButton icons={<BsBellFill />} parentColor='' size='small' />
          <Divider sx={{ borderWidth: '0.5px' }} />
          <LocalizationMenu />
          <Divider sx={{ borderWidth: '0.5px' }} />
          <Profile />
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};

const CompanyCreateComponent = ({ companyType, companySector, bank, paymentMethod, countries }: CompanyCreate.Component) => {
  const [tabSelected, setTabSelected] = useState(0);
  const dispatch = useAppDispatch();

  const {
    administrativeFirst,
    administrativeSecond,
    administrativeThird
  } = useAppSelectors(state => state.option);

  const [initialValues] = useState({

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
    zipCodeCompanyAddress: '',

    // Group Bank Information
    bankBankInformation: '',
    bankAccountHolderNameBankInformation: '',
    bankAccoutNoBankInformation: '',
    bankCodeBankInformation: '',
    branchCodeBankInformation: '',
    branchNameBankInformation: '',
    swiftCodeBankInformation: '',

    // Group Payroll Information
    isMonthly: true,
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
    let payrollCheck = {};
    if (values.isMonthly) {
      payrollCheck = {...payrollCheck, ...{monthly: {
        periodStart: values.monthlyPeriodStart,
        periodEnd: values.monthlyPeriodEnd,
        payrollDate: values.monthlyPayrollDate,
        methodId: values.monthlyMethod,
      }}};
    }
    if (values.isWeekly) {
      payrollCheck = {...payrollCheck, ...{weekly: {
        period: values.weeklyPeriod,
        methodId: values.weeklyMethod,
      }}};
    }
    if (values.isBiWeekly) {
      payrollCheck = {...payrollCheck, ...{biWeekly: {
        period: values.biWeeklyPeriod,
        periodWeek: values.biWeeklyPeriodWeek,
        methodId: values.biWeeklyMethod,
      }}};
    }
    const payload = {
      information: {
        imageUrl: 'image.com/image123',
        typeId: values.companyType,
        name: values.companyName,
        npwp: values.companyNPWP,
        sectorId: values.companySector,
        email: values.companyEmail,
        contact: values.phoneNumberPrefix + values.phoneNumber,
      },
      address: {
        countryId: values.countryCompanyAddress,
        firstLevelCode: values.provinceCompanyAddress,
        secondLevelCode: values.cityCompanyAddress,
        thirdLevelCode: values.subDistrictCompanyAddress,
        fourthLevelCode: 'kosong',
        address: values.addressCompanyAddress,
        zipCode: values.zipCodeCompanyAddress,
      },
      bank: {
        bankId: values.bankBankInformation,
        accountName: values.bankAccountHolderNameBankInformation,
        accountNumber: values.bankAccoutNoBankInformation,
        bankCode: values.bankCodeBankInformation,
        branchCode: values.branchCodeBankInformation,
        branchName: values.branchNameBankInformation,
        swiftCode: values.swiftCodeBankInformation
      },
      payroll: payrollCheck
    };
    
    dispatch({
      type: postCompanyProfileRequested.toString(),
      payload: payload
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabSelected(newValue);
  };
  const handleNext = (val: number) => {
    setTabSelected(val);
  };

  return (
    <>
      <Navbar />
      <WrapperAuth>
        <WrapperCard>
          <Typography
            variant='text-lg'
            component='div'
            sx={{ fontWeight: 700, mb: '24px' }}
          >
            Create Company Profile
          </Typography>
          <WrapperCardContent>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabSelected} onChange={handleChange} aria-label='basic tabs'>
                  <Tab sx={{ textTransform: 'none' }} label='Company Information' {...a11yProps(0)} />
                  <Tab sx={{ textTransform: 'none' }} label='Bank and Payroll Information' {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={tabSelected} index={0}>
                <CompanyInformationForm
                  nextPage={handleNext}
                  companyType={companyType}
                  companySector={companySector}
                  countries={countries}
                  administrativeFirst={administrativeFirst}
                  administrativeSecond={administrativeSecond}
                  administrativeThird={administrativeThird}
                  values={values}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
              </TabPanel>
              <TabPanel value={tabSelected} index={1}>
                <CompanyBankForm
                  handleSubmit={handleSubmit}
                  values={values}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  bank={bank}
                  paymentMethod={paymentMethod}
                />
              </TabPanel>
            </Box>
          </WrapperCardContent>
        </WrapperCard>

      </WrapperAuth>
    </>
  );
};

export default CompanyCreateComponent;