import React, { Dispatch, SetStateAction } from 'react';
import { Grid, Box, Typography, Paper } from '@mui/material';
import { Button, Input, Select, Textarea } from '@/components/_shared/form';
import BasicDatePicker from '@/components/_shared/form/DatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

interface CreateBasicDetailComponentProps {
  setValue: Dispatch<SetStateAction<number>>
}

export default function CreateTaxBasicDetailComponent({ setValue }: CreateBasicDetailComponentProps) {
  const Dummyoption = [
    { value: '1', label: 'Dummy 1' },
    { value: '2', label: 'Dummy 2' },
    { value: '3', label: 'Dummy 3' },
  ];

  const validationSchema = Yup.object({
    componentName: Yup.string().required(),
    country: Yup.string().required(),
    province: Yup.string(),
    city: Yup.string(),
    subDistrict: Yup.string(),
    effective_date: Yup.string(),
    expiration_date: Yup.string(),
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
      effective_date: '',
      expiration_date: '',
      citation: '',
      internalNotes: '',
      externalNotes: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setValue(1);
    },
  });

  return (
    <>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} rowSpacing={4}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              placeholder='Input Tax Profile Name'
              customLabel='Tax Profile Name'
              withAsterisk
              size='small'
              value={formik.values.componentName}
              onChange={(e) =>
                formik.setFieldValue('componentName', e.target.value)
              }
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
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
              onChange={(e) =>
                formik.setFieldValue('subDistrict', e.target.value)
              }
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <BasicDatePicker
              customLabel='Effective Date'
              withAsterisk
              onChange={(value) =>
                formik.setFieldValue(
                  'effective_date',
                  dayjs(value).format('DD/MM/YYYY')
                )
              }
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <BasicDatePicker
              customLabel='Expiration Date'
              withAsterisk
              onChange={(value) =>
                formik.setFieldValue(
                  'expiration_date',
                  dayjs(value).format('DD/MM/YYYY')
                )
              }
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
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
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Textarea
              customLabel='Internal Notes'
              minRows={4}
              style={{ resize: 'vertical' }}
              value={formik.values.internalNotes}
              onChange={(e) =>
                formik.setFieldValue('internalNotes', e.target.value)
              }
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
              onChange={(e) =>
                formik.setFieldValue('externalNotes', e.target.value)
              }
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
      </Paper>
      <Grid container>
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
    </>
  );
}
