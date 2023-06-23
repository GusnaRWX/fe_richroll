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
      <Text
        title='Contributor'
        mb='8px'
        color='grey.700'
        fontWeight='400'
        sx={{ display: 'block' }}
      />
      <FormGroup sx={{ display: 'inline', bgcolor: 'red' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.employee}
              onChange={(e) => {
                formik.setFieldValue('employee', e.target.checked);
                formik.setFieldValue('employerMatch', !e.target.checked);
              }}
            />
          }
          label='Employee'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.employer}
              onChange={(e) => {
                formik.setFieldValue('employer', e.target.checked);
                formik.setFieldValue('employerMatch', !e.target.checked);
              }}
            />
          }
          label='Employer'
          sx={{ ml: '50px' }}
        />
        {formik.values.employee && formik.values.employer && (
          <Box margin='32px 0'>
            <FormControlLabel
              label='Employer Match Rule'
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
        <Text
          title='Rates'
          mt='40px'
          mb='30px'
          color='#223567'
          fontWeight='700'
          sx={{ display: 'block' }}
        />
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
                  Employee<AsteriskComponent>*</AsteriskComponent>
                </Typography>
                <Typography color='#223567' fontWeight='700'>
                  Rates<AsteriskComponent>*</AsteriskComponent>
                </Typography>
              </>
            )}
            <Box
              display='flex'
              alignItems='flex-start'
              gap='32px'
              sx={{
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
              }}
            >
              <Box
                display='flex'
                flexDirection='row'
                alignItems='flex-end'
                gap='16px'
                width='60%'
                sx={{
                  width: {
                    xs: '100%',
                    md: '60%',
                  },
                }}
              >
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='flex-end'
                  gap='16px'
                  sx={{
                    width: {
                      xs: '50%',
                    },
                  }}
                >
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
                  <Box width='100%'>
                    <Input
                      withAsterisk
                      customLabel='Start'
                      size='small'
                      fullWidth
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
                </Box>
                <Text title='-' color='#223567' fontWeight='700' mb='8px' />
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='flex-end'
                  gap='16px'
                  sx={{
                    width: {
                      xs: '50%',
                    },
                  }}
                >
                  <Box width='100%'>
                    <Input
                      withAsterisk
                      customLabel='End'
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
              </Box>
              <Box
                display='flex'
                flexDirection='row'
                alignItems='flex-end'
                gap='12px'
                sx={{
                  width: {
                    xs: '100%',
                    md: '40%',
                  },
                }}
              >
                <Box width='33%'>
                  <Select
                    displayEmpty
                    value={formik.values.employeeData.rate}
                    onChange={(e) => {
                      formik.setFieldValue('employeeData.rate', e.target.value);
                      formik.setFieldValue('employerData.rate', formik.values.employerMatch ? e.target.value : null);
                    }}
                    size='small'
                    customLabel='Rate'
                    withAsterisk
                    endAdornment={
                      <InputAdornment position='end' sx={{ mr: '20px' }}>
                        %
                      </InputAdornment>
                    }
                    options={rates}
                  />
                </Box>
                <Box width='66%'>
                  <Input
                    withAsterisk
                    placeholder='Rp 0'
                    customLabel='Additional Fixed Amount'
                    size='small'
                    value={formik.values.employeeData.fixed}
                    onChange={(e) => {
                      formik.setFieldValue('employeeData.fixed', e.target.value);
                      formik.setFieldValue('employerData.fixed', formik.values.employerMatch ? e.target.value : null);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>IDR</InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              width='100%'
              display='flex'
              flexDirection='row-reverse'
              alignItems='flex-end'
            >
              <Box width='38.5%'>
                <Input
                  customLabel='Amount Cap'
                  placeholder='Rp 0'
                  size='small'
                  value={formik.values.employeeData.amountCap}
                  onChange={(e) => {
                    formik.setFieldValue(
                      'employeeData.amountCap',
                      e.target.value
                    );
                    formik.setFieldValue('employerData.amountCap', formik.values.employerMatch ? e.target.value : null);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>IDR</InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
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
                  Employer<AsteriskComponent>*</AsteriskComponent>
                </Typography>
                <Typography color='#223567' fontWeight='700'>
                  Rates<AsteriskComponent>*</AsteriskComponent>
                </Typography>
              </>
            )}
            <Box
              display='flex'
              alignItems='flex-start'
              gap='32px'
              sx={{
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
              }}
            >
              <Box
                display='flex'
                flexDirection='row'
                alignItems='flex-end'
                gap='16px'
                width='60%'
                sx={{
                  width: {
                    xs: '100%',
                    md: '60%',
                  },
                }}
              >
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='flex-end'
                  gap='16px'
                  sx={{
                    width: {
                      xs: '50%',
                    },
                  }}
                >
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
                  <Box width='100%'>
                    <Input
                      withAsterisk
                      customLabel='Start'
                      size='small'
                      disabled={formik.values.employerMatch && formik.values.employee}
                      fullWidth
                      value={
                        formik.values.employerMatch && formik.values.employee
                          ? formik.values.employeeData.start
                          : formik.values.employerData.start
                      }
                      onChange={(e) =>
                        formik.setFieldValue(
                          'employerData.start',
                          e.target.value
                        )
                      }
                    />
                  </Box>
                </Box>
                <Text title='-' color='#223567' fontWeight='700' mb='8px' />
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='flex-end'
                  gap='16px'
                  sx={{
                    width: {
                      xs: '50%',
                    },
                  }}
                >
                  <Box width='100%'>
                    <Input
                      withAsterisk
                      customLabel='End'
                      size='small'
                      value={
                        formik.values.employerMatch
                          ? formik.values.employeeData.end
                          : formik.values.employerData.end
                      }
                      disabled={formik.values.employerMatch && formik.values.employee}
                      onChange={(e) =>
                        formik.setFieldValue('employerData.end', e.target.value)
                      }
                    />
                  </Box>
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
                </Box>
              </Box>
              <Box
                display='flex'
                flexDirection='row'
                alignItems='flex-end'
                gap='12px'
                sx={{
                  width: {
                    xs: '100%',
                    md: '40%',
                  },
                }}
              >
                <Box width='33%'>
                  <Select
                    displayEmpty
                    disabled={formik.values.employerMatch && formik.values.employee}
                    value={
                      formik.values.employerMatch
                        ? formik.values.employeeData.rate
                        : formik.values.employerData.rate
                    }
                    onChange={(e) =>
                      formik.setFieldValue('employerData.rate', e.target.value)
                    }
                    size='small'
                    customLabel='Rate'
                    withAsterisk
                    endAdornment={
                      <InputAdornment position='end' sx={{ mr: '20px' }}>
                        %
                      </InputAdornment>
                    }
                    options={rates}
                  />
                </Box>
                <Box width='66%'>
                  <Input
                    withAsterisk
                    placeholder='Rp 0'
                    customLabel='Additional Fixed Amount'
                    size='small'
                    value={
                      formik.values.employerMatch
                        ? formik.values.employeeData.fixed
                        : formik.values.employerData.fixed
                    }
                    disabled={formik.values.employerMatch && formik.values.employee}
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
              </Box>
            </Box>
            <Box
              width='100%'
              display='flex'
              flexDirection='row-reverse'
              alignItems='flex-end'
            >
              <Box width='38.5%'>
                <Input
                  customLabel='Amount Cap'
                  placeholder='Rp 0'
                  size='small'
                  value={
                    formik.values.employerMatch
                      ? formik.values.employeeData.amountCap
                      : formik.values.employerData.amountCap
                  }
                  disabled={formik.values.employerMatch && formik.values.employee}
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
            </Box>
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
