import React, { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { styled as MuiStyled } from '@mui/material/styles';
import kayaroll from '../../../public/images/kayaroll-logo.png';
import { Icons } from '@/utils/assetsConstant';
import {
  Card,
  CardContent,
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

const NavHead = styled.div`
 height: 64px;
 width: 100%;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 padding-left: 2rem;
 padding-right: 2rem;
 padding-top: 1rem;
 padding-bottom: .5rem;
 position: fixed;
 top: 0;
 left: 0;
 box-shadow: 0 0 10px #333333;
 z-index: 999;
 background-color: #FFFFFF;
`;

const Base = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 background-color: #F6FFFC;
 padding-top: 5rem;
 width: 100%;
 height: 100%;
`;

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

  return (
    <Base>
      <OverlayLoading open={register.loading} />
      <NavHead>
        <div>
          <Image src={kayaroll} alt='logo' height={40} width={150} />
        </div>
        <div>
          <LocalizationMenu />
        </div>
      </NavHead>
      {
        ![200, 201, 0].includes(responser?.code) && (
          <Notify error={true} body={responser?.message}/>
        )
      }
      <Card sx={{ width: '800px', height: '100%' }}>
        <CardContent>
          <Box component='form' autoComplete='off' onSubmit={formik.handleSubmit}>
            <div>
              <Image src={kayaroll} alt='logo' height={56} width={211} />
            </div>
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
              <Grid item xs={6} md={6} lg={6} xl={6}>
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
              <Grid item xs={6} md={6} lg={6} xl={6}>
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
              <Grid item xs={6} md={6} lg={6} xl={6}>
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
              <Grid item xs={6} md={6} lg={6} xl={6}>
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
              <Grid item xs={6} md={6} lg={6} xl={6}>
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
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
                <Grid container spacing={2}>
                  <Grid item xs={1} sm={3} md={3} lg={3} xl={3}>
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
                      <MenuItem value='+44'>+44</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                    <Input
                      name='phoneNumber'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                      error={compareCheck(formik.touched.phoneNumber, Boolean(formik.errors.phoneNumber))}
                      helperText={ifThenElse(formik.touched.phoneNumber, formik.errors.phoneNumber, '')}
                      withAsterisk={true}
                      size='small'
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
        </CardContent>
      </Card>
    </Base>
  );
}


export default RegisterComponent;
