import React, { useState } from 'react';
import { Card, Text } from '@/components/_shared/common';
import { Grid, InputAdornment, IconButton } from '@mui/material';
import { Button, Input } from '@/components/_shared/form';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useFormik } from 'formik';
import { ifThenElse } from '@/utils/helper';
import { validationUpdatePassword } from '../validate';

const EmployeeUpdatePassword = () => {
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
    <Card sx={{
      padding: '10px 20px',
      marginBottom: '20px'
    }}>
      <Grid container flexDirection='row' justifyContent='space-between' alignItems='baseline'>
        <Grid item xs={12} md={3.5}>
          <Text
            title='Update Password'
            color='grey.600'
            variant='text-lg'
            fontWeight={700}
            sx={{ display: 'block' }}
          />
          <Text
            title='Ensure your account is using a long, random password to stay secure'
            color='grey.400'
            variant='text-base'
            fontWeight={400}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container flexDirection='column' rowGap={2}>
            <Grid item>
              <Input
                customLabel='Current Password'
                fullWidth
                size='small'
                name='currentPassword'
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Input Current Password'
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
            <Grid item>
              <Input
                customLabel='New Password'
                fullWidth
                size='small'
                name='newPassword'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                placeholder='Input New Password'
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
            <Grid item>
              <Input
                customLabel='Confirmation Password'
                fullWidth
                size='small'
                name='repeatPassword'
                placeholder='Input Confirmation Password'
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
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent='flex-end' mt='1.5rem'>
        <Grid item>
          <Button
            label='Save'
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default EmployeeUpdatePassword;