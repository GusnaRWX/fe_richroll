import * as Yup from 'yup';

export const validationSchemaWorkScheduler = Yup.object({
  profileName: Yup.string().required('This field is required'),
  type: Yup.string(),
  flexiWorkHour: Yup.string().typeError('This field is required').when('type', {is: '1', then: (schema) => schema.required('This field is required')}),
  flexiWorkDay: Yup.string().typeError('This field is required').when('type', { is: '1', then: (schema) => schema.required('This field is required')}),
  fixedStartTime: Yup.string().typeError('This field is required').when('type', {is: '0', then: (schema) => schema.required('This field is required')}),
  fixedEndTime: Yup.string().typeError('This field is required').when('type', {is: '0', then: (schema) => schema.required('This field is required')}),
  fixedWorkDayType: Yup.string().typeError('This field is required').when('type', {is: '0', then: (schema) => schema.required('This field is required')}),
});