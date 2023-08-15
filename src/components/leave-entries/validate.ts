import * as Yup from 'yup';

export const validationSchemeCreateLeaveEntries = Yup.object({
  leaveFrom: Yup.date().required('This field is Required'),
  leaveType: Yup.string().required('This field is required'),
  leaveStatus: Yup.string().required('This field is required'),
  halfFrom: Yup.date().notRequired(),
  halfTo: Yup.date().notRequired(),
  note: Yup.string().required('This field is required')
});

export const validationSchemeUpdateLeaveEntries = Yup.object({
  leaveType: Yup.string().notRequired(),
  leaveStatus: Yup.string().notRequired(),
  leaveFrom: Yup.date().notRequired(),
  halfTo: Yup.date().notRequired(),
  halfFrom: Yup.date().notRequired(),
  note: Yup.string()
});