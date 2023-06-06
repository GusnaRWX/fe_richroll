import * as Yup from 'yup';

export const validationSchemeCompanyProfile = Yup.object({
  picture: Yup.mixed().notRequired(),
  companyType: Yup.string().required('Company type is required'),
  companyName: Yup.string().required('Company name is required'),
  companyNPWP: Yup.string().notRequired(),
  companySector: Yup.string().required('Company sector is required'),
  companyEmail: Yup.string().email('Email should be valid').required('Email is required'),
  phoneNumberPrefix: Yup.string().required(),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, 'Phone number should have 12 or 13 digits include the nation code')
    .required('Phone number is required')
    .typeError('Phone number should be a number'),

  countryCompanyAddress: Yup.string().required('Country is required'),
  provinceCompanyAddress: Yup.string().required('Province is required'),
  cityCompanyAddress: Yup.string().required('City is required'),
  subDistrictCompanyAddress: Yup.string().required('Sub District is required'),
  addressCompanyAddress: Yup.string().required('Company Address is required'),
  zipCodeCompanyAddress: Yup.string().required('ZIP Code is required'),

  // bankBankInformation: Yup.string().required('Bank is required'),
  bankBankInformation: Yup.string().test({
    name: 'bankBankInformation',
    test: function (value) {
      const fieldsToCheck = [
        this.resolve(Yup.ref('companyType')),
        this.resolve(Yup.ref('companyName')),
        this.resolve(Yup.ref('companyNPWP')),
        this.resolve(Yup.ref('companySector')),
        this.resolve(Yup.ref('companyEmail')),
        this.resolve(Yup.ref('phoneNumberPrefix')),
        this.resolve(Yup.ref('phoneNumber')),
        this.resolve(Yup.ref('countryCompanyAddress')),
        this.resolve(Yup.ref('provinceCompanyAddress')),
        this.resolve(Yup.ref('cityCompanyAddress')),
        this.resolve(Yup.ref('subDistrictCompanyAddress')),
        this.resolve(Yup.ref('addressCompanyAddress')),
        this.resolve(Yup.ref('zipCodeCompanyAddress')),
      ];

      const areFieldsFilled = fieldsToCheck.every(field => field !== undefined && field !== '');

      if (areFieldsFilled) {
        return value !== undefined && value !== '';
      }

      return true;
    },
    message: 'Bank is required',
  }),

  // bankAccountHolderNameBankInformation: Yup.string().required('Bank Account Holder’s Name is required'),
  bankAccountHolderNameBankInformation: Yup.string().test({
    name: 'bankAccountHolderNameBankInformation',
    test: function (value) {
      const fieldsToCheck = [
        this.resolve(Yup.ref('companyType')),
        this.resolve(Yup.ref('companyName')),
        this.resolve(Yup.ref('companyNPWP')),
        this.resolve(Yup.ref('companySector')),
        this.resolve(Yup.ref('companyEmail')),
        this.resolve(Yup.ref('phoneNumberPrefix')),
        this.resolve(Yup.ref('phoneNumber')),
        this.resolve(Yup.ref('countryCompanyAddress')),
        this.resolve(Yup.ref('provinceCompanyAddress')),
        this.resolve(Yup.ref('cityCompanyAddress')),
        this.resolve(Yup.ref('subDistrictCompanyAddress')),
        this.resolve(Yup.ref('addressCompanyAddress')),
        this.resolve(Yup.ref('zipCodeCompanyAddress')),
      ];

      const areFieldsFilled = fieldsToCheck.every(field => field !== undefined && field !== '');

      if (areFieldsFilled) {
        return value !== undefined && value !== '';
      }

      return true;
    },
    message: 'Bank Account Holder’s Name is required',
  }),
  // bankAccoutNoBankInformation: Yup.string().required('Bank Account No is required'),
  bankAccoutNoBankInformation: Yup.string().test({
    name: 'bankAccoutNoBankInformation',
    test: function (value) {
      const fieldsToCheck = [
        this.resolve(Yup.ref('companyType')),
        this.resolve(Yup.ref('companyName')),
        this.resolve(Yup.ref('companyNPWP')),
        this.resolve(Yup.ref('companySector')),
        this.resolve(Yup.ref('companyEmail')),
        this.resolve(Yup.ref('phoneNumberPrefix')),
        this.resolve(Yup.ref('phoneNumber')),
        this.resolve(Yup.ref('countryCompanyAddress')),
        this.resolve(Yup.ref('provinceCompanyAddress')),
        this.resolve(Yup.ref('cityCompanyAddress')),
        this.resolve(Yup.ref('subDistrictCompanyAddress')),
        this.resolve(Yup.ref('addressCompanyAddress')),
        this.resolve(Yup.ref('zipCodeCompanyAddress')),
      ];

      const areFieldsFilled = fieldsToCheck.every(field => field !== undefined && field !== '');

      if (areFieldsFilled) {
        return value !== undefined && value !== '';
      }

      return true;
    },
    message: 'Bank Account No is required',
  }),
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