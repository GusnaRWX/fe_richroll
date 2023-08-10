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
  department: Yup.string().required('This field is required'),
  position: Yup.string().required('This field is required'),
  isSelfService: Yup.bool().notRequired()
});

export const validationSchemaWorkScheduler = Yup.object({
  workScheduleID: Yup.string().required('This field is required'),
  type: Yup.string(),
  flexiWorkHour: Yup.string().typeError('This field is required').when('type', { is: '1', then: (schema) => schema.required('This field is required') }),
  flexiWorkDay: Yup.string().typeError('This field is required').when('type', { is: '1', then: (schema) => schema.required('This field is required') }),
  fixedStartTime: Yup.string().typeError('This field is required').when('type', { is: '0', then: (schema) => schema.required('This field is required') }),
  fixedEndTime: Yup.string().typeError('This field is required').when('type', { is: '0', then: (schema) => schema.required('This field is required') }),
  fixedWorkDayType: Yup.string().typeError('This field is required').when('type', { is: '0', then: (schema) => schema.required('This field is required') }),
});

const baseSchema = Yup.object({
  componentID: Yup.string(),
  termID: Yup.string(),
  isTaxable: Yup.string(),
  amount: Yup.string(),
  amountType: Yup.string(),
  rate: Yup.string().nullable().default('0'),
  rateType: Yup.string().nullable().default('0'),
  id: Yup.string().notRequired()
});

export const validateCnb = Yup.object({
  templateId: Yup.string().notRequired(),
  name: Yup.string().required(),
  overtime: Yup.string(),
  base: baseSchema,
  supplementary: Yup.array().of(
    Yup.object().shape({
      componentID: Yup.string(),
      termID: Yup.string(),
      isTaxable: Yup.string(),
      amount: Yup.string(),
      amountType: Yup.string(),
      rate: Yup.string().nullable().default('0'),
      rateType: Yup.string().nullable().default('0'),
      id: Yup.string().notRequired()
    })
  )
});