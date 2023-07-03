import React, { Dispatch, SetStateAction } from 'react';
import { Grid, Box, Typography, FormHelperText, Paper } from '@mui/material';
import { Button, Input, Select, Textarea } from '@/components/_shared/form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BasicDatePicker from '@/components/_shared/form/DatePicker';
import dayjs from 'dayjs';

interface ItpEditProfileBasicDetailComponentProps {
  setValue: Dispatch<SetStateAction<number>>
}

export default function ItpEditProfileBasicDetailComponent({setValue}: ItpEditProfileBasicDetailComponentProps) {
  const Dummyoption = [
    { value: '1', label: 'Dummy 1' },
    { value: '2', label: 'Dummy 2' },
    { value: '3', label: 'Dummy 3' },
  ];

  const validationSchema = Yup.object({
    componentName: Yup.string().required('This field is Required!'),
    country: Yup.string().required('This field is Required!'),
    province: Yup.string(),
    city: Yup.string(),
    subDistrict: Yup.string(),
    effectiveDate: Yup.string().required('This field is Required!'),
    citation: Yup.string(),
    internalNotes: Yup.string(),
    externalNotes: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      componentName: '',
      country: '',
      province: '',
      city: '',
      subDistrict: '',
      effectiveDate: '',
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
      <Paper sx={{p: '16px'}}>
        <Grid container xs={12} spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} >
            <Input
              placeholder='Input Statutory Benefits Name'
              customLabel='Tax Profile Name'
              withAsterisk
              size='small'
              value={formik.values.componentName}
              onChange={(e) => formik.setFieldValue('componentName', e.target.value)}
            />
            {formik.touched.componentName && formik.errors.componentName ? (
              <FormHelperText sx={{color: '#EF4444'}}>{formik.errors.componentName}</FormHelperText>
            ): null}
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
        </Grid>

        <Grid container xs={12} spacing={2} style={{marginTop: '16px'}}>
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
              <FormHelperText sx={{color: '#EF4444'}}>{formik.errors.country}</FormHelperText>
            ): null}
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6} >
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

        <Grid container xs={12} spacing={2} style={{marginTop: '16px'}}>
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
          <Grid item xs={6} md={6} lg={6} xl={6} >
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

        <Grid container xs={12} spacing={2} style={{marginTop: '16px'}}>
          <Grid item xs={6}>
            <BasicDatePicker
              customLabel='Effective Date'
              withAsterisk
              onChange={(e)=> formik.setFieldValue('effectiveDate', dayjs(e).format('DD/MM/YYYY'))}
            />
            {formik.touched.effectiveDate && formik.errors.effectiveDate ? (
              <FormHelperText sx={{color: '#EF4444'}}>{formik.errors.effectiveDate}</FormHelperText>
            ): null}
          </Grid>
          <Grid item xs={6}>
            <BasicDatePicker
              customLabel='Expiration Date'
            />
          </Grid>
        </Grid>

        <Grid container xs={12} spacing={2} style={{marginTop: '16px'}}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{paddingRight:'8px'}}>
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
          <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
        </Grid>

        <Grid container xs={12} spacing={2} style={{marginTop: '16px'}}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
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
          <Grid item xs={6} md={6} lg={6} xl={6}>
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

        <Grid container xs={12} spacing={2} style={{marginTop: '16px'}}>
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
      </Paper>
    </>
  );
}
