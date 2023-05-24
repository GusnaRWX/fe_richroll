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
import { Company, CompanyCreate } from '@/types/component';
import { Image as ImageType } from '@/utils/assetsConstant';
import { IconButton } from '@/components/_shared/form';
import { BsBellFill } from 'react-icons/bs';
import LocalizationMenu from '@/components/_shared/_core/localization/Index';
import Profile from '@/components/_shared/_core/appbar/Profile';
import CompanyInformationForm from './CompanyInformationForm';
import CompanyBankForm from './CompanyBankForm';
import { useAppDispatch } from '@/hooks/index';
import { postCompanyProfileRequested } from '@/store/reducers/slice/company/companySlice';
import { base64ToFile } from '@/utils/helper';
import { useFormik } from 'formik';
import { validationSchemeCompanyProfile } from './validate';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      picture: [],

      // Group Company Information
      companyType: '',
      companyName: '',
      companyNPWP: null,
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
      bankCodeBankInformation: null,
      branchCodeBankInformation: null,
      branchNameBankInformation: null,
      swiftCodeBankInformation: null,

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
    } as Company.Detail,
    validationSchema: validationSchemeCompanyProfile,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = (val) => {
    const convertToBase64 = base64ToFile(images as string, 'example.png');

    const informationData = {
      typeId: val.companyType,
      name: val.companyName,
      npwp: val.companyNPWP,
      sectorId: val.companySector,
      email: val.companyEmail,
      phoneNumber: val.phoneNumber.toString(),
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
      bankCode: val.bankCodeBankInformation,
      branchCode: val.branchCodeBankInformation,
      branchName: val.branchNameBankInformation,
      swiftCode: val.swiftCodeBankInformation
    };

    let payrollData = {};
    if (val.isMonthly) {
      payrollData = {...payrollData, ...{monthly: {
        periodStart: val.monthlyPeriodStart,
        periodEnd: val.monthlyPeriodEnd,
        payrollDate: val.monthlyPayrollDate,
        methodId: val.monthlyMethod,
      }}};
    }
    if (val.isWeekly) {
      payrollData = {...payrollData, ...{weekly: {
        period: val.weeklyPeriod,
        methodId: val.weeklyMethod,
      }}};
    }
    if (val.isBiWeekly) {
      payrollData = {...payrollData, ...{biWeekly: {
        period: val.biWeeklyPeriod,
        periodWeek: val.biWeeklyPeriodWeek,
        methodId: val.biWeeklyMethod,
      }}};
    }

    const inputData = new FormData();
    inputData.append('picture', val?.picture?.length ? val.picture[0] : convertToBase64);
    inputData.append('information', JSON.stringify(informationData));
    inputData.append('address', JSON.stringify(addressData));
    inputData.append('bank', JSON.stringify(bankData));
    inputData.append('payroll', JSON.stringify(payrollData));
    
    dispatch({
      type: postCompanyProfileRequested.toString(),
      payload: inputData
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
          </WrapperCardContent>
        </WrapperCard>

      </WrapperAuth>
    </>
  );
};

export default CompanyCreateComponent;