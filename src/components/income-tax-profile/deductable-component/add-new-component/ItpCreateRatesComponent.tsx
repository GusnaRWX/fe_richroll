import React from 'react';
import { Form, Input, Select } from '@/components/_shared/form';
import { Text } from '@/components/_shared/common';
import {
  Box,
  FormGroup,
  FormControlLabel,
  Grid,
  InputAdornment,
  Typography,
  styled,
  Switch,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const condition = [
  {
    label: 'Martial Status',
    value: 'martial-status',
  },
];

const listMenuItem = [
  {
    label: '=',
    value: '='
  },
  {
    label: '≥',
    value: '≥'
  },
  {
    label: '≤',
    value: '≤'
  },
  {
    label: '≠',
    value: '≠'
  },
];

export default function ItpCreateRatesComponent() {
  const {t} = useTranslation();
  const [deductableType, setDeductableType] = React.useState(true);
  const tPath = 'income_tax_profile.deductable_component.add_new_component.form.rates.';

  const initialValues = {
    deductableCondition: '',
    condition1: {
      condition: '',
      name: '',
      amount: ''
    },
    condition2: {
      condition: '',
      name: '',
      amount: ''
    },
    condition3: {
      condition: '',
      name: '',
    },
    subCondition1: {
      condition: '',
      name: '',
      amount: ''
    },
    subCondition2: {
      condition: '',
      name: '',
      amount: ''
    },
  };

  const validationSchema = Yup.object({
    // employeeData: Yup.object({
    //   start: Yup.string().required('This Field is Required'),
    //   end: Yup.string().required('This Field is Required'),
    //   rate: Yup.string().required('This Field is Required'),
    //   fixed: Yup.string().required('This Field is Required'),
    //   amountCap: Yup.string().required('This Field is Required'),
    // }),
    // employerData: Yup.object({
    //   start: Yup.string().required('This Field is Required'),
    //   end: Yup.string().required('This Field is Required'),
    //   rate: Yup.string().required('This Field is Required'),
    //   fixed: Yup.string().required('This Field is Required'),
    //   amountCap: Yup.string().required('This Field is Required'),
    // })
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => handleSubmit(values),
    validationSchema : validationSchema
  });

  const AsteriskComponent = styled('span')(({ theme }) => ({
    color: theme.palette.error.main,
  }));

  return (
    <>
      <Box component='div' sx={{ p: '16px' }}>
        <Grid container flexDirection='column' gap={4}>
          <Grid item>
            <FormGroup>
              <Text
                title={t(`${tPath}select_type`)}
                color='grey.700'
                fontWeight='400'
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={deductableType}
                    onChange={(e) => setDeductableType(e.target.checked)}
                  />}
                label={
                  <Text
                    title='Auto'
                    color='primary.600'
                    fontWeight='700'
                  />
                }
              />
            </FormGroup>
          </Grid>
          {deductableType && (
            <Grid item>
              <Select
                customLabel={t(`${tPath}dc_condition`)}
                withAsterisk
                size='small'
                options={condition}
                value={formik.values.deductableCondition}
                onChange={(e) => formik.setFieldValue('deductableCondition', e.target.value)}
              />
            </Grid>
          )}
          <Grid item>
            {deductableType && (
              <Form p={2} display='flex' flexDirection='column' gap='24px' sx={{backgroundColor: 'grey.50'}}>
                <Grid container flexDirection='row'>
                  <Grid item xs={12} md={6}>
                    <Typography mb='6px'>{t(`${tPath}fu_condition`)} 1 <AsteriskComponent>*</AsteriskComponent></Typography>
                    <Grid item container flexDirection='row' gap={1.5}>
                      <Grid item xs={1.5}>
                        <Select
                          size='small'
                          options={listMenuItem}
                          value={formik.values.condition1.condition}
                          onChange={(e) => formik.setFieldValue('condition1.condition', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Input
                          size='small'
                          value={formik.values.condition1.name}
                          onChange={(e) => formik.setFieldValue('condition1.name', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      size='small'
                      customLabel={t(`${tPath}amount`)}
                      withAsterisk
                      value={formik.values.condition1.amount}
                      onChange={(e) => formik.setFieldValue('condition1.amount', e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection='row'>
                  <Grid item xs={12} md={6}>
                    <Typography mb='6px'>{t(`${tPath}fu_condition`)} 2 <AsteriskComponent>*</AsteriskComponent></Typography>
                    <Grid item container flexDirection='row' gap={1.5}>
                      <Grid item xs={1.5}>
                        <Select
                          size='small'
                          options={listMenuItem}
                          value={formik.values.condition2.condition}
                          onChange={(e) => formik.setFieldValue('condition2.condition', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Input
                          size='small'
                          value={formik.values.condition2.name}
                          onChange={(e) => formik.setFieldValue('condition2.name', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      size='small'
                      customLabel={t(`${tPath}amount`)}
                      withAsterisk
                      value={formik.values.condition2.amount}
                      onChange={(e) => formik.setFieldValue('condition2.amount', e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection='row'>
                  <Grid item xs={12} md={6}>
                    <Typography mb='6px'>{t(`${tPath}fu_condition`)} 3 <AsteriskComponent>*</AsteriskComponent></Typography>
                    <Grid item container flexDirection='row' gap={1.5}>
                      <Grid item xs={1.5}>
                        <Select
                          size='small'
                          options={listMenuItem}
                          value={formik.values.condition3.condition}
                          onChange={(e) => formik.setFieldValue('condition3.condition', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Input
                          size='small'
                          value={formik.values.condition3.name}
                          onChange={(e) => formik.setFieldValue('condition3.name', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={0} md={6} />
                </Grid>
                <Grid container flexDirection='row'>
                  <Grid pl={8.5} item xs={12} md={6}>
                    <Typography mb='6px'>{t(`${tPath}sub_condition`)} 1 <AsteriskComponent>*</AsteriskComponent></Typography>
                    <Grid item container flexDirection='row' gap={1.5}>
                      <Grid item xs={1.5}>
                        <Select
                          size='small'
                          options={listMenuItem}
                          value={formik.values.subCondition1.condition}
                          onChange={(e) => formik.setFieldValue('subCondition1.condition', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={8.8}>
                        <Input
                          size='small'
                          value={formik.values.subCondition1.name}
                          onChange={(e) => formik.setFieldValue('subCondition1.name', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      size='small'
                      customLabel={t(`${tPath}amount`)}
                      withAsterisk
                      value={formik.values.subCondition1.amount}
                      onChange={(e) => formik.setFieldValue('subCondition1.amount', e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection='row'>
                  <Grid pl={8.5} item xs={12} md={6}>
                    <Typography mb='6px'>{t(`${tPath}sub_condition`)} 2 <AsteriskComponent>*</AsteriskComponent></Typography>
                    <Grid item container flexDirection='row' gap={1.5}>
                      <Grid item xs={1.5}>
                        <Select
                          size='small'
                          options={listMenuItem}
                          value={formik.values.subCondition2.condition}
                          onChange={(e) => formik.setFieldValue('subCondition2.condition', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={8.8}>
                        <Input
                          size='small'
                          value={formik.values.subCondition2.name}
                          onChange={(e) => formik.setFieldValue('subCondition2.name', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      size='small'
                      customLabel={t(`${tPath}amount`)}
                      withAsterisk
                      value={formik.values.subCondition2.amount}
                      onChange={(e) => formik.setFieldValue('subCondition2.amount', e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
            {!deductableType && (
              <>
                <Grid container flexDirection='row' gap={3}>
                  <Grid item xs={12} md={5.5}>
                    <Input
                      size='small'
                      customLabel={t(`${tPath}dc_condition`)}
                      withAsterisk
                      value={formik.values.condition1.amount}
                      onChange={(e) => formik.setFieldValue('condition1.amount', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={5.5}>
                    <Input
                      size='small'
                      customLabel={t(`${tPath}amount`)}
                      withAsterisk
                      value={formik.values.condition1.amount}
                      onChange={(e) => formik.setFieldValue('condition1.amount', e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
