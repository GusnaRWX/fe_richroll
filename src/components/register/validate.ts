import * as Yup from 'yup';

export const validationSchemeRegister = Yup.object({
  email: Yup.string().email('Email should be valid').required('Email is required'),
  password: Yup.string().min(8, 'Password at least have 8 character long').matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    'Include Uppercase and lowercase, Include at least one number or symbol'
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