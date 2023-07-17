import React, { useState } from 'react';
import {
  Box,
  BoxProps,
  AppBar,
  Toolbar,
  Card,
  CardProps,
  Divider,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Company, CompanyCreate } from '@/types/component';
import { Image as ImageType } from '@/utils/assetsConstant';
import { IconButton, Stepper } from '@/components/_shared/form';
import { BsBellFill } from 'react-icons/bs';
import LocalizationMenu from '@/components/_shared/_core/localization/LocalizationMenu';
import Profile from '@/components/_shared/_core/appbar/Profile';
import CompanyInformationForm from './CompanyInformationForm';
import CompanyBankForm from './CompanyBankForm';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { postCompanyProfileRequested, postCompanyPaymentsRequested } from '@/store/reducers/slice/company/companySlice';
import { base64ToFile } from '@/utils/helper';
import { useFormik } from 'formik';
import { validationSchemeCompanyProfile, validationSchemeCompanyProfilePayment } from './validate';

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

const steps = [
  'Company Information',
  'Bank and Payroll Information'
];

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

const CompanyCreateComponent = ({ companyType, companySector, bank, paymentMethod, countries, listAllCompany }: CompanyCreate.Component) => {
  const [tabSelected, setTabSelected] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<string | null>(null);
  const companyID = useAppSelectors(state => state.company.companyID);
  const dispatch = useAppDispatch();

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
    } as Company.Payment,
    validationSchema: validationSchemeCompanyProfilePayment,
    onSubmit: (values) => {
      handleSubmitPayment(values);
    }
  });

  const handleSubmitDetail = (val) => {
    const convertToBase64 = base64ToFile(images as string, 'example.png');

    const informationData = {
      typeID: val.companyType,
      name: val.companyName,
      taxIDNumber: val.companyNPWP,
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
    const logoTemp = val?.picture?.length ? val.picture[0] : convertToBase64;
    if (logoTemp) inputData.append('logo', logoTemp);
    for (const key in informationData) {
      if (informationData[key]) inputData.append(`${key}`, informationData[key]);
    }
    inputData.append('address', JSON.stringify(addressData));

    dispatch({
      type: postCompanyProfileRequested.toString(),
      payload: {
        companyProfile: inputData
      }
    });
  };

  const handleSubmitPayment = (val) => {
    const bankData = {
      bankID: val.bankBankInformation,
      holder: val.bankAccountHolderNameBankInformation,
      accountNumber: val.bankAccoutNoBankInformation,
      bankCode: val.bankCodeBankInformation,
      branchCode: val.branchCodeBankInformation,
      branchName: val.branchNameBankInformation,
      swiftCode: val.swiftCodeBankInformation
    };

    let payrollData = {};
    if (val.isMonthly) {
      payrollData = {
        ...payrollData, ...{
          monthly: {
            start: val.monthlyPeriodStart,
            end: val.monthlyPeriodEnd,
            payrollDate: val.monthlyPayrollDate,
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
            start: val.weeklyPeriod,
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
            start: val.biWeeklyPeriod,
            end: val.biWeeklyPeriodWeek,
            methodID: val.biWeeklyMethod,
            type: 2
          }
        }
      };
    }
    console.log(companyID);
    
    dispatch({
      type: postCompanyPaymentsRequested.toString(),
      payload: {
        companyID: companyID,
        payments: {
          bank: bankData,
          payrolls: payrollData
        }
      }
    });
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
              <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: '30px', mb: '10px' }}>
                <Stepper steps={steps} activeStep={tabSelected} />
              </Box>
              {tabSelected == 0 &&
                <CompanyInformationForm
                  nextPage={handleNext}
                  companyType={companyType}
                  companySector={companySector}
                  countries={countries}
                  formik={formikDetail}
                  images={images}
                  setImages={setImages}
                  listAllCompany={listAllCompany}
                />
              }
              {tabSelected == 1 &&
                <CompanyBankForm
                  formik={formikPayment}
                  bank={bank}
                  paymentMethod={paymentMethod}
                />
              }
            </Box>
          </WrapperCardContent>
        </WrapperCard>

      </WrapperAuth>
    </>
  );
};

export default CompanyCreateComponent;