import * as Yup from 'yup';

export const validationSchemeEmployeeInformation = Yup.object({
  picture: Yup.mixed().notRequired(),
  fullName: Yup.string().required('This field is required'),
  nickname: Yup.string().notRequired(),
  phoneNumberPrefix: Yup.string().notRequired(),
  phoneNumber: Yup.string().matches(/^\d{11}$/, 'Phone number should have 12 or 13 digits')
    .required('Phone number is required')
    .typeError('Phone number should be a number'),
  email: Yup.string().email('Email should be valid').required('Email is required'),
  startDate: Yup.date().typeError('This field is required').required(),
  endDate: Yup.string().notRequired(),
  isPermanent: Yup.bool().notRequired(),
  department: Yup.string().notRequired(),
  position: Yup.string().notRequired(),
  isSelfService: Yup.bool().notRequired()
});

export const validationSchemePersonalInformation = Yup.object().shape({
  // Group Personal Information
  dateofBirthPersonalInformation: Yup.date().typeError('This field is required').required(),
  genderPersonalInformation: Yup.string(),
  // .required('This field is required').oneOf(['male', 'female'], 'This field is required'),
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
  // employeeID: Yup.string().notRequired(),
  fullNamePrimary: Yup.string().required('This field is required'),
  relationPrimary: Yup.string().notRequired(),
  phoneNumberPrefixPrimary: Yup.string().notRequired(),
  phoneNumberPrimary: Yup.string().matches(/^\d{11}$/, 'Phone number should have 12 or 13 digits')
    .required('Phone number is required')
    .typeError('Phone number should be a number'),
  fullNameSecondary: Yup.string().notRequired(),
  relationSecondary: Yup.string().notRequired(),
  phoneNumberPrefixSecondary: Yup.string().notRequired(),
  phoneNumberSecondary: Yup.string().notRequired()
});

export const validationSchemeCompensationBenefits = Yup.object({
  templateID: Yup.string().notRequired(),
  name: Yup.string().required('this field is required'),
  compensationComponentId: Yup.string().required('This field is rquired'),
  period: Yup.string().required('This field is rquired'),
  rateOrAmount: Yup.number().required('THis field is rquird').positive('Must be positive').integer('must be number'),
  taxStatus: Yup.string().required('This field is rquired'),
  supplementary: Yup.array().of(
    Yup.object().shape({
      compensationComponentID: Yup.string().required('this field is required'),
      period: Yup.string().required('This is required'),
      rateOrAmount: Yup.number().required('This is required').positive('Must be positive').integer('Must be number'),
      taxStatus: Yup.string().required('This is required')
    })
  )
});
export const validationSchemaWorkScheduler = Yup.object({
  workScheduleID: Yup.string().required('This field is required'),
  type: Yup.string(),
  flexiWorkHour: Yup.string().typeError('This field is required').when('type', { is: 1, then: (schema) => schema.required('This field is required') }),
  flexiWorkDay: Yup.string().typeError('This field is required').when('type', { is: 1, then: (schema) => schema.required('This field is required') }),
  fixedStartTime: Yup.string().typeError('This field is required').when('type', { is: 0, then: (schema) => schema.required('This field is required') }),
  fixedEndTime: Yup.string().typeError('This field is required').when('type', { is: 0, then: (schema) => schema.required('This field is required') }),
  fixedWorkDayType: Yup.string().typeError('This field is required').when('type', { is: 0, then: (schema) => schema.required('This field is required') }),
});