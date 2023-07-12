/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {SetStateAction, Dispatch} from 'react';
import { Grid, Typography } from '@mui/material';
import {  Input, Select, Textarea, Button } from '@/components/_shared/form';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

interface PropsInterface {
  nextPage: Dispatch<SetStateAction<number>>
  formik
}

export default function CreateBasicDetailComponent({nextPage, formik}: PropsInterface) {
  // Translation Key
  const {t} = useTranslation();
  const t_key = 'satutory_benefit.component.form_&_detail.create_basic_detail';

  const Dummyoption = [
    { value: '1', label: 'Dummy 1' },
    { value: '2', label: 'Dummy 2' },
    { value: '3', label: 'Dummy 3' },
  ];

  // const validationSchema = Yup.object({
  //   satutoryName: Yup.string().required('This field is Required!'),
  //   country: Yup.string().required('This field is Required!'),
  //   province: Yup.string(),
  //   city: Yup.string(),
  //   subDistrict: Yup.string(),
  //   citation: Yup.string(),
  //   internalNotes: Yup.string(),
  //   externalNotes: Yup.string(),
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     satutoryName: '',
  //     country: '',
  //     province: '',
  //     city: '',
  //     subDistrict: '',
  //     citation: '',
  //     internalNotes: '',
  //     externalNotes: '',
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //     nextPage(1);
  //   }
  // });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <Input
            placeholder={t(`${t_key}.name_placeholder`)}
            customLabel={t(`${t_key}.name`)}
            withAsterisk
            size='small'
            value={formik.values.satutoryName}
            onChange={(e) => formik.setFieldValue('basicDetail.satutoryName', e.target.value)}
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
            customLabel={t(`${t_key}.country`)}
            withAsterisk
            size='small'
            fullWidth
            options={Dummyoption}
            value={formik.values.country}
            onChange={(e) => formik.setFieldValue('basicDetail.country', e.target.value)}
          />
          {formik.touched.country && formik.errors.country ? (
            <Typography sx={{color: '#DC2626'}}>{formik.errors.country}</Typography>
          ): null}
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Select
            placeholder='Select Province'
            customLabel={t(`${t_key}.province`)}
            size='small'
            fullWidth
            options={Dummyoption}
            value={formik.values.province}
            onChange={(e) => formik.setFieldValue('basicDetail.province', e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{marginTop: '12px'}}>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Select
            placeholder='Select City'
            customLabel={t(`${t_key}.city`)}
            size='small'
            fullWidth
            options={Dummyoption}
            value={formik.values.city}
            onChange={(e) => formik.setFieldValue('basicDetail.city', e.target.value)}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Select
            placeholder='Select Country'
            customLabel={t(`${t_key}.sub_district`)}
            size='small'
            fullWidth
            options={Dummyoption}
            value={formik.values.subDistrict}
            onChange={(e) => formik.setFieldValue('basicDetail.subDistrict', e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{marginTop: '12px'}}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Textarea
            customLabel={t(`${t_key}.citation`)}
            minRows={4}
            style={{ resize: 'vertical' }}
            value={formik.values.citation}
            onChange={(e) => formik.setFieldValue('basicDetail.citation', e.target.value)}
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

      <Grid container spacing={2} style={{marginTop: '12px'}}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Textarea
            customLabel={t(`${t_key}.internal_notes`)}
            minRows={4}
            style={{ resize: 'vertical' }}
            value={formik.values.internalNotes}
            onChange={(e) => formik.setFieldValue('basicDetail.internalNotes', e.target.value)}
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

      <Grid container spacing={2} style={{marginTop: '12px'}}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Textarea
            customLabel={t(`${t_key}.external_notes`)}
            minRows={4}
            style={{ resize: 'vertical' }}
            value={formik.values.externalNotes}
            onChange={(e) => formik.setFieldValue('basicDetail.externalNotes', e.target.value)}
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

        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'flex-end', mt: '30px' }}
        >
          <Button
            fullWidth={false}
            size='small'
            label={t('button.next')}
            color='primary'
            onClick={() => {
              formik.submitForm();
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
