import React, { FormEvent, useState } from 'react';
import { useForm } from '@/hooks/index';
import { Login } from '@/types/component';
import { Box, BoxProps, Button, TextField, Typography, InputAdornment, IconButton, Alert } from '@mui/material';
import { Image as ImageType, Icons } from '@/utils/assetsConstant';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { checkRegulerExpression } from '@/utils/helper';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

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

  const [initialValues, setInitialValues] = useState({
    email: '',
    password: ''
  });

  const [openPassword, setOpenPassword] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { responser }: any = useSelector(state => state);


  const validate = (fieldOfValues = values) => {
    const temp: Login.Form = { ...errors };

    if ('email' in fieldOfValues) {
      const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      temp.email = fieldOfValues.email
        ? (
          checkRegulerExpression(patternEmail, fieldOfValues.email)
            ? ''
            : 'Email should be valid'
        )
        : 'Email is required';
    }


    if ('password' in fieldOfValues)
      temp.password = fieldOfValues.password ? '' : 'Password is required';

    setErrors({
      ...temp
    });

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '');
  };

  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues, true, validate);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validate()) {
      doLogin({ ...values });
      setInitialValues({ email: '', password: '' });
    }
  };

  return (
    <Box padding={`${![200, 201, 0].includes(responser?.code) ? 35 : 45}px 0`}>
      <Box
        component='form'
        autoComplete='off'
        onSubmit={handleSubmit}
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
            <Alert severity='error'>{responser?.message}</Alert>
          </Box>
        )}
        <Box component='div' mb='17px'>
          <Typography>
            Email Address <AsteriskComponent>*</AsteriskComponent>
          </Typography>
          <TextField
            fullWidth
            variant='outlined'
            name='email'
            onChange={handleInputChange}
            placeholder='Input email address'
            size='small'
            error={errors.email}
            {...errors.email && ({ error: true, helperText: errors.email })}
          />
        </Box>
        <Box mb='17px'>
          <Typography>
            Password <AsteriskComponent>*</AsteriskComponent>
          </Typography>
          <TextField
            fullWidth
            variant='outlined'
            name='password'
            type={openPassword ? 'text' : 'password'}
            onChange={handleInputChange}
            placeholder='Input password'
            size='small'
            error={errors.password}
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
            {...errors.password && ({ error: true, helperText: errors.password })}
          />
        </Box>
        <LinkComponent href='/auth/forgot-password'>Forgot Password?</LinkComponent>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          fullWidth
          sx={{
            textTransform: 'none',
          }}
        >
          Login
        </Button>
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
          />
          <Typography fontSize={14}>Or</Typography>
          <Image
            src={Icons.SSO_FACEBOOK}
            width={40}
            height={40}
            alt='sso-facebook'
          />
        </WrapperSSO>
        <Typography
          color='grey.400'
          textAlign='center'
        >
          Do Not Have an Account? &nbsp;
          <Typography
            component='span'
            color='primary.main'
            fontWeight={500}
          >
            Register Now
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;