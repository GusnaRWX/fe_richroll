import React from 'react';
import { IconButton, Input, Select } from '@/components/_shared/form';
import { Text, Card } from '@/components/_shared/common';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  InputAdornment,
  Button,
  Box,
  Typography,
  styled,
  Switch,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

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

export default function CreateRates() {
  // Translation Key
  const {t} = useTranslation();
  const t_key = 'satutory_benefit.component.form_&_detail.rates';

  const initialValues = {
    employee: true,
    employer: false,
    employerMatch: true,
    employeeData: {
      start: 0,
      end: 0,
      rate: '',
      fixed: 0,
      amountCap: 0,
    },
    employerData: {
      start: 0,
      end: 0,
      rate: '',
      fixed: 0,
      amountCap: 0,
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

  const handleSubmit = (values) => {
    let payload = {};
    if (values.employerMatch && values.employer && values.employee) {
      payload= {
        employee: values.employeeData,
        employer: values.employeeData,
      };
    } else if (values.employee && values.employer) {
      payload = {
        employee: values.employeeData,
        employer: values.employerData,
      };
    } else if (values.employee) {
      payload = {
        employee: values.employeeData,
      };
    } else if (values.employer) {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      payload = {
        employer: values.employerData,
      };
    }
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
        <Typography sx={{color: 'grey.700', fontWeight: 400, display: 'block', marginBottom: '15px'}}>{t(`${t_key}.contributor_option.label`)}<AsteriskComponent>*</AsteriskComponent></Typography>
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
                        formik.setFieldValue('employerData.start', formik.values.employerMatch ? e.target.value : null);
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
                        formik.setFieldValue('employerData.end', formik.values.employerMatch ? e.target.value : null);
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
                      onChange={(e) =>
                        formik.setFieldValue('employeeData.rate', e.target.value)
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
                      value={formik.values.employerData.rate}
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
                      value={formik.values.employerData.fixed}
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
            sx={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)', color: '#374151' }}
          >
            {t(`button.back`)}
          </Button>
          <Button
            sx={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)' }}
            variant='contained'
            onClick={() => formik.submitForm()}
          >
            {t(`button.save`)}
          </Button>
        </Grid>
      </Box>
    </>
  );
}
