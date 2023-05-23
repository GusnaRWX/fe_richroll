import React, { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import kayaroll from '../../../../public/images/kayaroll-logo.png';
import LocalizationMenu from '@/components/_shared/_core/localization/Index';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import { useForm, useAppSelectors, useAppDispatch } from '@/hooks/index';
import { checkRegulerExpression } from '@/utils/helper';
import Link from 'next/link';
import { styled as MuiStyled } from '@mui/material/styles';
import { ArrowBack } from '@mui/icons-material';
import Notify from '@/components/_shared/common/Notify';
import { Alert, OverlayLoading } from '@/components/_shared/common';
import CancelIcon from '@mui/icons-material/Cancel';
import { forgotPasswordRequested } from '@/store/reducers/slice/auth/loginSlice';

const LinkComponent = MuiStyled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 700,
  fontSize: 16,
  display: 'flex',
  justifyContent: 'flex-start',
  marginTop: '1.5rem'
}));

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
flex-direction: flex-start;
justify-content: center;
background-color: #F6FFFC;
padding-top: 6rem;
width: 100%;
height: 100vh;
`;

function ForgotPasswordComponent() {
  const { responser, login } = useAppSelectors((state) => state);
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState({
    email: ''
  });

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };
    if ('email' in fieldOfValues) {
      const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailValue = fieldOfValues.email || '';
      let emailErrorMessage = '';
      if (!emailValue) {
        emailErrorMessage = 'Email is required';
      } else if (!checkRegulerExpression(patternEmail, emailValue)) {
        emailErrorMessage = 'Email should be valid';
      }
      temp.email = emailErrorMessage;
    }

    setErrors({
      ...temp
    });

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '');
  };

  const { values, errors, setErrors, handleInputChange } = useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch({ type: forgotPasswordRequested.toString(), payload: { email: values.email } });
      setInitialValues({ email: '' });
    }
  };
  return (
    <Base>
      <OverlayLoading open={login.isLoading} />
      <NavHead>
        <div>
          <Image src={kayaroll} alt='logo' height={40} width={150} />
        </div>
        <div>
          <LocalizationMenu />
        </div>
      </NavHead>
      {
        [200, 201].includes(responser.code) && (
          <Notify error={false} body={responser.message} footerMessage={responser?.footerMessage} />
        )
      }
      {
        [400, 401].includes(responser.code) && (
          <Notify error={true} body='Please check your input or check your authorization' />
        )
      }
      <Card sx={{ width: '585px', height: login.isError ? '80%' : '70%' }}>
        <CardContent sx={{ padding: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Image src={kayaroll} alt='logo' height={56} width={211} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Typography component='h2' fontWeight='bold' fontSize='24px' color='primary'>Forgot your password?</Typography>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Typography color='grey.400' fontSize='16px'>Enter your email address and we will send you a link to reset your password.</Typography>
          </div>
          {
            login.isError && (
              <Alert
                severity={'error'}
                content='Email address not found'
                icon={<CancelIcon />}
              />
            )
          }
          <Box
            component='form'
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <Input
              customLabel='Email Address'
              withAsterisk
              size='small'
              placeholder='Input email address'
              name='email'
              onChange={handleInputChange}
              error={errors.email}
            />
            <Stack sx={{ marginTop: '1rem' }}>
              <Button
                color='primary'
                size='large'
                type='submit'
                label='Reset Password'
              />
            </Stack>
          </Box>
          <LinkComponent href='/login'><ArrowBack />&nbsp;Log in now</LinkComponent>
        </CardContent>
      </Card>
    </Base>
  );
}

export default ForgotPasswordComponent;