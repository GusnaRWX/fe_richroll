import React, { useState } from 'react';
import { Card, CustomModal, Text, } from '@/components/_shared/common';
import { Box, Grid, IconButton, InputAdornment, Alert } from '@mui/material';
import { Button, Input } from '@/components/_shared/form';
import { BsTrashFill, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { putEmployeeAccountDeletionRequested } from '@/store/reducers/slice/account-management/accountManagementSlice';

const ValidationSchemaDelete = Yup.object({
  password: Yup.string().required('This field is required')
});

interface ProfileDeleteAccountType {
  password: string
}

const ProfileDeleteAccount = () => {
  const { responser, account } = useAppSelectors((state) => state);
  const dispatch = useAppDispatch();
  const [modalDelete, setModalDelete] = useState(false);
  const [openNewPassword, setOpenNewPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: ''
    } as ProfileDeleteAccountType,
    validationSchema: ValidationSchemaDelete,
    onSubmit: (values) => {
      console.log(values);
      dispatch({
        type: putEmployeeAccountDeletionRequested.toString(),
        payload: {
          password: values.password
        }
      });
      handleDelete();
    }
  });

  const handleDelete = () => {
    if (responser.code === 200) {
      setModalDelete(false);
    }
  };
  return (
    <Card
      sx={{
        padding: '10px 20px',
        mb: '20px'
      }}
    >
      <Box mb='17px'>
        <Text
          title='Delete Account'
          color='red.600'
          variant='text-lg'
          fontWeight={700}
          sx={{ display: 'block' }}
        />
        <Text
          title='Permanently delete your account.'
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Box mb='17px'>
        <Text
          title='Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.'
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Button
        label='Delete Account'
        size='small'
        onClick={() => setModalDelete(true)}
        sx={{
          color: '#DC2626',
          background: '#FECACA',
          maxWidth: '159px',
          ':hover': {
            color: '#DC2626',
            background: '#FECACA',
          }
        }}
        startIcon={<BsTrashFill size={12} />}
      />
      <CustomModal
        open={modalDelete}
        handleClose={() => setModalDelete(false)}
        title='Confirmation Delete Account'
        width='720px'
        handleConfirm={formik.handleSubmit}
        submitText='Delete'
        deleteText='Confirm Delete'
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Text
              title='Input your password to continue the process.'
              color='grey.400'
              variant='text-base'
              fontWeight={400}
            />
          </Grid>
        </Grid>
        {account?.isErrorInput === true && (
          <Box mb='10px'>
            <Alert severity='error'>
              <Text
                title='Incorrect Password'
                fontWeight={500}
              />
            </Alert>
          </Box>
        )}
        <Grid container mb='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Input
              name='password'
              withAsterisk
              type={openNewPassword ? 'text' : 'password'}
              customLabel='Password'
              placeholder='Input Password'
              size='small'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
        </Grid>
      </CustomModal>
    </Card>
  );
};

export default ProfileDeleteAccount;