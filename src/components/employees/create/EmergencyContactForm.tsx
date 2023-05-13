import React, { useState } from 'react';
import { Typography, Box, Grid, FormControl, Select, MenuItem} from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import {styled as MuiStyled} from '@mui/material/styles';
import { useForm } from '@/hooks/index';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { postEmergencyRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';

const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

interface EmergencyProps {
  refProp: React.Ref<HTMLFormElement>
  nextPage: (_val: number) => void;
}

function EmergencyContactForm({refProp, nextPage} :EmergencyProps) {
  const dispatch = useAppDispatch();
  const {employeeID} = useAppSelectors((state) => state.employee);
  const [initialValues, setInitialValues] = useState({
    fullNamePrimary: '',
    relationPrimary: '',
    phoneNumberPrefixPrimary: '',
    phoneNumberPrimary: '',
    fullNameSecondary: '',
    relationSecondary: '',
    phoneNumberPrefixSecondary: '',
    phoneNumberSecondary: ''
  });

  const validate = (fieldOfValues = values) => {
    const temp = {...errors};

    if ('fullNamePrimary' in fieldOfValues)
      temp.fullNamePrimary = fieldOfValues.fullNamePrimary ? '' : 'This field is required';

    if ('PhoneNumberPrimary' in fieldOfValues)
      temp.phoneNumberPrimary = fieldOfValues.phoneNumberPrimary ? '' : 'This field is required';

    setErrors({
      ...temp
    });

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()){
      console.log('here');
      const data = {
        employeeID: employeeID,
        primary: {
          name: values.fullNamePrimary,
          relationship: values.relationPrimary,
          phoneNumberPrefix: values.phoneNumberPrefixPrimary,
          phoneNumber: values.phoneNumberPrimary
        },
        secondary: {
          name: values.fullNameSecondary,
          relationship: values.relationSecondary,
          phoneNumberPrefix: values.phoneNumberPrefixSecondary,
          phoneNumber: values.phoneNumberSecondary
        }
      };
      dispatch({
        type: postEmergencyRequested.toString(),
        payload: data
      });
      setInitialValues({
        fullNamePrimary: '',
        relationPrimary: '',
        phoneNumberPrefixPrimary: '',
        phoneNumberPrimary: '',
        fullNameSecondary: '',
        relationSecondary: '',
        phoneNumberPrefixSecondary: '',
        phoneNumberSecondary: ''
      });
    }
  };

  const { values, errors, setErrors, handleInputChange } = useForm(initialValues, true, validate);
  return (
    <>
      <Box sx={{ marginBottom: '3rem' }}>
        <Typography component='h3' fontSize={18} color='primary'>Emergency Contact</Typography>
      </Box>
      <form ref={refProp} onSubmit={(e) => handleSubmit(e)}>
        <Box sx={{ marginBottom: '3rem', width:'100%' }}>
          <Typography component='h3' fontSize={18} color='primary'>Primary</Typography>
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='fullNamePrimary'
                customLabel='Full Name'
                withAsterisk={true}
                onChange={handleInputChange}
                size='small'
                placeholder='Input Full Name'
                error={errors.fullNamePrimary}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <Typography mb='6px'>Relationship</Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  onChange={handleInputChange}
                  value={values.relationPrimary}
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
                    onChange={handleInputChange}
                    value={values.phoneNumberPrefixPrimary}
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
                    error={errors.phoneNumberPrimary}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{  marginBottom: '3rem', width:'100%' }}>
          <Typography component='h3' fontSize={18} color='primary'>Secondary</Typography>
          <Grid  container spacing={2} sx={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='fullNameSecondary'
                customLabel='Full Name'
                withAsterisk={false}
                size='small'
                onChange={handleInputChange}
                placeholder='Input Full Name'
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6} spacing={2}>
              <FormControl fullWidth>
                <Typography mb='6px'>Relationship</Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  onChange={handleInputChange}
                  value={values.relationSecondary}
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
                    onChange={handleInputChange}
                    value={values.phoneNumberPrefixSecondary}
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
                    onChange={handleInputChange}
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
            <Button onClick={() => nextPage(1)} label='Back' variant='outlined' />
          </Grid>
          <Grid item>
            <Button onClick={() => nextPage(3)} label='Next' />
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default EmergencyContactForm;