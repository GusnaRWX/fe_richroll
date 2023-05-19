import * as Yup from 'yup';

export const validationSchemeLogin = Yup.object({
  email: Yup.string().email('Email should be valid').required('Email is required'),
  password: Yup.string().min(8, 'Password at least have 8 character long').matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    'Include Uppercase and lowercase, Include at least one number or symbol'
  ).required('Password is required')
});
