import React, { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import kayaroll from '../../../../public/images/kayaroll-logo.png';
import LocalizationMenu from '@/components/_shared/_core/localization/Index';
import { Card, CardContent, Typography, Box, Stack, IconButton, InputAdornment } from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import { useForm, useAppSelectors, useAppDispatch } from '@/hooks/index';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { checkRegulerExpression } from '@/utils/helper';
import Notify from '@/components/_shared/common/Notify';
import { resetPasswordRequested } from '@/store/reducers/slice/auth/loginSlice';
import { useRouter } from 'next/router';
import { OverlayLoading } from '@/components/_shared/common';

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

function ResetPasswordComponent() {
  const { responser, login } = useAppSelectors((state) => state);
  const [openNewPassword, setOpenNewPassword] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const validate = (fieldOfValues = values) => {
    const temp = {...errors};
    if ('newPassword' in fieldOfValues) {
      const patternPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const newPasswordValue = fieldOfValues.newPassword || '';
      let newPasswordErrorMessage = '';
      if (!newPasswordValue) {
        newPasswordErrorMessage = 'New password is required';
      } else if (!checkRegulerExpression(patternPassword, newPasswordValue)) {
        newPasswordErrorMessage = 'Password is too short (min of 8 characters) and needs at least 1 upper case letter and 1 number';
      }
      temp.newPassword = newPasswordErrorMessage;
    }

    if ('confirmPassword' in fieldOfValues){
      let confirmPasswordErrorMessage = '';
      const confirmPasswordValue = fieldOfValues.confirmPassword || '';
      if (!confirmPasswordValue) {
        confirmPasswordErrorMessage = 'This field is required';
      }else if (confirmPasswordValue !== values.newPassword) {
        confirmPasswordErrorMessage = 'Confirmation password did not match';
      }
      temp.confirmPassword = confirmPasswordErrorMessage;
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
      dispatch({
        type: resetPasswordRequested.toString(),
        payload: {
          password: values.newPassword,
          confirmationPassword: values.confirmPassword,
          token: router.query.token
        }
      });
      setInitialValues({newPassword: '', confirmPassword: ''});
    }
  };
  return (
    <Base>
      <NavHead>
        <div>
          <Image src={kayaroll} alt='logo' height={40} width={150}/>
        </div>
        <div>
          <LocalizationMenu />
        </div>
      </NavHead>
      <OverlayLoading open={login.isLoading}/>
      {
        [200, 201].includes(responser.code) && (
          <Notify error={false} body={responser.message}/>
        )
      }
      {
        [400, 401].includes(responser.code) && (
          <Notify error={true} body='Please check your input or check your authorization'/>
        )
      }
      <Card sx={{ width: '585px', height: '75%' }}>
        <CardContent sx={{ padding: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Image src={kayaroll} alt='logo' height={56} width={211}/>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Typography component='h2' fontWeight='bold' fontSize='24px' color='primary'>Reset Password</Typography>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Typography color='grey.400' fontSize='16px'>Enter your new password below</Typography>
          </div>
          <Box
            component='form'
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <Input
              customLabel='New Password'
              withAsterisk
              size='small'
              type={openNewPassword ? 'text' : 'password'}
              placeholder='Input New Password'
              name='newPassword'
              onChange={handleInputChange}
              error={errors.newPassword}
              sx={{ marginBottom: '1rem' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => { setOpenNewPassword(!openNewPassword); }}
                      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); }}
                    >
                      {openNewPassword ? <BsFillEyeFill color='#9CA3AF' /> : <BsFillEyeSlashFill color='#9CA3AF' />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Input
              customLabel='Confirm New Password'
              withAsterisk
              size='small'
              type={openConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm New Password'
              name='confirmPassword'
              onChange={handleInputChange}
              error={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => { setOpenConfirmPassword(!openConfirmPassword); }}
                      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); }}
                    >
                      {openConfirmPassword ? <BsFillEyeFill color='#9CA3AF' /> : <BsFillEyeSlashFill color='#9CA3AF' />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
        </CardContent>
      </Card>
    </Base>
  );
}

export default ResetPasswordComponent;