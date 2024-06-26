import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import { styled as MuiStyled } from '@mui/material/styles';
import { Icons } from '@/utils/assetsConstant';
import {
  AppBar,
  Toolbar,
  CardProps,
  Card,
  Grid,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
  BoxProps,
  Box,
  InputAdornment,
  IconButton,
  Select,
  FormControl,
  FormHelperText,
  MenuItem
} from '@mui/material';
import { Register } from '@/types/component';
import { useAppSelectors } from '@/hooks/index';
import { Input, Button } from '../_shared/form';
import Link from 'next/link';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import LocalizationMenu from '../_shared/_core/localization/LocalizationMenu';
import { signIn } from 'next-auth/react';
import { Alert, OverlayLoading, Text } from '../_shared/common';
import { useFormik } from 'formik';
import { validationSchemeRegister } from './validate';
import Notify from '../_shared/common/Notify';
import { compareCheck, ifThenElse } from '@/utils/helper';

const WrapperAuth = MuiStyled(Box)<BoxProps>(({ theme }) => ({
  background: theme.palette.secondary[100],
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const WrapperCard = styled(Card)<CardProps>(() => ({
  background: 'none',
  borderRadius: 'none',
  boxShadow: 'none',
}));

const WrapperCardContent = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  background: '#FFFFFF',
  maxWidth: '800px',
  width: '100%',
  padding: '24px',
  marginTop: '24px'
}));

const WrapperNavbarContent = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

const WrapperSSO = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  alignItems: 'center',
  margin: '14px 0'
}));

const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));


function RegisterComponent({ countries, doRegister }: Register.Component) {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      countryID: '',
      companyName: '',
      numberOfEmployees: '',
      phoneNumberPrefix: '',
      phoneNumber: ''
    } as Register.InitialValuesRegister,
    validationSchema: validationSchemeRegister,
    onSubmit: (values) => {
      doRegister({ ...values });
    }
  });

  const [checked, setChecked] = useState(false);

  const [openPassword, setOpenPassword] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const { register } = useAppSelectors(state => state);
  const { responser } = useAppSelectors(state => state);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const employeeItems = [
    { label: '<10', value: 1 },
    { label: '<25', value: 2 },
    { label: '<50', value: 3 },
    { label: '>50', value: 4 }
  ];

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/company' });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signIn('facebook', { callbackUrl: '/company' });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <OverlayLoading open={register.loading} />
      <AppBar
        component='nav'
        sx={{
          background: '#FFFFFF',
          color: 'primary.main',
        }}
      >
        <WrapperNavbarContent>
          <Box>
            <Image
              src={ImageType.KAYAROLL_LOGO}
              width={151}
              height={40}
              alt='kayaroll'
            />
          </Box>
          <Box>
            <LocalizationMenu />
          </Box>
        </WrapperNavbarContent>
      </AppBar>
      {
        ![200, 201, 0].includes(responser?.code) && (
          <Notify error={true} body={responser?.message}/>
        )
      }
      <WrapperAuth>
        <WrapperCard>
          <WrapperCardContent>
            <Box component='form' autoComplete='off' onSubmit={formik.handleSubmit}>
              <Box sx={{ display: { xs: 'none', md: 'block' }, marginTop: '30px' }}>
                <Image src={ImageType.KAYAROLL_LOGO} alt='logo' height={56} width={221} />
              </Box>
              <h2>Register</h2>
              {![200, 201, 0].includes(responser?.code) && (
                <Box mb='17px'>
                  <Alert
                    severity='error'
                    content={responser?.message}
                  />
                </Box>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <Input
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={compareCheck(formik.touched.email, Boolean(formik.errors.email))}
                    helperText={ifThenElse(formik.touched.email, formik.errors.email, '')}
                    customLabel='Email Address'
                    withAsterisk={true}
                    size='small'
                    value={formik.values.email}
                    placeholder='Input Email Address'
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <Input
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={compareCheck(formik.touched.password, Boolean(formik.errors.password))}
                    helperText={ifThenElse(formik.touched.password, formik.errors.password, '')}
                    customLabel='Password'
                    withAsterisk
                    size='small'
                    value={formik.values.password}
                    placeholder='Input Password'
                    type={ifThenElse(openPassword, 'text', 'password')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => { setOpenPassword(!openPassword); }}
                            onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); }}
                          >
                            {openPassword ? <BsFillEyeFill color='#9CA3AF' /> : <BsFillEyeSlashFill color='#9CA3AF' />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <Input
                    name='name'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={compareCheck(formik.touched.name, Boolean(formik.errors.name))}
                    helperText={ifThenElse(formik.touched.name, formik.errors.name, '')}
                    customLabel='Full Name'
                    withAsterisk={true}
                    size='small'
                    placeholder='Input Full Name'
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth error={compareCheck(formik.touched.countryID, Boolean(formik.errors.countryID))}>
                    <Typography mb='.35rem'>Country<AsteriskComponent>*</AsteriskComponent></Typography>
                    <Select
                      fullWidth
                      displayEmpty
                      variant='outlined'
                      size='small'
                      name='countryID'
                      value={formik.values.countryID}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      renderValue={(value: string) => {
                        if (value.length === 0) {
                          return <Text title='Select Country' color='grey.400' />;
                        }
                        const selectedCountry = countries.find(country => country.value === value);
                        if (selectedCountry) {
                          return `${selectedCountry.label}`;
                        }
                        return null;
                      }}
                    >
                      {countries?.map(item => (
                        <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{ifThenElse(formik.touched.countryID, formik.errors.countryID, '')}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Input
                    name='companyName'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={compareCheck(formik.touched.companyName, Boolean(formik.errors.companyName))}
                    helperText={ifThenElse(formik.touched.companyName, formik.errors.companyName, '')}
                    placeholder='Input Company Name'
                    withAsterisk={true}
                    size='small'
                    customLabel='Input Company Name'
                    value={formik.values.companyName}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth error={compareCheck(formik.touched.numberOfEmployees, Boolean(formik.errors.numberOfEmployees))}>
                    <Typography>Number of Employees<AsteriskComponent>*</AsteriskComponent></Typography>
                    <Select
                      fullWidth
                      variant='outlined'
                      size='small'
                      name='numberOfEmployees'
                      value={formik.values.numberOfEmployees}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {
                        employeeItems.map((item) => (
                          <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                        ))
                      }
                    </Select>
                    <FormHelperText>{ifThenElse(formik.touched.numberOfEmployees, formik.errors.numberOfEmployees, '')}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      <Select
                        variant='outlined'
                        size='small'
                        name='phoneNumberPrefix'
                        value={formik.values.phoneNumberPrefix}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        MenuProps={{ disableAutoFocus: true }}
                        sx={{
                          backgroundColor: '#D9EFE7',
                          border: '1px solid #D9EFE7',
                          borderRadius: '9999px',
                          marginRight: '12px',
                          fontSize: '14px',
                          width: '100%'
                        }}
                      >
                        <MenuItem value='+62'>+62</MenuItem>
                        <MenuItem value='+65'>+65</MenuItem>
                        <MenuItem value='+60'>+60</MenuItem>
                        <MenuItem value='+86'>+86</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                      <Input
                        name='phoneNumber'
                        // onChange={formik.handleChange}
                        onChange={(e) => formik.setFieldValue('phoneNumber',e.target.value.toString())}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        error={compareCheck(formik.touched.phoneNumber, Boolean(formik.errors.phoneNumber))}
                        helperText={ifThenElse(formik.touched.phoneNumber, formik.errors.phoneNumber, '')}
                        withAsterisk={true}
                        size='small'
                        type='number'
                        placeholder='Input Contact Number'
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start' }}>
                <FormControlLabel
                  sx={{ marginTop: '.5rem', marginBottom: '.5rem', mr: '0px' }}
                  value={true}
                  label=''
                  control={
                    <Checkbox checked={checked} onChange={handleCheck} color='success' />
                  }
                  labelPlacement='end'
                />
                <Typography color='grey.400' textAlign='center'>
                  I have read and agree to the
                  <Link href='/' style={{ textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }}>
                    <Typography component='span' color='primary.main' fontWeight={500}>
                      Terms of Service
                    </Typography>
                  </Link>
                  and
                  <Link href='/' style={{ textDecoration: 'none', marginLeft: '5px' }}>
                    <Typography component='span' color='primary.main' fontWeight={500}>
                      Privacy Policy
                    </Typography>
                  </Link>
                  .
                </Typography>
              </Box>
              <Stack>
                <Button
                  disabled={!checked}
                  type='submit'
                  size='large'
                  color='secondary'
                  label='Register'
                />
              </Stack>
              <Box component='div' mt='17px'>
                <Typography color='grey.400' textAlign='center'>You can also register using</Typography>
                <WrapperSSO component='div'>
                  <Image
                    src={Icons.SSO_GOOGLE}
                    width={40}
                    height={40}
                    alt='sso-google'
                    onClick={handleGoogleLogin}
                  />
                  <Typography fontSize={14}>Or</Typography>
                  <Image
                    src={Icons.SSO_FACEBOOK}
                    width={40}
                    height={40}
                    alt='sso-facebook'
                    onClick={handleFacebookLogin}
                  />
                </WrapperSSO>
                <Typography color='grey.400' textAlign='center'>
                  Already have an account? &nbsp;
                  <Link href='/login' style={{ textDecoration: 'none' }}>
                    <Typography
                      component='span'
                      color='primary.main'
                      fontWeight={500}
                    >
                      Login Now
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </WrapperCardContent>
        </WrapperCard>
      </WrapperAuth>
    </>
  );
}


export default RegisterComponent;
