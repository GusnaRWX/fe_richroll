import React, { useState } from 'react';
import { Alert, Card, CustomModal, Text } from '@/components/_shared/common';
import { Box, Grid, IconButton, InputAdornment } from '@mui/material';
import { Button, Input } from '@/components/_shared/form';
import { BsFillEyeFill, BsFillEyeSlashFill, BsTrashFill } from 'react-icons/bs';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { putEmployeeAccountDeletionRequested } from '@/store/reducers/slice/account-management/accountManagementSlice';

const ValidationSchemaDelete = Yup.object({
  password: Yup.string().required('This field is required')
});
interface ProfileDeleteAccountType {
  password: string
}

const EmployeeDeleteAccount = () => {
  const {responser, account} = useAppSelectors(state => state);
  const dispatch = useAppDispatch();
  const [modalDelete, setModalDelete] = useState(false);
  const [openNewPassword, setOpenNewPassword] = useState(false);

  const handleDelete = () => {
    if(responser.code === 200 ) {
      setModalDelete(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: ''
    } as ProfileDeleteAccountType,
    validationSchema: ValidationSchemaDelete,
    onSubmit: (values) => {
      dispatch({
        type: putEmployeeAccountDeletionRequested.toString(),
        payload: {
          password: values.password
        }
      });
      handleDelete();
    }
  });
  return (
    <Card sx={{
      padding: '10px 20px',
      marginBottom: '20px'
    }}>
      <Grid container flexDirection='row' justifyContent='space-between' alignItems='baseline'>
        <Grid item xs={12} md={3.5}>
          <Text
            title='Delete Account'
            color='grey.600'
            variant='text-lg'
            fontWeight={700}
            sx={{ display: 'block' }}
          />
          <Text
            title='Permanently delete your account'
            color='grey.400'
            variant='text-base'
            fontWeight={400}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Text
            title='Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you with to retain'
            color='grey.400'
            variant='text-base'
            fontWeight={400}
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent='flex-end'
        mt='1.5rem'
      >
        <Grid item>
          <Button
            label='Delete Account'
            size='small'
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
            onClick={() => setModalDelete(true)}
          />
        </Grid>
      </Grid>
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

export default EmployeeDeleteAccount;