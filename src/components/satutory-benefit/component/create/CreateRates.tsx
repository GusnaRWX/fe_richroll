import React, { SetStateAction, Dispatch } from 'react';
import { IconButton, Input, Select, Button } from '@/components/_shared/form';
import { Text, Card } from '@/components/_shared/common';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  InputAdornment,
  Box,
  Typography,
  styled,
  Switch,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const rates = [
  {
    label: '6,0',
    value: '6',
  },
  {
    label: '7,0',
    value: '7',
  },
  {
    label: '8,0',
    value: '8',
  },
  {
    label: '9,0',
    value: '9',
  },
  {
    label: '10,0',
    value: '10',
  },
];

interface RatesValue {
  employee: boolean,
  employer: boolean,
  employerMatch: boolean,
  employeeData: {
    start: number,
    end: number,
    rate: string,
    fixed: number,
    amountCap: number,
  },
  employerData: {
    start: number,
    end: number,
    rate: string,
    fixed: number,
    amountCap: number,
  },
}

interface PropsInterface {
  nextPage: Dispatch<SetStateAction<number>>;
  ratesValue: RatesValue;
  setValue: Dispatch<SetStateAction<RatesValue>>;
}

export default function CreateRates({ratesValue, setValue, nextPage}: PropsInterface) {
  // Translation Key
  const {t} = useTranslation();
  const t_key = 'satutory_benefit.component.form_&_detail.rates';

  const initialValues = {
    employee: ratesValue.employee,
    employer: ratesValue.employer,
    employerMatch: ratesValue.employerMatch,
    employeeData: {
      start: ratesValue.employeeData.start,
      end: ratesValue.employeeData.end,
      rate: ratesValue.employeeData.rate,
      fixed: ratesValue.employeeData.fixed,
      amountCap: ratesValue.employeeData.amountCap,
    },
    employerData: {
      start: ratesValue.employerData.start,
      end: ratesValue.employerData.end,
      rate: ratesValue.employerData.rate,
      fixed: ratesValue.employerData.fixed,
      amountCap: ratesValue.employerData.amountCap,
    },
  };

  const validationSchema = Yup.object({
    employeeData: Yup.object({
      start: Yup.string().required('This Field is Required'),
      end: Yup.string().required('This Field is Required'),
      rate: Yup.string().required('This Field is Required'),
      fixed: Yup.string().required('This Field is Required'),
      amountCap: Yup.string().required('This Field is Required'),
    }),
    employerData: Yup.object({
      start: Yup.string().required('This Field is Required'),
      end: Yup.string().required('This Field is Required'),
      rate: Yup.string().required('This Field is Required'),
      fixed: Yup.string().required('This Field is Required'),
      amountCap: Yup.string().required('This Field is Required'),
    })
  });

  const handleSubmit = (values: RatesValue) => {
    setValue(values);
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
      <>
        <Typography sx={{color: 'grey.700', fontWeight: 400, display: 'block', marginBottom: '15px'}}>
          {t(`${t_key}.contributor_option.label`)}<AsteriskComponent>*</AsteriskComponent>
        </Typography>
        <FormGroup sx={{ display: 'inline', bgcolor: 'red' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.employee}
                onChange={(e) =>
                  formik.setFieldValue('employee', e.target.checked)
                }
              />
            }
            label={t(`${t_key}.contributor_option.employee`)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.employer}
                onChange={(e) =>
                  formik.setFieldValue('employer', e.target.checked)
                }
              />
            }
            label={t(`${t_key}.contributor_option.employer`)}
            sx={{ ml: '50px' }}
          />
          {formik.values.employee && formik.values.employer && (
            <Box margin='32px 0'>
              <FormControlLabel
                label={t(`${t_key}.match_rule_button`)}
                control={
                  <Switch
                    value={formik.values.employerMatch}
                    onChange={(e) =>
                      formik.setFieldValue('employerMatch', e.target.checked)
                    }
                  />
                }
              />
            </Box>
          )}
        </FormGroup>

        {!formik.values.employee || !formik.values.employer ? (
          <Typography sx={{color: '#223567', fontWeight: 700, marginTop: '36px', marginBottom: '30px'}}>{t(`${t_key}.sub_title`)}</Typography>
        ) : null}

        <Box display='flex' flexDirection='column' gap='32px'>
          {formik.values.employee && (
            <Card
              sx={{
                paddingY: '20px',
                '.MuiCardContent-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap:
                  formik.values.employee && formik.values.employer
                    ? '16px'
                    : '24px',
                },
              }}
            >
              {formik.values.employee && formik.values.employer && (
                <>
                  <Typography color='#223567' fontWeight='700' fontSize={18}>
                    {t(`${t_key}.contributor_option.employee`)}<AsteriskComponent>*</AsteriskComponent>
                  </Typography>
                  <Typography color='#223567' fontWeight='700'>
                    {t(`${t_key}.sub_title`)}<AsteriskComponent>*</AsteriskComponent>
                  </Typography>
                </>
              )}

              <Box component='div' sx={{width: '100%', display: 'flex', gap: '15px'}}>
                <Box component='div' sx={{width: '75%', display: 'flex', alignItems: 'flex-end', gap: '5px'}}>
                  <IconButton
                    icons={
                      <RemoveIcon
                        sx={{
                          color: '#B91C1C',
                          bgcolor: '#FEE2E2',
                          borderRadius: '5px',
                          width: '32px',
                          height: '32px',
                          padding: '8px',
                        }}
                      />
                    }
                    onClick={() =>
                      formik.setFieldValue(
                        'employeeData.start',
                        formik.values.employeeData.start - 1
                      )
                    }
                  />
                  <Box component='div'  sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.start`)}
                      size='small'
                      value={formik.values.employeeData.start}
                      onChange={(e) => {
                        formik.setFieldValue(
                          'employeeData.start',
                          e.target.value
                        );
                        if (formik.values.employerMatch && formik.values.employer) {
                          formik.setFieldValue(
                            'employerData.start',
                            e.target.value
                          );
                        }
                      }}
                    />
                  </Box>

                  <Text title='-' color='#223567' fontWeight='700' mb='8px' />

                  <Box component='div' sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.end`)}
                      size='small'
                      value={formik.values.employeeData.end}
                      onChange={(e) => {
                        formik.setFieldValue('employeeData.end', e.target.value);
                        if (formik.values.employerMatch && formik.values.employer) {
                          formik.setFieldValue(
                            'employerData.end',
                            e.target.value
                          );
                        }
                      }}
                    />
                  </Box>
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
                    onClick={() =>
                      formik.setFieldValue(
                        'employeeData.end',
                        formik.values.employeeData.end + 1
                      )
                    }
                  />
                </Box>

                <Box component='div' sx={{width: '25%', display: 'flex', alignItems: 'flex-end'}}>
                  <Box component='div' sx={{width: '100px'}}>
                    <Select
                      displayEmpty
                      value={formik.values.employeeData.rate}
                      onChange={(e) => {
                        formik.setFieldValue('employeeData.rate', e.target.value);
                        if (formik.values.employerMatch && !formik.values.employer) {
                          formik.setFieldValue('employerData.rate', e.target.value);
                        }
                      }}
                      size='small'
                      customLabel={t(`${t_key}.sub_title`)}
                      withAsterisk
                      endAdornment={
                        <InputAdornment position='end' sx={{ mr: '20px' }}>
                        %
                        </InputAdornment>
                      }
                      options={rates}
                    />
                  </Box>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box component='div' sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.additional_fixed_amount`)}
                      placeholder='Rp 0'
                      size='small'
                      value={formik.values.employeeData.fixed}
                      onChange={(e) =>
                        formik.setFieldValue('employeeData.fixed', e.target.value)
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>IDR</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box component='div'>
                    <Input
                      customLabel={t(`${t_key}.amount_cap`)}
                      placeholder='Rp 0'
                      size='small'
                      value={formik.values.employeeData.amountCap}
                      disabled={formik.values.employerMatch}
                      onChange={(e) =>
                        formik.setFieldValue(
                          'employerData.amountCap',
                          e.target.value
                        )
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>IDR</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          )}

          {formik.values.employer && (
            <Card
              sx={{
                paddingY: '20px',
                '.MuiCardContent-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                },
              }}
            >
              {formik.values.employee && formik.values.employer && (
                <>
                  <Typography color='#223567' fontWeight='700' fontSize={18}>
                    {t(`${t_key}.contributor_option.employer`)}<AsteriskComponent>*</AsteriskComponent>
                  </Typography>
                  <Typography color='#223567' fontWeight='700'>
                    {t(`${t_key}.sub_title`)}<AsteriskComponent>*</AsteriskComponent>
                  </Typography>
                </>
              )}

              <Box component='div' sx={{width: '100%', display: 'flex', gap: '15px'}}>
                <Box component='div' sx={{width: '75%', display: 'flex', alignItems: 'flex-end', gap: '5px'}}>
                  <IconButton
                    icons={
                      <RemoveIcon
                        sx={{
                          color: '#B91C1C',
                          bgcolor: '#FEE2E2',
                          borderRadius: '5px',
                          width: '32px',
                          height: '32px',
                          padding: '8px',
                        }}
                      />
                    }
                    onClick={() =>
                      formik.setFieldValue(
                        'employerData.start',
                        formik.values.employerData.start - 1
                      )
                    }
                  />
                  <Box component='div'  sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.start`)}
                      size='small'
                      value={formik.values.employerData.start}
                      onChange={(e) =>
                        formik.setFieldValue(
                          'employerData.start',
                          e.target.value
                        )
                      }
                    />
                  </Box>

                  <Text title='-' color='#223567' fontWeight='700' mb='8px' />

                  <Box component='div' sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.end`)}
                      size='small'
                      value={formik.values.employerData.end}
                      onChange={(e) =>
                        formik.setFieldValue('employerData.end', e.target.value)
                      }
                    />
                  </Box>
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
                    onClick={() =>
                      formik.setFieldValue(
                        'employerData.end',
                        formik.values.employerData.end + 1
                      )
                    }
                  />
                </Box>

                <Box component='div' sx={{width: '25%', display: 'flex', alignItems: 'flex-end'}}>
                  <Box component='div' sx={{width: '100px'}}>
                    <Select
                      displayEmpty
                      value={formik.values.employerMatch ? formik.values.employeeData.rate : formik.values.employerData.rate}
                      onChange={(e) =>
                        formik.setFieldValue('employerData.rate', e.target.value)
                      }
                      size='small'
                      customLabel={t(`${t_key}.sub_title`)}
                      withAsterisk
                      endAdornment={
                        <InputAdornment position='end' sx={{ mr: '20px' }}>
                        %
                        </InputAdornment>
                      }
                      options={rates}
                    />
                  </Box>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box component='div' sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.additional_fixed_amount`)}
                      placeholder='Rp 0'
                      size='small'
                      value={formik.values.employerMatch ? formik.values.employeeData.fixed : formik.values.employerData.fixed}
                      onChange={(e) =>
                        formik.setFieldValue('employerData.fixed', e.target.value)
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>IDR</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box component='div'>
                    <Input
                      customLabel={t(`${t_key}.amount_cap`)}
                      placeholder='Rp 0'
                      size='small'
                      value={
                        formik.values.employerMatch
                          ? formik.values.employeeData.amountCap
                          : formik.values.employerData.amountCap
                      }
                      disabled={formik.values.employerMatch}
                      onChange={(e) =>
                        formik.setFieldValue(
                          'employerData.amountCap',
                          e.target.value
                        )
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>IDR</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          )}
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'flex-end', mt: '30px', gap: '15px' }}
        >
          <Button
            fullWidth={false}
            size='small'
            label={t('button.back')}
            variant='outlined'
            color='primary'
            onClick={() => nextPage(1)}
          />
          <button onClick={() => formik.submitForm()}>test</button>
        </Grid>
      </>
    </>
  );
}
