import * as Yup from 'yup';

export const validationSchemeRegister = Yup.object({
  email: Yup.string().email('Email should be valid').required('Email is required'),
  password: Yup.string().min(12, 'Password at least have 12 character long').matches(
    /^[A-Za-z]+$/,
    'Password should a character not a number and special character'
  ).required('Password is required'),
  name: Yup.string().required('Full name is required'),
  countryID: Yup.string().required('Country is required'),
  companyName: Yup.string().required('Company name is required'),
  numberOfEmployees: Yup.string().required('Employee is required'),
  phoneNumberPrefix: Yup.string().notRequired(),
  phoneNumber: Yup.string()
    .matches(/^\d{12,13}$/, 'Phone number should have 12 or 13 digits')
    .required('Phone number is required')
    .typeError('Phone number should be a number')
});