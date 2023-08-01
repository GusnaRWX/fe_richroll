import React, { useState } from 'react';
import { Card, Text } from '@/components/_shared/common';
import { Box, Grid, IconButton, InputAdornment } from '@mui/material';
import { Button, Input } from '@/components/_shared/form';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useFormik } from 'formik';
import { validationUpdatePassword } from '../validate';
import { ifThenElse } from '@/utils/helper';


const ProfileUpdatePassword = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: ''
    },
    validationSchema: validationUpdatePassword,
    onSubmit: (_val) => {
      console.log(_val);
    }
  });

  const [currentPassword, setCurrentPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [repeatPassword, setRepeatPassword] = useState<boolean>(false);

  return (
    <Card
      sx={{
        padding: '10px 20px',
        mb: '20px'
      }}
    >
      <Box mb='17px'>
        <Text
          title='Update Password'
          color='grey.600'
          variant='text-lg'
          fontWeight={700}
          sx={{ display: 'block' }}
        />
        <Text
          title='Ensure your account is using a long, random password to stay secure.'
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        rowGap={2}
      >
        <Grid
          item
          xs={12}
          sm={5.9}
        >
          <Input
            size='small'
            fullWidth
            customLabel='Current Password'
            name='currentPassword'
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={currentPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => { setCurrentPassword((prev => !prev)); }}
                    onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); }}
                  >
                    {currentPassword ? <BsFillEyeFill color='#9CA3AF' /> : <BsFillEyeSlashFill color='#9CA3AF' />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5.9}
        >
          <Input
            size='small'
            fullWidth
            customLabel='New Password'
            value={formik.values.newPassword}
            name='newPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={newPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => { setNewPassword((prev) => !prev); }}
                    onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); }}
                  >
                    {newPassword ? <BsFillEyeFill color='#9CA3AF' /> : <BsFillEyeSlashFill color='#9CA3AF' />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5.9}
        >
          <Input
            size='small'
            fullWidth
            customLabel='Repeat Password'
            withAsterisk
            name='repeatPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={ifThenElse(formik.errors.repeatPassword && formik.touched.repeatPassword, formik.errors.repeatPassword, '')}
            value={formik.values.repeatPassword}
            type={repeatPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => { setRepeatPassword((prev) => !prev); }}
                    onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); }}
                  >
                    {repeatPassword ? <BsFillEyeFill color='#9CA3AF' /> : <BsFillEyeSlashFill color='#9CA3AF' />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid
          container
          justifyContent='flex-end'
        >
          <Grid>
            <Button
              label='Save'
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileUpdatePassword;