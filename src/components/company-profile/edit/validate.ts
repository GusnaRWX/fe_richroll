import * as Yup from 'yup';

export const validationSchemeCompanyProfile = Yup.object({
  picture: Yup.array().notRequired(),
  companyType: Yup.string().required('Company type is required'),
  companyName: Yup.string().required('Company name is required'),
  companyNPWP: Yup.string().notRequired(),
  companySector: Yup.string().required('Company sector is required'),
  companyEmail: Yup.string().email('Email should be valid').required('Email is required'),
  phoneNumberPrefix: Yup.string().required(),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, 'Phone number should have 12 or 13 digits')
    .required('Phone number is required')
    .typeError('Phone number should be a number'),

  countryCompanyAddress: Yup.string().required('Country is required'),
  provinceCompanyAddress: Yup.string().required('Province is required'),
  cityCompanyAddress: Yup.string().required('City is required'),
  subDistrictCompanyAddress: Yup.string().required('Sub District is required'),
  addressCompanyAddress: Yup.string().required('Company Address is required'),
  zipCodeCompanyAddress: Yup.string().required('ZIP Code is required'),

  bankBankInformation: Yup.string().required('Bank is required'),
  bankAccountHolderNameBankInformation: Yup.string().required('Bank Account Holder’s Name is required'),
  bankAccoutNoBankInformation: Yup.string().required('Bank Account No is required'),
  bankCodeBankInformation: Yup.string().notRequired(),
  branchCodeBankInformation: Yup.string().notRequired(),
  branchNameBankInformation: Yup.string().notRequired(),
  swiftCodeBankInformation: Yup.string().notRequired(),

  isMonthly: Yup.boolean().notRequired(),
  isWeekly: Yup.boolean().notRequired(),
  isBiWeekly: Yup.boolean().notRequired(),
  monthlyPeriodStart: Yup.string().notRequired(),
  monthlyPeriodEnd: Yup.string().notRequired(),
  monthlyPayrollDate: Yup.string().notRequired(),
  monthlyMethod: Yup.string().notRequired(),
  weeklyPeriod: Yup.string().notRequired(),
  weeklyMethod: Yup.string().notRequired(),
  biWeeklyPeriod: Yup.string().notRequired(),
  biWeeklyPeriodWeek: Yup.string().notRequired(),
  biWeeklyMethod: Yup.string().notRequired()
});