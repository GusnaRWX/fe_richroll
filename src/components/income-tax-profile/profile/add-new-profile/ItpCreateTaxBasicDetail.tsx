import React from 'react';
import { Grid, Box, Typography, FormHelperText } from '@mui/material';
import { Button, Input, Select, Textarea } from '@/components/_shared/form';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import BasicDatePicker from '@/components/_shared/form/DatePicker';
import dayjs from 'dayjs';

interface BasicValue {
  componentName : string
  country : string
  province : string
  city : string
  subDistrict : string
  effectiveDate : string
  citation : string
  internalNotes : string
  externalNotes : string
}

interface BasicProp {
  basicValue: BasicValue
  setValue: React.Dispatch<React.SetStateAction<BasicValue>>
  nextStep: React.Dispatch<React.SetStateAction<number>>
}

export default function ItpCreateTaxBasicDetail({basicValue, setValue, nextStep} : BasicProp) {
  const {t} = useTranslation();
  const t_key = 'income_tax_profile.profile.detail.basic_detail';

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
      componentName: basicValue.componentName,
      country: basicValue.country,
      province: basicValue.province,
      city: basicValue.city,
      subDistrict: basicValue.subDistrict,
      effectiveDate: basicValue.effectiveDate,
      citation: basicValue.citation,
      internalNotes: basicValue.internalNotes,
      externalNotes: basicValue.externalNotes,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setValue(values);
      nextStep(1);
    }
  });

  return (
    <>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={6} md={6} lg={6} xl={6} >
          <Input
            placeholder={t(`${t_key}.tax_profile_name_placeholder`)}
            customLabel={t(`${t_key}.tax_profile_name`)}
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
            customLabel={t(`${t_key}.country`)}
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
            customLabel={t(`${t_key}.province`)}
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
            customLabel={t(`${t_key}.city`)}
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
            customLabel={t(`${t_key}.sub_district`)}
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
            customLabel={t(`${t_key}.effective_date`)}
            withAsterisk
            onChange={(e)=> formik.setFieldValue('effectiveDate', dayjs(e).format('DD/MM/YYYY'))}
          />
          {formik.touched.effectiveDate && formik.errors.effectiveDate ? (
            <FormHelperText sx={{color: '#EF4444'}}>{formik.errors.effectiveDate}</FormHelperText>
          ): null}
        </Grid>
        <Grid item xs={6}>
          <BasicDatePicker
            customLabel={t(`${t_key}.expiration_date`)}
          />
        </Grid>
      </Grid>

      <Grid container xs={12} spacing={2} style={{marginTop: '16px'}}>
        <Grid item xs={6} md={6} lg={6} xl={6} sx={{paddingRight:'8px'}}>
          <Textarea
            customLabel={t(`${t_key}.citation`)}
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
            {t(`${t_key}.max_char_info`)}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
      </Grid>

      <Grid container xs={12} spacing={2} style={{marginTop: '16px'}}>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Textarea
            customLabel={t(`${t_key}.internal_notes`)}
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
            {t(`${t_key}.max_char_info`)}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Textarea
            customLabel={t(`${t_key}.external_notes`)}
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
            {t(`${t_key}.max_char_info`)}
          </Typography>
        </Grid>
      </Grid>

      <Grid container xs={12} spacing={2} style={{marginTop: '16px'}}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color='primary'
              label={t('button.next')}
              sx={{ width: 'fit-content' }}
              onClick={() => formik.submitForm()}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
