import * as Yup from 'yup';

export const validationCreateAnnualWorkCalendar = Yup.object({
  name: Yup.string().required('This field is requred'),
  type: Yup.string().notRequired(),
  startDate: Yup.date().required('This field is required'),
  endDate: Yup.date().required('This field is required'),
  notes: Yup.string().notRequired()
});