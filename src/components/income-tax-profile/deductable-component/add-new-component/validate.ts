import * as Yup from 'yup';

export const validationSchemeItpBasicDetail = Yup.object({
  componentName: Yup.string().required('This field is Required!'),
  country: Yup.string().required('This field is Required!'),
});

export const validationSchemeItpDta = Yup.object({
  bank: Yup.string().required('This Field is Required'),
  holder: Yup.string().required('This Field is Required'),
  no: Yup.string().required('This Field is Required'),
});

export const validationSchemeItpRates = Yup.object({
  deductableCondition: Yup.string().required('This Field is Required'),
  amount: Yup.string().required('This Field is Required'),
  factorUnit: Yup.string().required('This Field is Required'),
  subCondition: Yup.string().required('This Field is Required'),
});