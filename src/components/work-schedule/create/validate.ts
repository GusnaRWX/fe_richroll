import * as Yup from 'yup';

export const validationSchemaWorkScheduler = Yup.object({
  profileName: Yup.string().required('This field is required'),
  dayType: Yup.string().typeError('This field is required').when('type', {is: 0, then: (schema) => schema.required('This field is required')}),
  day: Yup.string().required('This field is required'),
  startHour: Yup.string().typeError('This field is required').when('type', {is: 0, then: (schema) => schema.required('This field is required')}),
  endHour: Yup.string().typeError('This field is required').when('type', {is: 0, then: (schema) => schema.required('This field is required')}),
  flexiWorkHour: Yup.string().typeError('This field is required').when('type', {is: 1, then: (schema) => schema.required('This field is required')}),
});