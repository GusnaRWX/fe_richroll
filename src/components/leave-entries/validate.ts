import * as Yup from 'yup';

export const validationSchemeCreateLeaveEntries = Yup.object({
  leaveFrom: Yup.date().notRequired(),
  leaveTo: Yup.date().notRequired(),
  leaveType: Yup.string().notRequired(),
  leaveStatus: Yup.string().notRequired(),
  note: Yup.string().notRequired()
});