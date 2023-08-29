import * as Yup from 'yup';

export const validationSchemeRegister = Yup.object({
  // email: Yup.string().email('Email should be valid').required('Email address is required'),
  email: Yup.string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/, 'Email should be valid')
    .required('Email address is required'),
  password: Yup.string().min(12, 'Password at least have 12 character long').required('Password is required'),
  name: Yup.string().required('Full name is required'),
  countryID: Yup.string().required('Country is required'),
  companyName: Yup.string().required('Company name is required'),
  numberOfEmployees: Yup.string().required('Number of employees is required'),
  phoneNumberPrefix: Yup.string().notRequired(),
  phoneNumber: Yup.string()
    .matches(/^\d{8,11}$/, 'Contact number should have 10 or 13 digits include the national code')
    .required('Contact number is required')
    .typeError('Contact number should be a number'),
});

// phoneNumber: Yup.string()
//     .matches(/^\d{11}$/, 'Contact number should have 12 or 13 digits include the national code')
//     .required('Contact number is required')
//     .typeError('Contact number should be a number'),