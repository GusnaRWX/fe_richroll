import React from 'react';
import { Typography, Box, Grid, FormControl, Select, MenuItem } from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { useAppSelectors } from '@/hooks/index';
import { Alert, Text } from '@/components/_shared/common';
import CancelIcon from '@mui/icons-material/Cancel';
import { Employees } from '@/types/employees';
import { useFormik } from 'formik';
import { validationSchemeEmployeeEmergencyContact } from './validate';

const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

interface EmergencyProps {
  refProp: React.Ref<HTMLFormElement>
  nextPage: (_val: number) => void;
  setValues: React.Dispatch<React.SetStateAction<Employees.EmergencyContactValues>>;
  emergencyValues: Employees.EmergencyContactValues;
  setIsEmergencyValid: React.Dispatch<React.SetStateAction<boolean>>
}

function EmergencyContactForm({ refProp, nextPage, setValues, emergencyValues, setIsEmergencyValid }: EmergencyProps) {
  const { employeeID } = useAppSelectors((state) => state.employee);
  // const [errorFields, setErrorFields] = useState(false);

  const formik = useFormik({
    initialValues: {
      employeeID: employeeID,
      fullNamePrimary: emergencyValues?.fullNamePrimary,
      relationPrimary: emergencyValues?.relationPrimary,
      phoneNumberPrefixPrimary: emergencyValues?.phoneNumberPrefixPrimary,
      phoneNumberPrimary: emergencyValues?.phoneNumberPrimary,
      fullNameSecondary: emergencyValues?.fullNameSecondary,
      relationSecondary: emergencyValues?.relationSecondary,
      phoneNumberPrefixSecondary: emergencyValues?.phoneNumberPrefixSecondary,
      phoneNumberSecondary: emergencyValues?.phoneNumberSecondary
    },
    validationSchema: validationSchemeEmployeeEmergencyContact,
    onSubmit: (values, { setErrors }) => {
      setValues({ ...values });
      nextPage(3);
      setIsEmergencyValid(true);
      setErrors({});
    }
  });

  const handleBack = (e) => {
    e.preventDefault();
    if (formik.isValid) {
      setValues({ ...formik.values });
      nextPage(1);
      setIsEmergencyValid(true);
    } else {
      setIsEmergencyValid(false);
    }

  };

  return (
    <>
      {
        Object.keys(formik.errors).length > 0 && (
          <Alert
            severity='error'
            content='Please fill in all the mandatory fields'
            icon={<CancelIcon />}
          />
        )
      }
      <Box>
        <Text
          component='h3'
          variant='text-lg'
          fontWeight={700}
          color='primary.500'
          title='Emergency Contact'
          mb='16px'
        />
      </Box>
      <form ref={refProp} onSubmit={formik.handleSubmit}>
        <Box sx={{ marginBottom: '3rem', width: '100%' }}>
          <Typography component='h3' fontSize={18} color='primary'>Primary</Typography>
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='fullNamePrimary'
                customLabel='Full Name'
                withAsterisk={true}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size='small'
                value={formik.values.fullNamePrimary}
                placeholder='Input Full Name'
                error={formik.touched.fullNamePrimary && Boolean(formik.errors.fullNamePrimary)}
                helperText={formik.touched.fullNamePrimary && formik.errors.fullNamePrimary}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <Typography mb='6px'>Relationship</Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.relationPrimary}
                  name='relationPrimary'
                >
                  <MenuItem value='1'>Parent</MenuItem>
                  <MenuItem value='2'>Sibling</MenuItem>
                  <MenuItem value='3'>Spouse</MenuItem>
                  <MenuItem value='4'>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
              <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
              <Grid container spacing={2}>
                <Grid item xs={1} sm={3} md={2} lg={2} xl={2} spacing={2}>
                  <Select
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumberPrefixPrimary}
                    name='phoneNumberPrefixPrimary'
                    MenuProps={{ disableAutoFocus: true }}
                    sx={{
                      backgroundColor: '#D9EFE7',
                      border: '1px solid #D9EFE7',
                      borderRadius: '9999px',
                      marginRight: '12px',
                      fontSize: '14px'
                    }}
                  >
                    <MenuItem value='+62'>+62</MenuItem>
                    <MenuItem value='+44'>+44</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={10} alignSelf='flex-end'>
                  <Input
                    name='phoneNumberPrimary'
                    placeholder='Input Correct Number'
                    withAsterisk={true}
                    size='small'
                    type='number'
                    error={formik.touched.phoneNumberPrimary && Boolean(formik.errors.phoneNumberPrimary)}
                    helperText={formik.touched.phoneNumberPrimary && formik.errors.phoneNumberPrimary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumberPrimary}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginBottom: '3rem', width: '100%' }}>
          <Typography component='h3' fontSize={18} color='primary'>Secondary</Typography>
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='fullNameSecondary'
                customLabel='Full Name'
                withAsterisk={false}
                size='small'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Input Full Name'
                value={formik.values.fullNameSecondary}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6} spacing={2}>
              <FormControl fullWidth>
                <Typography mb='6px'>Relationship</Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.relationSecondary}
                  name='relationSecondary'
                >
                  <MenuItem value='1'>Parent</MenuItem>
                  <MenuItem value='2'>Sibling</MenuItem>
                  <MenuItem value='3'>Spouse</MenuItem>
                  <MenuItem value='4'>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
              <Typography>Contact Number</Typography>
              <Grid container spacing={2} >
                <Grid item xs={1} sm={3} md={2} lg={2} xl={2} spacing={2}>
                  <Select
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumberPrefixSecondary}
                    name='phoneNumberPrefixSecondary'
                    MenuProps={{ disableAutoFocus: true }}
                    sx={{
                      backgroundColor: '#D9EFE7',
                      border: '1px solid #D9EFE7',
                      borderRadius: '9999px',
                      marginRight: '12px',
                      fontSize: '14px'
                    }}
                  >
                    <MenuItem value='+62'>+62</MenuItem>
                    <MenuItem value='+44'>+44</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={10} alignSelf='flex-end'>
                  <Input
                    name='phoneNumberSecondary'
                    placeholder='Input Correct Number'
                    withAsterisk={true}
                    size='small'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumberSecondary}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          justifyContent='flex-end'
          alignItems='end'
          gap={2}
        >
          <Grid item>
            <Button onClick={handleBack} label='Back' variant='outlined' />
          </Grid>
          <Grid item>
            <Button fullWidth={false} size='small' color='primary' type='submit' label='Next' />
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default EmergencyContactForm;