import * as Yup from 'yup';

export const validationUpdatePassword = Yup.object({
  currentPassword: Yup.string().notRequired(),
  newPassword: Yup.string().notRequired(),
  repeatPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'New password and Repeat password should match').required('Repeat password is required')
});