import * as Yup from 'yup';

export const validationSchemeEmployeeInformation = Yup.object({
  picture: Yup.mixed().test('imageValidate', 'This field is required', function (value: unknown) {
    if (!value || (value as []).length === 0) {
      return this.createError({
        path: 'picture',
        message: 'This field is required'
      });
    }
    return true;
  }),
  fullName: Yup.string().required('This field is required'),
  nickname: Yup.string().notRequired(),
  phoneNumberPrefix: Yup.string().notRequired(),
  phoneNumber: Yup.string().matches(/^\d{12,13}$/, 'Phone number should have 12 or 13 digits')
    .required('Phone number is required')
    .typeError('Phone number should be a number'),
  email: Yup.string().email('Email should be valid').required('Email is required'),
  startDate: Yup.date().typeError('This field is required').required(),
  endDate: Yup.date().notRequired(),
  isPermanent: Yup.bool().notRequired(),
  department: Yup.string().notRequired(),
  position: Yup.string().notRequired(),
  isSelfService: Yup.bool().notRequired()
});

export const validationSchemePersonalInformation = Yup.object().shape({
  // Group Personal Information 
  dateofBirthPersonalInformation: Yup.date().typeError('This field is required').required(),
  genderPersonalInformation: Yup.string().required('This field is required').oneOf(['male', 'female'], 'This field is required'),
  maritialStatusPersonalInformation: Yup.number().min(1, 'This field is required').required('This field is required'),
  numberOfDependantsPersonalInformation: Yup.number().required('This field is required'),
  nationalityPersonalInformation: Yup.string().required('This field is required'),
  religionPersonalInformation: Yup.string().notRequired(),

  // Group Citizen Address
  countryCitizenAddress: Yup.string().required('This field is required'),
  provinceCitizenAddress: Yup.string().required('This field is required'),
  cityCitizenAddress: Yup.string().required('This field is required'),
  subDistrictCitizenAddress: Yup.string().required('This field is required'),
  addressCitizenAddress: Yup.string().required('This field is required'),
  zipCodeCitizenAddress: Yup.string().required('This field is required'),

  // Group Residential Address 
  countryResidentialAddress: Yup.string().required('This field is required'),
  provinceResidentialAddress: Yup.string().required('This field is required'),
  cityResidentialAddress: Yup.string().required('This field is required'),
  subDistrictResidentialAddress: Yup.string().required('This field is required'),
  addressResidentialAddress: Yup.string().required('This field is required'),
  zipCodeResidentialAddress: Yup.string().required('This field is required'),

  // Group Bank Information
  bankBankInformation: Yup.string().notRequired(),
  bankAccountHolderNameBankInformation: Yup.string().notRequired(),
  bankAccoutNoBankInformation: Yup.string().notRequired(),
  bankCodeBankInformation: Yup.string().notRequired(),
  branchCodeBankInformation: Yup.string().notRequired(),
  branchNameBankInformation: Yup.string().notRequired(),
  swiftCodeBankInformation: Yup.string().notRequired(),

  // Group Personal ID
  idTypePersonalID: Yup.string().required('This field is required'),
  idNumberPersonalID: Yup.string().required('This field is required'),
  idExpirationDatePersonalID: Yup.date().typeError('This field is required').required()
});

export const validationSchemeEmployeeEmergencyContact = Yup.object({
  employeeID: Yup.string().notRequired(),
  fullNamePrimary: Yup.string().required('This field is required'),
  relationPrimary: Yup.string().notRequired(),
  phoneNumberPrefixPrimary: Yup.string().notRequired(),
  phoneNumberPrimary: Yup.string().matches(/^\d{12,13}$/, 'Phone number should have 12 or 13 digits')
    .required('Phone number is required')
    .typeError('Phone number should be a number'),
  fullNameSecondary: Yup.string().notRequired(),
  relationSecondary: Yup.string().notRequired(),
  phoneNumberPrefixSecondary: Yup.string().notRequired(),
  phoneNumberSecondary: Yup.string().notRequired()
});