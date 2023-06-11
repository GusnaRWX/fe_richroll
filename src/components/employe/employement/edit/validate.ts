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