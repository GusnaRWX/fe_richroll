import * as Yup from 'yup';

export const validationSchemeLogin = Yup.object({
  email: Yup.string().email('Email should be valid').required('Email is required'),
  password: Yup.string().required('Password is required')
});
