import * as Yup from 'yup';

export const validationSchemaWorkScheduler = Yup.object({
  type: Yup.string(),
  flexiWorkHour: Yup.string().typeError('This field is required').when('type', {is: 'flexi', then: (schema) => schema.required('This field is required')}),
  flexiWorkDay: Yup.string().typeError('This field is required').when('type', { is: 'flexi', then: (schema) => schema.required('This field is required')}),
  fixedStartDay: Yup.string().typeError('This field is required').when('type', {is: 'fixed', then: (schema) => schema.required('This field is required')}),
  fixedEndDay: Yup.string().typeError('This field is required').when('type', {is: 'fixed', then: (schema) => schema.required('This field is required')}),
  fixedStartTime: Yup.string().typeError('This field is required').when('type', {is: 'fixed', then: (schema) => schema.required('This field is required')}),
  fixedEndTime: Yup.string().typeError('This field is required').when('type', {is: 'fixed', then: (schema) => schema.required('This field is required')}),
  fixedWorkDayType: Yup.string().typeError('This field is required').when('type', {is: 'fixed', then: (schema) => schema.required('This field is required')}),
});