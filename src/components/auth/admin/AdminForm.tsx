import React, { useState } from 'react';
import { useAppSelectors } from '@/hooks/index';
import { Login } from '@/types/component';
import { Box, Typography, InputAdornment, IconButton, Alert } from '@mui/material';
import { Image as ImageType } from '@/utils/assetsConstant';
import Image from 'next/image';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { Input, Button } from '@/components/_shared/form/';
import { Text } from '@/components/_shared/common';
import { validationSchemeLogin } from './validate';
import { useFormik } from 'formik';
import { Auth } from '@/types/authentication';

const AdminForm = ({
  doLogin
}: Login.Component) => {
  const [openPassword, setOpenPassword] = useState(false);

  const { responser, login } = useAppSelectors(state => state);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    } as Auth.InitialValuesLogin,
    validationSchema: validationSchemeLogin,
    onSubmit: (values) => {
      doLogin(values);
    }
  });

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
          <Typography component='span' variant='text-base' color='#9CA3AF' sx={{ ml: '12px'}}>Admin</Typography>
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
            customLabel='Email Address'
            withAsterisk
            size='small'
            placeholder='Input Email Address'
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
            placeholder='Input Password'
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
        <Button
          label='Login'
          color='primary'
          size='large'
          type='submit'
          disabled={login.isLoading}
          isLoading={login.isLoading}
        />
      </Box>
    </Box>
  );
};

export default AdminForm;
