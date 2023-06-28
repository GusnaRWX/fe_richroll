import * as Yup from 'yup';

export const validationSchemeCreateLeaveEntries = Yup.object({
  leaveFrom: Yup.date().notRequired(),
  leaveTo: Yup.date().notRequired(),
  leaveType: Yup.string().notRequired(),
  leaveStatus: Yup.string().notRequired(),
  halfFrom: Yup.date().notRequired(),
  halfTo: Yup.date().notRequired(),
  note: Yup.string().notRequired()
});

export const validationSchemeUpdateLeaveEntries = Yup.object({
  leaveType: Yup.string().notRequired(),
  leaveStatus: Yup.string().notRequired(),
  leaveFrom: Yup.date().notRequired(),
  leaveTo: Yup.date().notRequired(),
  note: Yup.string()
});