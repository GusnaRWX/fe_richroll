import * as Yup from 'yup';

export const validationSchemeLogin = Yup.object({
  email: Yup.string().email('Email should be valid').required('Email is required'),
  password: Yup.string().min(12, 'Password is too short(min of 12 character) and needs at least 1 upper case letter, 1 symbol and 1 number').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/,
    'Password is too short(min of 12 character) and needs at least 1 upper case letter, 1 symbol and 1 number'
  ).required('Password is required')
});
