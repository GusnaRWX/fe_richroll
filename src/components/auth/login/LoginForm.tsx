import React, { useState } from 'react';
import { useAppSelectors } from '@/hooks/index';
import { Login } from '@/types/component';
import { Box, BoxProps, Typography, InputAdornment, IconButton, Alert } from '@mui/material';
import { Image as ImageType, Icons } from '@/utils/assetsConstant';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { Input, Button } from '@/components/_shared/form/';
import { signIn } from 'next-auth/react';
import { Text } from '@/components/_shared/common';
import { validationSchemeLogin, initialValues } from './validate';
import { useFormik } from 'formik';

const LinkComponent = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: 16,
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: 16,
}));

const WrapperSSO = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  alignItems: 'center',
  margin: '14px 0'
}));

const LoginForm = ({
  doLogin
}: Login.Component) => {
  const [openPassword, setOpenPassword] = useState(false);

  const { responser, login } = useAppSelectors(state => state);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemeLogin,
    onSubmit: (values) => {
      doLogin(values);
    }
  });

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
    <Box padding={`${![200, 201, 0].includes(responser?.code) ? 35 : 45}px 0`}>
      <Box
        component='form'
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        sx={{
          padding: '0 40px'
        }}
      >
        <Box component='div' mb='16px'>
          <Image
            src={ImageType.KAYAROLL_LOGO}
            width={221}
            height={56}
            alt='kayaroll'
          />
        </Box>
        <Typography
          color='primary.main'
          fontWeight={700}
          fontSize={24}
          mb='17px'
        >
          Login
        </Typography>
        {![200, 201, 0].includes(responser?.code) && (
          <Box mb='17px'>
            <Alert severity='error'>
              <Text
                title={responser?.message}
                fontWeight={500}
              />
            </Alert>
          </Box>
        )}
        <Box component='div' mb='17px'>
          <Input
            customLabel='Email'
            withAsterisk
            size='small'
            placeholder='Input email address'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box mb='17px'>
          <Input
            customLabel='Password'
            withAsterisk
            size='small'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={openPassword ? 'text' : 'password'}
            placeholder='Input password'
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
        </Box>
        <LinkComponent href='/auth/forgot-password'>Forgot Password?</LinkComponent>
        <Button
          label='Login'
          color='primary'
          size='large'
          type='submit'
          disabled={login.isLoading}
          isLoading={login.isLoading}
        />
      </Box>
      <Box component='div' mt={`${![200, 201, 0].includes(responser?.code) ? 17 : 30}px`}>
        <Typography
          color='grey.400'
          textAlign='center'
        >
          You can also log in using
        </Typography>
        <WrapperSSO component='div'>
          <Image
            src={Icons.SSO_GOOGLE}
            width={40}
            height={40}
            alt='sso-google'
            style={{ cursor: 'pointer' }}
            onClick={handleGoogleLogin}
          />
          <Typography fontSize={14}>Or</Typography>
          <Image
            src={Icons.SSO_FACEBOOK}
            width={40}
            height={40}
            style={{ cursor: 'pointer' }}
            alt='sso-facebook'
            onClick={handleFacebookLogin}
          />
        </WrapperSSO>
        <Typography
          color='grey.400'
          textAlign='center'
        >
          Do Not Have an Account? &nbsp;
          <Link href='/register' style={{ textDecoration: 'none' }}>
            <Typography
              component='span'
              color='primary.main'
              fontWeight={500}
            >
              Register Now
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
