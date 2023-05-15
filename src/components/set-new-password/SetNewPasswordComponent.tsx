import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Card, Grid, InputAdornment, IconButton } from '@mui/material';
import Image from 'next/image';
import { Image as ImageType, Icons } from '@/utils/assetsConstant';
import { styled } from '@mui/material/styles';
import LocalizationMenu from '@/components/_shared/_core/localization/Index';
import { Text } from '@/components/_shared/common/';
import { Button, Input } from '@/components/_shared/form';
import { useForm, useAppDispatch } from '@/hooks/index';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { signIn } from 'next-auth/react';
import { AuthEmployee } from '@/types/component';
import { employeeSetNewPasswordRequested } from '@/store/reducers/slice/auth/loginSlice';

const WrapperNavbarContent = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

const WrapperAuth = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary[100],
  minHeight: '100vh'
}));

const WrapperCard = styled(Card)(() => ({
  paddingTop: '100px',
  background: 'none',
  borderRadius: '8px',
  boxShadow: 'none',
  paddingLeft: '135px',
  paddingRight: '135px',
  maxWidth: '800px',
  margin: '0 auto',
  '@media (max-width: 800px)': {
    paddingLeft: '65px',
    paddingRight: '65px',
    maxWidth: '100%',
  },
}));

const WrapperSSO = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  alignItems: 'center',
  margin: '14px 0'
}));

const Navbar = () => {
  return (
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
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <LocalizationMenu />
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};

const WrapperCardContent = styled(Box)(() => ({
  background: '#FFF',
  padding: '24px 24px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.05)'
}));

const SetNewPasswordComponent = ({
  token,
  email
}: AuthEmployee.SetNewPassword) => {

  const [openNewPassword, setOpenNewPassword] = useState(false);
  const [openRepeatNewPassword, setOpenRepeatNewPassword] = useState(false);
  const dispatch = useAppDispatch();

  const [initialValues] = useState({
    newPassword: '',
    repeatNewPassword: ''
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

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };

    if ('newPassword' in fieldOfValues)
      temp.newPassword = fieldOfValues.newPassword ? '' : 'This field is required';

    if ('repeatNewPassword' in fieldOfValues)
      temp.repeatNewPassword = fieldOfValues.repeatNewPassword
        ? (
          fieldOfValues.repeatNewPassword === values.newPassword
            ? ''
            : 'Repeat new password should match with new password'
        )
        : 'This field is required';

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

  const handleSubmit = () => {
    if (validate()) {
      const payload = {
        email: email,
        password: values.newPassword,
        confirmationPassword: values.repeatNewPassword,
        token: token
      };
      dispatch({
        type: employeeSetNewPasswordRequested.toString(),
        payload: payload
      });
    }
  };

  return (
    <>
      <Navbar />
      <WrapperAuth>
        <WrapperCard>
          <WrapperCardContent>
            <Image
              src={ImageType.KAYAROLL_LOGO}
              width={151}
              height={40}
              alt='kayaroll'
              style={{ display: 'block' }}
            />
            <Text
              title='Set a New Password'
              fontWeight={700}
              variant='text-2xl'
              color='primary.600'
              component='h3'
              mt='24px'
              mb='4px'
            />
            <Text
              title='This new password will be used to login'
              fontWeight={400}
              variant='text-base'
              color='grey.500'
              component='p'
              mb='4px'
            />
            <Grid
              container
            >
              <Grid
                item
                xs={12}
                mb='17px'
              >
                <Input
                  size='small'
                  value={email}
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={12}
                mb='17px'
              >
                <Input
                  customLabel='New Passoword'
                  withAsterisk
                  placeholder='Input New Password'
                  value={values.newPassword}
                  name='newPassword'
                  onChange={handleInputChange}
                  error={errors.newPassword}
                  size='small'
                  type={openNewPassword ? 'text' : 'password'}
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
              </Grid>
              <Grid
                item
                xs={12}
                mb='17px'
              >
                <Input
                  customLabel='Repeat New Passowrd'
                  withAsterisk
                  placeholder='Repeat New Password'
                  value={values.repeatNewPassword}
                  name='repeatNewPassword'
                  onChange={handleInputChange}
                  error={errors.repeatNewPassword}
                  size='small'
                  type={openRepeatNewPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => { setOpenRepeatNewPassword(!openRepeatNewPassword); }}
                          onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); }}
                        >
                          {openRepeatNewPassword ? <BsFillEyeFill color='#9CA3AF' /> : <BsFillEyeSlashFill color='#9CA3AF' />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Button
                  label='Update Password'
                  onClick={handleSubmit}
                />
              </Grid>
            </Grid>
            <Box
              component='div'
              mt='16px'
            >
              <Text color='grey.400' textAlign='center' title='You can also log in using' />
              <WrapperSSO component='div'>
                <Image
                  src={Icons.SSO_GOOGLE}
                  width={40}
                  height={40}
                  alt='sso-google'
                  style={{ cursor: 'pointer' }}
                  onClick={handleGoogleLogin}
                />
                <Text title='Or' />
                <Image
                  src={Icons.SSO_FACEBOOK}
                  width={40}
                  height={40}
                  style={{ cursor: 'pointer' }}
                  alt='sso-facebook'
                  onClick={handleFacebookLogin}
                />
              </WrapperSSO>
            </Box>
          </WrapperCardContent>
        </WrapperCard>
      </WrapperAuth>
    </>
  );
};

export default SetNewPasswordComponent;