import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import LocalizationMenu from '@/components/_shared/_core/localization/LocalizationMenu';
import { AppBar, Toolbar, CardProps, Card, Typography, Box, BoxProps, Stack, IconButton, InputAdornment } from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import { useForm, useAppSelectors, useAppDispatch } from '@/hooks/index';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { checkRegulerExpression } from '@/utils/helper';
import Notify from '@/components/_shared/common/Notify';
import { resetPasswordRequested } from '@/store/reducers/slice/auth/loginSlice';
import { useRouter } from 'next/router';
import { OverlayLoading } from '@/components/_shared/common';

const WrapperAuth = styled(Box)<BoxProps>(({ theme }) => ({
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
  maxWidth: '565px',
  width: '100%',
}));

const WrapperCardContent = styled(Box)<BoxProps>(() => ({
  background: '#FFFFFF',
  padding: '24px'
}));

const WrapperNavbarContent = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

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
      const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
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
    <>
      <OverlayLoading open={login.isLoading}/>
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
        [200, 201].includes(responser.code) && (
          <Notify error={false} body={responser.message}/>
        )
      }
      {
        [400, 401].includes(responser.code) && (
          <Notify error={true} body='Please check your input or check your authorization'/>
        )
      }
      <WrapperAuth>
        <WrapperCard>
          <WrapperCardContent>
            <div style={{ marginBottom: '1rem' }}>
              <Image src={ImageType.KAYAROLL_LOGO} alt='logo' height={56} width={211}/>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Typography component='h2' fontWeight='bold' fontSize='24px' color='primary'>Set New Password</Typography>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Typography color='grey.400' fontSize='16px'>This new password will be used to login</Typography>
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
                customLabel='Repeat New Password'
                withAsterisk
                size='small'
                type={openConfirmPassword ? 'text' : 'password'}
                placeholder='Repeat New Password'
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
                  label='Update Password'
                />
              </Stack>
            </Box>
          </WrapperCardContent>
        </WrapperCard>
      </WrapperAuth>
    </>
  );
}

export default ResetPasswordComponent;