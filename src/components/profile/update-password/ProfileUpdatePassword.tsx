import React, { useState } from 'react';
import { Card, Text } from '@/components/_shared/common';
import { Box, Grid, IconButton, InputAdornment } from '@mui/material';
import { useForm } from '@/hooks/index';
import { Button, Input } from '@/components/_shared/form';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';


const ProfileUpdatePassword = () => {
  const [initialState] = useState({
    currentPassword: '',
    newPassword: '',
    repeatPassword: ''
  });

  const [currentPassword, setCurrentPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [repeatPassword, setRepeatPassword] = useState<boolean>(false);


  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };

    if ('currentPassword' in fieldOfValues)
      temp.currentPassword = fieldOfValues.currentPassword;

    if ('newPassword' in fieldOfValues)
      temp.newPassword = fieldOfValues.newPassword;

    if ('repeatPassword' in fieldOfValues) {
      const checkSamePassword = fieldOfValues.repeatPassword === values.newPassword ? '' : 'New password and Repeat password should match';
      temp.repeatPassword = fieldOfValues.repeatPassword
        ? checkSamePassword
        : 'Repeat password is required';
    }
    setErrors({
      ...temp
    });
  };

  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialState, true, validate);

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
            value={values.currentPassword}
            onChange={handleInputChange}
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
            value={values.newPassowrd}
            name='newPassword'
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            error={errors.repeatPassword}
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