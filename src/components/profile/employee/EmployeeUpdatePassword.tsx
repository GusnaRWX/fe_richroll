import React, { useState } from 'react';
import { Card, Text } from '@/components/_shared/common';
import { Grid, InputAdornment, IconButton } from '@mui/material';
import { Button, Input } from '@/components/_shared/form';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const EmployeeUpdatePassword = () => {
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
                name='confirmationPassword'
                placeholder='Input Confirmation Password'
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