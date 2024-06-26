import React from 'react';
import { Grid } from '@mui/material';
import { FieldArray, Formik } from 'formik';
import { Input, Button, IconButton, Select } from '@/components/_shared/form';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface RateValue {
  component: {
    minIncome: string
    maxIncome: string
    rate: string
    additionalAmount: string
  }[]
}

interface RateProp {
  rateValue: RateValue
  setValue: React.Dispatch<React.SetStateAction<RateValue>>
  nextStep: React.Dispatch<React.SetStateAction<number>>
}

export default function ItpCreateTaxRate({rateValue, setValue, nextStep}: RateProp) {
  const {t} = useTranslation();
  const t_key = 'income_tax_profile.profile.detail.income_tax_rate';

  const initialValues = {
    component: rateValue?.component
  };

  const validationSchema = Yup.object({
    component: Yup.array().of(
      Yup.object({
        minIncome: Yup.string().required('This Field is Required'),
        maxIncome: Yup.string().required('This Field is Required'),
        rate: Yup.string().required('This Field is Required'),
        additionalAmount: Yup.string(),
      })
    )
  });

  const onSubmit = (values) => {
    setValue(values);
    nextStep(3);
  };

  const option = [
    {label: '5,0', value: '5'},
    {label: '6,0', value: '6'},
    {label: '7,0', value: '7'},
  ];

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formik) => (
          <form>
            <FieldArray name='component' render={(arrayHelpers) => (
              <>
                {formik?.values?.component?.map((_, index) => (
                  <>
                    <Grid
                      key={index}
                      container
                      border='1px #E5E7EB'
                      boxShadow='0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)'
                      direction='row'
                      p='0 15px 30px'
                    >
                      <Grid
                        item
                        container
                        alignItems='flex-end'
                        spacing={1}
                        marginTop={0}
                        marginLeft={0}
                        xs={12}
                        md={7}
                      >
                        <Grid item xs={1}>
                          <IconButton
                            icons={
                              <RemoveIcon
                                sx={{
                                  color: index !== 0 ? '#B91C1C' : '#9CA3AF',
                                  bgcolor: index !== 0 ? '#FEE2E2' : '#F3F4F6',
                                  borderRadius: '5px',
                                  width: '32px',
                                  height: '32px',
                                  padding: '8px',
                                }}
                              />
                            }
                            size='small'
                            onClick={() => arrayHelpers.remove(index)}
                            disabled={index === 0}
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Input
                            customLabel={t(`${t_key}.min_income`)}
                            withAsterisk
                            size='small'
                            value={formik.values.component[index].minIncome}
                            onChange={(e) => formik.setFieldValue(`component.${index}.minIncome`, e.target.value)}
                            // {...(formik.touched.component && formik.errors.component && {
                            //   error: formik.touched.component[index].minIncome && Boolean((formik.errors.component[index] as unknown as InitialValues).minIncome),
                            //   helperText: formik.touched.component[index].minIncome && (formik.errors.component[index] as unknown as InitialValues).minIncome
                            // })}
                          />
                        </Grid>
                        <Grid item mb={0.5} xs={0.3}>
                        -
                        </Grid>
                        <Grid item md={4}>
                          <Input
                            customLabel={t(`${t_key}.max_income`)}
                            withAsterisk
                            size='small'
                            value={formik.values.component[index].maxIncome}
                            onChange={(e) => formik.setFieldValue(`component.${index}.maxIncome`, e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            icons={
                              <AddIcon
                                sx={{
                                  color: 'white',
                                  bgcolor: '#8DD0B8',
                                  borderRadius: '5px',
                                  width: '32px',
                                  height: '32px',
                                  padding: '8px',
                                }}
                              />
                            }
                            size='small'
                            onClick={() => arrayHelpers.insert(index + 1, {
                              minIncome: '',
                              maxIncome: '',
                              rate: '',
                              additionalAmount: ''
                            })}
                          />
                        </Grid>
                      </Grid>
                      <Grid item container xs={12} md={4.5} alignItems='flex-end' spacing={1}>
                        <Grid item xs={12} md={5}>
                          <Select
                            customLabel={t(`${t_key}.rate`)}
                            withAsterisk
                            fullWidth
                            size='small'
                            options={option}
                            value={formik.values.component[index].rate}
                            onChange={(e) => formik.setFieldValue(`component.${index}.rate`, e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={7}>
                          <Input
                            customLabel={t(`${t_key}.additional_fixed_amount`)}
                            size='small'
                            value={formik.values.component[index].additionalAmount}
                            onChange={(e) => formik.setFieldValue(`component.${index}.additionalAmount`, e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ))}
              </>
            )} />
            <Grid container direction='row-reverse' spacing={2} p={2} alignItems='center'>
              <Grid item>
                <Button label={t('button.next')} onClick={() => formik.submitForm()} />
              </Grid>
              <Grid item>
                <Button
                  label={t('button.back')}
                  variant='outlined'
                  onClick={() => {
                    formik.submitForm();
                    nextStep(1);
                  }}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
