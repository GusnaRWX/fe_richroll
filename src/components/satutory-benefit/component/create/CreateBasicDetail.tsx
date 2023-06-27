import React, {Dispatch, SetStateAction} from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Button, Input, Select, Textarea } from '@/components/_shared/form';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CreateDesignedTransferAccountProps {
  setValue: Dispatch<SetStateAction<number>>
}

export default function CreateBasicDetailComponent({setValue}: CreateDesignedTransferAccountProps) {
  const Dummyoption = [
    { value: '1', label: 'Dummy 1' },
    { value: '2', label: 'Dummy 2' },
    { value: '3', label: 'Dummy 3' },
  ];

  const validationSchema = Yup.object({
    satutoryName: Yup.string().required('This field is Required!'),
    country: Yup.string().required('This field is Required!'),
    province: Yup.string(),
    city: Yup.string(),
    subDistrict: Yup.string(),
    citation: Yup.string(),
    internalNotes: Yup.string(),
    externalNotes: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      satutoryName: '',
      country: '',
      province: '',
      city: '',
      subDistrict: '',
      citation: '',
      internalNotes: '',
      externalNotes: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setValue(1);
    }
  });

  return (
    <>
      <Box component='div'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Input
              placeholder='Input Statutory Benefits Name'
              customLabel='Satutory Name'
              withAsterisk
              size='small'
              value={formik.values.satutoryName}
              onChange={(e) => formik.setFieldValue('satutoryName', e.target.value)}
            />
            {formik.touched.satutoryName && formik.errors.satutoryName ? (
              <Typography sx={{color: '#DC2626',}}>{formik.errors.satutoryName}</Typography>
            ): null}
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Select
              placeholder='Select Country'
              customLabel='Country'
              withAsterisk
              size='small'
              fullWidth
              options={Dummyoption}
              value={formik.values.country}
              onChange={(e) => formik.setFieldValue('country', e.target.value)}
            />
            {formik.touched.country && formik.errors.country ? (
              <Typography sx={{color: '#DC2626'}}>{formik.errors.country}</Typography>
            ): null}
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Select
              placeholder='Select Province'
              customLabel='Province'
              size='small'
              fullWidth
              options={Dummyoption}
              value={formik.values.province}
              onChange={(e) => formik.setFieldValue('province', e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Select
              placeholder='Select City'
              customLabel='City'
              size='small'
              fullWidth
              options={Dummyoption}
              value={formik.values.city}
              onChange={(e) => formik.setFieldValue('city', e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Select
              placeholder='Select Country'
              customLabel='Sub-District'
              size='small'
              fullWidth
              options={Dummyoption}
              value={formik.values.subDistrict}
              onChange={(e) => formik.setFieldValue('subDistrict', e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Textarea
              customLabel='Citation'
              minRows={4}
              style={{ resize: 'vertical' }}
              value={formik.values.citation}
              onChange={(e) => formik.setFieldValue('citation', e.target.value)}
            />
            <Typography
              style={{
                fontSize: '14px',
                marginTop: '6px',
                color: '#6B7280',
              }}
            >
            Max. 120 Character
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Textarea
              customLabel='Internal Notes'
              minRows={4}
              style={{ resize: 'vertical' }}
              value={formik.values.internalNotes}
              onChange={(e) => formik.setFieldValue('internalNotes', e.target.value)}
            />
            <Typography
              style={{
                fontSize: '14px',
                marginTop: '6px',
                color: '#6B7280',
              }}
            >
            Max. 120 Character
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Textarea
              customLabel='External Notes'
              minRows={4}
              style={{ resize: 'vertical' }}
              value={formik.values.externalNotes}
              onChange={(e) => formik.setFieldValue('externalNotes', e.target.value)}
            />
            <Typography
              style={{
                fontSize: '14px',
                marginTop: '6px',
                color: '#6B7280',
              }}
            >
            Max. 120 Character
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                color='primary'
                label='Next'
                sx={{ width: '63px' }}
                onClick={() => formik.submitForm()}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
