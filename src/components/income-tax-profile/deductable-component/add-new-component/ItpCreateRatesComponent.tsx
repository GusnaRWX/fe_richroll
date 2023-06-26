import React from 'react';
import { Form, Input, Select } from '@/components/_shared/form';
import { Text } from '@/components/_shared/common';
import {
  FormGroup,
  FormControlLabel,
  Grid,
  InputAdornment,
  Button,
  Typography,
  styled,
  Switch,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
  const [deductableType, setDeductableType] = React.useState(true);

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
      <Grid container flexDirection='column' gap={4}>
        <Grid item>
          <FormGroup>
            <Text
              title='Select Deductible Type'
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
              customLabel='Deductible Component Condition'
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
                  <Typography mb='6px'>Factor Unit Condition 1 <AsteriskComponent>*</AsteriskComponent></Typography>
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
                    customLabel='Amount'
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
                  <Typography mb='6px'>Factor Unit Condition 2 <AsteriskComponent>*</AsteriskComponent></Typography>
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
                    customLabel='Amount'
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
                  <Typography mb='6px'>Factor Unit Condition 3 <AsteriskComponent>*</AsteriskComponent></Typography>
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
                  <Typography mb='6px'>Sub Condition 1 <AsteriskComponent>*</AsteriskComponent></Typography>
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
                    customLabel='Amount'
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
                  <Typography mb='6px'>Sub Condition 2 <AsteriskComponent>*</AsteriskComponent></Typography>
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
                    customLabel='Amount'
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
                    customLabel='Deductible Component Condition'
                    withAsterisk
                    value={formik.values.condition1.amount}
                    onChange={(e) => formik.setFieldValue('condition1.amount', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={5.5}>
                  <Input
                    size='small'
                    customLabel='Amount'
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
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'flex-end', mt: '30px', gap: '15px' }}
      >
        <Button
          sx={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)', color: '#374151' }}
        >
          Back
        </Button>
        <Button
          sx={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)' }}
          variant='contained'
          onClick={() => formik.submitForm()}
        >
          Save
        </Button>
      </Grid>
    </>
  );
}
